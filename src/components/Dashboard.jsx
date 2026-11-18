import React from 'react';
import { ArrowRight, PartyPopper } from 'lucide-react';

const R = 52;
const C = 2 * Math.PI * R;

function Ring({ percent }) {
  return (
    <div className="relative h-32 w-32 shrink-0">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" role="img" aria-label={`Overall progress ${percent}%`}>
        <circle cx="60" cy="60" r={R} fill="none" strokeWidth="10" className="stroke-slate-200 dark:stroke-slate-800" />
        <circle
          cx="60" cy="60" r={R} fill="none" strokeWidth="10" strokeLinecap="round"
          className="stroke-teal-500" style={{ transition: 'stroke-dashoffset .6s ease' }}
          strokeDasharray={C} strokeDashoffset={C * (1 - percent / 100)}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-3xl font-black leading-none">{percent}%</span>
        <span className="eyebrow mt-1">Overall</span>
      </div>
    </div>
  );
}

export function ContinueCard({ next, curriculum, onJump }) {
  if (!next) {
    return (
      <div className="card flex items-center gap-4 border-teal-500/40 bg-teal-500/5 p-6">
        <PartyPopper className="shrink-0 text-teal-500" size={28} />
        <div>
          <p className="font-black uppercase tracking-wide">Curriculum complete</p>
          <p className="text-sm opacity-70">Every task is checked off. You are ready to build and ship the factory.</p>
        </div>
      </div>
    );
  }
  const phase = curriculum.find((p) => p.phaseId === next.phaseId);
  const month = phase.months.find((m) => m.id === next.monthId);
  return (
    <div className="card card-lift flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="eyebrow text-teal-600 opacity-100 dark:text-teal-400">Continue where you left off</p>
        <p className="mt-1 text-lg font-bold">{next.label}</p>
        <p className="mt-0.5 text-sm opacity-70">{month.title} · {phase.title.split(':')[0]}</p>
      </div>
      <button onClick={() => onJump(next)} className="ring-focus inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-teal-600/20 transition hover:bg-teal-700">
        Jump to it <ArrowRight size={16} />
      </button>
    </div>
  );
}

export function ProgressStrip({ stats, curriculum, onOpenPhase }) {
  return (
    <div className="card grid gap-6 p-6 md:grid-cols-[auto_1fr] md:items-center md:gap-10">
      <div className="flex items-center gap-6">
        <Ring percent={stats.percent} />
        <dl className="space-y-2 text-sm">
          <div><dt className="eyebrow">Tasks done</dt><dd className="font-mono text-lg font-bold">{stats.completed} / {stats.total}</dd></div>
          <div><dt className="eyebrow">Months complete</dt><dd className="font-mono text-lg font-bold">{stats.monthsDone} / {stats.monthsTotal}</dd></div>
          <div><dt className="eyebrow">Projects done</dt><dd className="font-mono text-lg font-bold">{stats.projectsDone} / {stats.projectsTotal}</dd></div>
        </dl>
      </div>
      <ul className="grid gap-2">
        {curriculum.map((p) => {
          const s = stats.phases[p.phaseId];
          return (
            <li key={p.phaseId}>
              <button onClick={() => onOpenPhase(p.phaseId)} className="ring-focus group flex w-full items-center gap-3 rounded-lg px-2 py-1 text-left hover:bg-slate-100 dark:hover:bg-slate-800/60" aria-label={`Open ${p.title}, ${s.percent}% complete`}>
                <span className="w-14 shrink-0 font-mono text-xs font-bold opacity-70">{p.title.split(':')[0].replace('Phase ', 'Ph ')}</span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <span className="block h-full rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 transition-all duration-500" style={{ width: `${s.percent}%` }} />
                </span>
                <span className="w-10 text-right font-mono text-xs font-bold">{s.percent}%</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
