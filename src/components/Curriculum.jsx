import React, { useMemo, useState } from 'react';
import { Reveal } from './Sections.jsx';
import { BookOpen, Brain, Check, ChevronDown, Code, ExternalLink, GraduationCap, Search, ShieldCheck } from 'lucide-react';

const TONES = {
  teal: { on: 'bg-teal-500/10 border-teal-500/30', box: 'bg-teal-500 border-teal-500', text: 'text-teal-700 dark:text-teal-300' },
  indigo: { on: 'bg-indigo-500/10 border-indigo-500/30', box: 'bg-indigo-500 border-indigo-500', text: 'text-indigo-700 dark:text-indigo-300' },
  amber: { on: 'bg-amber-500/10 border-amber-500/30', box: 'bg-amber-500 border-amber-500', text: 'text-amber-700 dark:text-amber-300' },
};
const ext = { target: '_blank', rel: 'noopener noreferrer' };

function Task({ id, checked, onToggle, tone, bold, children }) {
  const t = TONES[tone];
  return (
    <label id={id} className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal-500 ${checked ? t.on : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-600'}`}>
      <input type="checkbox" className="sr-only" checked={!!checked} onChange={onToggle} />
      <span aria-hidden="true" className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border-2 ${checked ? t.box : 'border-slate-400 dark:border-slate-600'}`}>
        {checked && <Check size={12} strokeWidth={4} className="tick-pop text-white" />}
      </span>
      <span className={`text-sm ${bold ? 'font-bold' : 'font-medium'} ${checked ? t.text : ''}`}>{children}</span>
    </label>
  );
}

function Collapse({ open, children }) {
  return (
    <div className={`collapse-grid ${open ? 'is-open' : ''}`}>
      <div className="collapse-inner" inert={open ? undefined : ''} aria-hidden={!open}>{children}</div>
    </div>
  );
}

function matches(m, q) {
  const hay = [m.title, m.description, m.course, ...(m.options || []).map((o) => o.course), ...m.weeks.map((w) => w.text), ...m.projects]
    .filter(Boolean).join('\n').toLowerCase();
  return hay.includes(q);
}

export default function Curriculum({ curriculum, progress, stats, onToggle, activePhase, setActivePhase, activeMonth, setActiveMonth }) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const visible = useMemo(
    () => curriculum.map((p) => ({ ...p, months: q ? p.months.filter((m) => matches(m, q)) : p.months })).filter((p) => !q || p.months.length),
    [curriculum, q],
  );

  return (
    <section id="tracker">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h3 className="mb-2 flex items-center gap-3 text-2xl font-black uppercase tracking-wide"><BookOpen className="text-teal-500" /> Interactive Learning Curriculum</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Track your progress week by week. Open a phase to see its months.</p>
        </div>
        <div className="relative w-full md:w-80">
          <label htmlFor="curriculum-search" className="sr-only">Search curriculum</label>
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
          <input id="curriculum-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search months, weeks, courses…"
            className="ring-focus w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm dark:border-slate-700 dark:bg-slate-900" />
        </div>
      </div>

      {q && !visible.length && <p className="card p-6 text-center text-sm opacity-70">No matches for “{query}”.</p>}

      <div className="space-y-4">
        {visible.map((phase) => {
          const isOpen = q ? true : activePhase === phase.phaseId;
          const ps = stats.phases[phase.phaseId];
          return (
            <Reveal key={phase.phaseId} id={`phase-${phase.phaseId}`} className="scroll-mt-24">
              <div className={`card ${isOpen ? 'ring-2 ring-teal-500/20' : ''}`}>
                <button aria-expanded={isOpen} aria-controls={`panel-${phase.phaseId}`} onClick={() => setActivePhase(isOpen && !q ? null : phase.phaseId)}
                  className="ring-focus flex w-full select-none flex-col justify-between gap-4 rounded-2xl p-6 text-left md:flex-row md:items-center">
                  <span className="block">
                    <span className="mb-1 block text-xl font-black">{phase.title}</span>
                    <span className="flex flex-wrap items-center gap-3 text-sm opacity-70">
                      <span className="rounded bg-teal-500/10 px-2 py-0.5 font-mono font-bold text-teal-600 dark:text-teal-400">{phase.duration}</span>
                      <span>Goal: {phase.goal}</span>
                    </span>
                  </span>
                  <span className="flex items-center gap-6">
                    <span className="hidden flex-col items-end sm:flex"><span className="eyebrow">Phase Progress</span><span className="font-mono font-bold text-teal-500">{ps.percent}%</span></span>
                    <ChevronDown size={24} className={`opacity-50 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </span>
                </button>

                <Collapse open={isOpen}>
                  <div id={`panel-${phase.phaseId}`} className="space-y-4 border-t border-slate-100 p-6 dark:border-slate-800">
                    {phase.months.map((month) => {
                      const ms = stats.months[month.id];
                      const mOpen = activeMonth === month.id;
                      return (
                        <div key={month.id} id={`month-${month.id}`} className="scroll-mt-24 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                          <button aria-expanded={mOpen} aria-controls={`mpanel-${month.id}`} onClick={() => setActiveMonth(mOpen ? null : month.id)}
                            className={`ring-focus flex w-full items-center justify-between gap-3 p-5 text-left transition-colors hover:bg-black/5 dark:hover:bg-white/5 ${ms.complete ? 'bg-teal-500/5' : ''}`}>
                            <span className="flex items-center gap-4">
                              {ms.complete ? <ShieldCheck className="shrink-0 text-teal-500" size={24} /> : <span className="h-6 w-6 shrink-0 rounded-full border-2 border-slate-400 dark:border-slate-600" />}
                              <span className="text-lg font-bold">{month.title}</span>
                            </span>
                            <span className="flex items-center gap-4">
                              <span className="font-mono text-xs opacity-60">{ms.done}/{ms.total}</span>
                              <ChevronDown size={20} className={`opacity-50 transition-transform ${mOpen ? 'rotate-180' : ''}`} />
                            </span>
                          </button>
                          <Collapse open={mOpen}>
                            <div id={`mpanel-${month.id}`} className="border-t border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/50">
                              <p className="mb-6 rounded-xl border border-slate-100 bg-white/50 p-4 text-sm leading-relaxed text-slate-600 dark:border-slate-800/50 dark:bg-slate-950/50 dark:text-slate-400">{month.description}</p>
                              <div className="mb-8 space-y-3">
                                <p className="px-1 text-[10px] font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400">Primary Study Material</p>
                                {month.options ? (
                                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {month.options.map((o) => (
                                      <a key={o.link} href={o.link} {...ext} className="ring-focus group flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-teal-500 dark:border-slate-700 dark:bg-slate-900 md:flex-row md:items-center">
                                        <span>
                                          <span className={`mb-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${o.type === 'Free' ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' : 'bg-amber-500/20 text-amber-700 dark:text-amber-400'}`}>{o.type} Route</span>
                                          <span className="block text-sm font-bold transition-colors group-hover:text-teal-600 dark:group-hover:text-teal-400">{o.course}</span>
                                        </span>
                                        <span className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-bold text-teal-600 dark:text-teal-400"><ExternalLink size={14} /> Access</span>
                                      </a>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900 md:flex-row md:items-center">
                                    <p className="font-bold">{month.course}</p>
                                    <a href={month.link} {...ext} className="ring-focus inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-teal-600/20 transition-colors hover:bg-teal-700"><GraduationCap size={18} /> Apply / Read</a>
                                  </div>
                                )}
                              </div>
                              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                <div>
                                  <h6 className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-50"><BookOpen size={14} /> Weekly Curriculum</h6>
                                  <div className="space-y-2">
                                    {month.weeks.map((w) => { const k = `${month.id}_${w.id}`; return <Task key={k} id={`task-${k}`} checked={progress[k]} onToggle={() => onToggle(k)} tone="teal">{w.text}</Task>; })}
                                  </div>
                                </div>
                                <div>
                                  <h6 className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-50"><Code size={14} /> Projects & Habit</h6>
                                  <div className="mb-6 space-y-2">
                                    {month.projects.map((p, i) => { const k = `${month.id}_p${i}`; return <Task key={k} id={`task-${k}`} checked={progress[k]} onToggle={() => onToggle(k)} tone="indigo" bold>Project: {p}</Task>; })}
                                  </div>
                                  <Task id={`task-${month.id}_iq`} checked={progress[`${month.id}_iq`]} onToggle={() => onToggle(`${month.id}_iq`)} tone="amber" bold>
                                    <span className="inline-flex items-center gap-2"><Brain size={16} /> {month.iq}</span>
                                  </Task>
                                </div>
                              </div>
                            </div>
                          </Collapse>
                        </div>
                      );
                    })}
                  </div>
                </Collapse>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
