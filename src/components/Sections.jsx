import React, { useEffect, useRef, useState } from 'react';
import { Briefcase, Terminal, RotateCcw, Github } from 'lucide-react';

// Fade/slide in when scrolled into view (CSS handles reduced motion).
export function Reveal({ children, className = '', ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') { el?.classList.add('is-visible'); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('is-visible'); io.disconnect(); } }, { rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} {...rest}>{children}</div>;
}

export function Jobs({ jobs }) {
  return (
    <section>
      <h3 className="mb-8 flex items-center gap-3 text-2xl font-black uppercase tracking-wide"><Briefcase className="text-teal-500" /> 2026 Job Roles & Benchmarks</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Reveal key={job.role}>
            <div className="card card-lift h-full p-6">
              <h4 className="mb-1 text-lg font-bold">{job.role}</h4>
              <p className="mb-3 font-mono font-bold text-teal-600 dark:text-teal-400">{job.pay}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{job.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-4 text-xs opacity-60">Indicative 2026 India salary ranges — research current market data before decisions.</p>
    </section>
  );
}

const DIFFS = ['All', 'Beginner', 'Foundational', 'Intermediate', 'Advanced', 'Master'];
const DIFF_STYLE = {
  Master: 'bg-amber-500/20 text-amber-700 dark:text-amber-400',
  Advanced: 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-400',
  Intermediate: 'bg-teal-500/20 text-teal-700 dark:text-teal-400',
};

export function Roadmap({ projects }) {
  const [diff, setDiff] = useState('All');
  const rows = diff === 'All' ? projects : projects.filter((p) => p.diff === diff);
  return (
    <section>
      <h3 className="mb-6 flex items-center gap-3 text-2xl font-black uppercase tracking-wide"><Terminal className="text-teal-500" /> Complete Project Roadmap</h3>
      <div role="group" aria-label="Filter projects by difficulty" className="mb-4 flex flex-wrap gap-2">
        {DIFFS.map((d) => (
          <button key={d} onClick={() => setDiff(d)} aria-pressed={diff === d}
            className={`ring-focus rounded-full border px-3 py-1 text-xs font-bold transition ${diff === d ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300 hover:border-teal-500 dark:border-slate-700'}`}>
            {d}
          </button>
        ))}
      </div>
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-widest text-slate-500 dark:border-slate-800 dark:bg-slate-950">
              <th scope="col" className="p-4">Phase</th><th scope="col" className="p-4">Month</th><th scope="col" className="p-4">Project Name</th><th scope="col" className="p-4">Difficulty</th><th scope="col" className="p-4">Core Focus</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {rows.map((p) => (
              <tr key={p.name} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50">
                <td className="p-4 font-bold opacity-70">{p.phase}</td>
                <td className="p-4 font-mono">{p.m}</td>
                <td className="p-4 font-bold">{p.name}</td>
                <td className="p-4"><span className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase ${DIFF_STYLE[p.diff] || 'bg-slate-500/20 text-slate-700 dark:text-slate-400'}`}>{p.diff}</span></td>
                <td className="p-4 opacity-80">{p.focus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function ResetModal({ onCancel, onConfirm }) {
  const cancelRef = useRef(null);
  useEffect(() => {
    cancelRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onCancel();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onCancel]);
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm" onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
      <div role="dialog" aria-modal="true" aria-labelledby="reset-title" aria-describedby="reset-desc" className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl dark:border dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-500"><RotateCcw size={32} /></div>
        <h3 id="reset-title" className="mb-2 text-center text-2xl font-black">Reset Tracking?</h3>
        <p id="reset-desc" className="mb-8 text-center text-sm opacity-70">This will clear all your checkboxes across all 26 months. This action cannot be undone.</p>
        <div className="flex gap-4">
          <button ref={cancelRef} onClick={onCancel} className="ring-focus flex-1 rounded-xl bg-slate-100 py-3 font-bold transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">Cancel</button>
          <button onClick={onConfirm} className="ring-focus flex-1 rounded-xl bg-red-600 py-3 font-bold text-white shadow-lg shadow-red-600/20 transition-all hover:bg-red-700">Reset All</button>
        </div>
      </div>
    </div>
  );
}

export function Toast({ toast }) {
  if (!toast) return null;
  const tone = toast.type === 'error' ? 'border-red-500/50 bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200' : 'border-teal-500/50 bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100';
  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-4 z-[110] flex justify-center px-4">
      <div className={`toast-in pointer-events-auto max-w-md rounded-xl border px-4 py-3 text-sm font-semibold shadow-xl ${tone}`}>{toast.msg}</div>
    </div>
  );
}

export function Footer() {
  const link = 'ring-focus rounded underline-offset-4 hover:text-teal-600 hover:underline dark:hover:text-teal-400';
  const ext = { target: '_blank', rel: 'noopener noreferrer' };
  return (
    <footer className="border-t border-slate-200 px-6 py-10 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p>Made by bibeksarkar001</p>
        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <a className={`${link} inline-flex items-center gap-1.5`} href="https://github.com/bibeksarkar001/Datexia-Lurnex-LMS" {...ext}><Github size={14} /> GitHub</a>
          <a className={link} href="https://github.com/bibeksarkar001/Datexia-Lurnex-LMS/blob/main/USER_GUIDE.md" {...ext}>User Guide</a>
          <a className={link} href="https://github.com/bibeksarkar001/Datexia-Lurnex-LMS/blob/main/LICENSE" {...ext}>MIT License</a>
          <a className={link} href="https://bibeksarkar001.github.io/Datexia-Lurnex-LMS/">Classic version</a>
        </nav>
      </div>
    </footer>
  );
}
