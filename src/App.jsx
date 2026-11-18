import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signInWithRedirect, getRedirectResult, signOut } from 'firebase/auth';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { auth, provider, db } from './firebase.js';
import { JOBS, PROJECTS, CURRICULUM } from './data/curriculum.js';
import { computeStats, findNextTask, mergeProgress, sameProgress, validateImport } from './lib/progress.js';
import Nav from './components/Nav.jsx';
import Curriculum from './components/Curriculum.jsx';
import Head from './components/Dashboard.jsx';
import { Guide, Jobs, Roadmap, ResetModal, Toast, Footer } from './components/Sections.jsx';

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
  const [activeMonth, setActiveMonth] = useState(() => findNextTask(CURRICULUM, readLocal())?.monthId || 'm1');
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
  const jump = (t) => { setActiveMonth(t.monthId); scrollTo(`task-${t.key}`); };

  const dismissBanner = () => { setBannerOpen(false); lsSet(LS_BANNER, '1'); };

  return (
    <>
      <a className="skip textlink" href="#timetable">Skip to the timetable</a>
      <Nav user={user} percent={stats.percent} darkMode={darkMode} setDarkMode={setDarkMode} onSignIn={signIn} onSignOut={signOutUser}
        onExport={exportProgress} onImport={importProgress} onReset={() => setShowReset(true)} />

      <main id="main" className="container main">
        <Head user={user} bannerOpen={bannerOpen} onDismiss={dismissBanner} onSignIn={signIn} stats={stats} next={next} curriculum={CURRICULUM} onJump={jump} />
        <Curriculum curriculum={CURRICULUM} progress={progress} stats={stats} onToggle={toggle} activeMonth={activeMonth} setActiveMonth={setActiveMonth} />
        <Guide />
        <Jobs jobs={JOBS} />
        <Roadmap projects={PROJECTS} />
      </main>

      <Footer />
      {showReset && <ResetModal onCancel={() => setShowReset(false)} onConfirm={reset} />}
      <Toast toast={toast} />
    </>
  );
}
