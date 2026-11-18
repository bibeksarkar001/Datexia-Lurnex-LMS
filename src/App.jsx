import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signInWithRedirect, getRedirectResult, signOut } from 'firebase/auth';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { Briefcase, Code, Cloud, X, Zap } from 'lucide-react';
import { auth, provider, db } from './firebase.js';
import { JOBS, PROJECTS, CURRICULUM } from './data/curriculum.js';
import { computeStats, findNextTask, mergeProgress, sameProgress, validateImport } from './lib/progress.js';
import Nav from './components/Nav.jsx';
import Curriculum from './components/Curriculum.jsx';
import { ContinueCard, ProgressStrip } from './components/Dashboard.jsx';
import { Jobs, Roadmap, ResetModal, Toast, Footer } from './components/Sections.jsx';

const COLLECTION = 'datexia-lms';
const LS_PROGRESS = 'lurnex-progress';
const LS_THEME = 'lurnex-theme';
const LS_BANNER = 'lurnex-banner-dismissed';

const lsGet = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } };
const lsDel = (k) => { try { localStorage.removeItem(k); } catch { /* storage unavailable */ } };
function readLocal() {
  try {
    const v = JSON.parse(lsGet(LS_PROGRESS) || '{}');
    return v && typeof v === 'object' && !Array.isArray(v) ? v : {};
  } catch { return {}; }
}
const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export default function App() {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(readLocal);
  const [darkMode, setDarkMode] = useState(() => {
    const t = lsGet(LS_THEME);
    return t ? t === 'dark' : !!window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  });
  const [activePhase, setActivePhase] = useState('p1');
  const [activeMonth, setActiveMonth] = useState(null);
  const [showReset, setShowReset] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(() => lsGet(LS_BANNER) !== '1');
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const notify = useCallback((msg, type = 'info') => {
    setToast({ msg, type });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 4500);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    lsSet(LS_THEME, darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Auth state (also completes a redirect sign-in).
  useEffect(() => {
    getRedirectResult(auth).catch((e) => notify(`Sign-in failed: ${e.code || e.message}`, 'error'));
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) setProgress(readLocal());
    });
  }, [notify]);

  // Cloud sync: merge local progress in on first snapshot, then live-sync.
  useEffect(() => {
    if (!user) return undefined;
    const ref = doc(db, COLLECTION, user.uid);
    let first = true;
    return onSnapshot(ref, (snap) => {
      const cloud = snap.exists() ? snap.data().state || {} : {};
      if (first) {
        first = false;
        const local = readLocal();
        const merged = mergeProgress(cloud, local);
        if (!sameProgress(merged, cloud)) {
          setProgress(merged);
          setDoc(ref, { state: merged }, { merge: true })
            .then(() => lsDel(LS_PROGRESS))
            .catch((e) => notify(`Could not sync progress: ${e.code || e.message}`, 'error'));
          return;
        }
        lsDel(LS_PROGRESS);
      }
      setProgress(cloud);
    }, (e) => notify(`Sync error: ${e.code || e.message}`, 'error'));
  }, [user, notify]);

  const stats = useMemo(() => computeStats(CURRICULUM, progress), [progress]);
  const next = useMemo(() => findNextTask(CURRICULUM, progress), [progress]);

  // Optimistic local update, then persist to cloud or localStorage.
  const save = useCallback((nextState, merge = true) => {
    setProgress(nextState);
    if (user) {
      setDoc(doc(db, COLLECTION, user.uid), { state: nextState }, merge ? { merge: true } : undefined)
        .catch((e) => notify(`Could not save: ${e.code || e.message}`, 'error'));
    } else {
      lsSet(LS_PROGRESS, JSON.stringify(nextState));
    }
  }, [user, notify]);

  const toggle = (key) => {
    const nextState = { ...progress, [key]: !progress[key] };
    const monthId = key.split('_')[0];
    const after = computeStats(CURRICULUM, nextState).months[monthId];
    if (after?.complete && !stats.months[monthId]?.complete) {
      const title = CURRICULUM.flatMap((p) => p.months).find((m) => m.id === monthId)?.title.split(':')[0];
      notify(`${title} complete. Nicely done.`);
    }
    save(nextState);
  };

  const signIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      if (e.code === 'auth/popup-blocked') {
        try { await signInWithRedirect(auth, provider); } catch (e2) { notify(`Sign-in failed: ${e2.code || e2.message}`, 'error'); }
      } else if (e.code !== 'auth/popup-closed-by-user' && e.code !== 'auth/cancelled-popup-request') {
        notify(`Sign-in failed: ${e.code || e.message}`, 'error');
      }
    }
  };
  const signOutUser = () => signOut(auth).catch((e) => notify(`Sign-out failed: ${e.code || e.message}`, 'error'));

  const reset = () => { save({}, false); setShowReset(false); };

  const exportProgress = () => {
    const trueKeys = Object.fromEntries(Object.keys(progress).filter((k) => progress[k] === true).map((k) => [k, true]));
    const url = URL.createObjectURL(new Blob([JSON.stringify(trueKeys, null, 2)], { type: 'application/json' }));
    const a = document.createElement('a');
    a.href = url; a.download = 'lurnex-progress.json';
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  };

  const importProgress = async (file) => {
    try {
      const clean = validateImport(JSON.parse(await file.text()), CURRICULUM);
      if (!clean) return notify('Import failed: file must be an object of true/false values for known task keys.', 'error');
      save(mergeProgress(progress, clean));
      notify(`Imported ${Object.keys(clean).length} completed tasks (merged with current progress).`);
    } catch {
      notify('Import failed: not a valid JSON file.', 'error');
    }
  };

  const scrollTo = (id) => setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'center' }), 350);
  const jump = (t) => { setActivePhase(t.phaseId); setActiveMonth(t.monthId); scrollTo(`task-${t.key}`); };
  const openPhase = (id) => { setActivePhase(id); scrollTo(`phase-${id}`); };

  const dismissBanner = () => { setBannerOpen(false); lsSet(LS_BANNER, '1'); };

  return (
    <div className="min-h-screen overflow-x-clip font-sans">
      <Nav user={user} percent={stats.percent} darkMode={darkMode} setDarkMode={setDarkMode} onSignIn={signIn} onSignOut={signOutUser}
        onExport={exportProgress} onImport={importProgress} onReset={() => setShowReset(true)} />

      {!user && bannerOpen && (
        <div className="border-b border-teal-500/20 bg-teal-500/10 px-4 py-2.5 text-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
            <p className="flex items-center gap-2"><Cloud size={16} className="shrink-0 text-teal-600 dark:text-teal-400" /> Progress is saved in this browser. <button onClick={signIn} className="ring-focus rounded font-bold text-teal-700 underline underline-offset-2 dark:text-teal-300">Sign in with Google to sync across devices</button></p>
            <button aria-label="Dismiss sign-in banner" onClick={dismissBanner} className="ring-focus rounded p-1 hover:bg-black/5 dark:hover:bg-white/10"><X size={16} /></button>
          </div>
        </div>
      )}

      <header className="relative overflow-hidden border-b border-slate-200 bg-white px-6 py-16 dark:border-slate-800 dark:bg-slate-900 md:py-24">
        <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="mb-8 text-4xl font-black tracking-tight md:text-6xl">From API Consumer to<br /><span className="text-gradient">Sovereign Architect</span></h2>
          <div className="mx-auto mb-10 max-w-3xl space-y-5 text-left text-lg leading-relaxed text-slate-600 dark:text-slate-400 md:text-xl">
            <p>In 2026, privacy, latency and inference costs are pushing more teams toward self-hosted AI. This 26-month program takes you from the Unix shell to CUDA kernels and multi-agent systems, so you understand the stack instead of just calling it.</p>
            <p>It pairs math from MIT and Harvard with hands-on GitHub, local-hardware and deployment practice. By the end you will not just be using AI. You will have built and shipped the system that runs it.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-bold uppercase tracking-widest">
            <div className="flex items-center gap-2"><Zap className="text-amber-500" /> 26 Months</div>
            <div className="flex items-center gap-2"><Code className="text-teal-500" /> 26 Projects</div>
            <div className="flex items-center gap-2"><Briefcase className="text-indigo-500" /> Career Launch</div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 md:space-y-20 md:py-16">
        <div className="space-y-4">
          <ContinueCard next={next} curriculum={CURRICULUM} onJump={jump} />
          <ProgressStrip stats={stats} curriculum={CURRICULUM} onOpenPhase={openPhase} />
        </div>
        <Jobs jobs={JOBS} />
        <Roadmap projects={PROJECTS} />
        <Curriculum curriculum={CURRICULUM} progress={progress} stats={stats} onToggle={toggle}
          activePhase={activePhase} setActivePhase={setActivePhase} activeMonth={activeMonth} setActiveMonth={setActiveMonth} />
      </main>

      <Footer />
      {showReset && <ResetModal onCancel={() => setShowReset(false)} onConfirm={reset} />}
      <Toast toast={toast} />
    </div>
  );
}
