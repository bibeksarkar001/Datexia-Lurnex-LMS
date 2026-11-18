import React, { useMemo, useRef, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, ExternalLink, Search } from 'lucide-react';

function matches(m, q) {
  const hay = [m.title, m.description, m.course, ...(m.options || []).map((o) => o.course), ...m.weeks.map((w) => w.text), ...m.projects]
    .filter(Boolean).join('\n').toLowerCase();
  return hay.includes(q);
}

const after = (t) => t.split(':').slice(1).join(':').trim();
const two = (n) => String(n).padStart(2, '0');

function Group({ kind, title, items, progress, onToggle }) {
  const done = items.filter((i) => progress[i.key] === true).length;
  return (
    <div className={`checkgroup checkgroup--${kind}`}>
      <div className="checkgroup__head">
        <span className={`swatch swatch--${kind}`} aria-hidden="true" />
        <h3>{title}</h3>
        <span className="label">{done}/{items.length}</span>
      </div>
      {items.map((i) => (
        <label className="check" id={`task-${i.key}`} key={i.key}>
          <input type="checkbox" checked={progress[i.key] === true} onChange={() => onToggle(i.key)} />
          <span className="check__box"><Check size={14} strokeWidth={3} aria-hidden="true" /></span>
          <span>{i.text}</span>
        </label>
      ))}
    </div>
  );
}

export default function Curriculum({ curriculum, progress, stats, onToggle, activeMonth, setActiveMonth }) {
  const [query, setQuery] = useState('');
  const sheetRef = useRef(null);
  const q = query.trim().toLowerCase();
  const all = useMemo(() => curriculum.flatMap((p) => p.months.map((m) => ({ m, p }))), [curriculum]);
  const matched = useMemo(() => new Set(all.filter(({ m }) => !q || matches(m, q)).map(({ m }) => m.id)), [all, q]);

  const select = (id) => {
    setActiveMonth(id);
    if (window.matchMedia?.('(max-width: 75rem)').matches) sheetRef.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  };

  const idx = Math.max(0, all.findIndex(({ m }) => m.id === activeMonth));
  const { m: month, p: phase } = all[idx];
  const prev = all[idx - 1]?.m;
  const nextM = all[idx + 1]?.m;
  const courses = month.options || [{ course: month.course, link: month.link }];
  const roman = phase.title.split(':')[0].replace('Phase ', '');

  return (
    <section className="workspace">
      <section className="timetable" id="timetable" aria-labelledby="tt-title">
        <div className="timetable__bar">
          <div>
            <h2 id="tt-title">The 26-month timetable</h2>
            <ul className="legend plain">
              <li><span className="swatch swatch--weeks" aria-hidden="true" />Weekly topics</li>
              <li><span className="swatch swatch--project" aria-hidden="true" />Project</li>
              <li><span className="swatch swatch--habit" aria-hidden="true" />Study habit</li>
            </ul>
          </div>
          <div className="search">
            <Search size={16} aria-hidden="true" />
            <label className="visually-hidden" htmlFor="tt-search">Search the curriculum</label>
            <input id="tt-search" className="input" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search topics, projects, courses" />
          </div>
        </div>
        {q && <p className="label" role="status">{matched.size ? `${matched.size} months match` : 'No months match. Try a course or topic name.'}</p>}

        <div className="grid">
          {curriculum.map((ph) => {
            const [name, ...rest] = ph.title.split(':');
            return (
              <div className="phase" role="group" aria-label={ph.title} key={ph.phaseId}>
                <div className="phase__name">
                  <span className="figure">{name}</span>
                  <p>{rest.join(':').trim()}</p>
                  <span className="label">{stats.phases[ph.phaseId].percent}%</span>
                </div>
                {ph.months.map((m) => {
                  const ms = stats.months[m.id];
                  const n = Number(m.id.slice(1));
                  const wd = m.weeks.filter((w) => progress[`${m.id}_${w.id}`] === true).length;
                  const pd = m.projects.filter((_, i) => progress[`${m.id}_p${i}`] === true).length;
                  const cls = ['month', ms.complete && 'is-done', q && !matched.has(m.id) && 'is-dimmed', ph.months.length === 2 && 'month--wide'].filter(Boolean).join(' ');
                  return (
                    <button type="button" key={m.id} className={cls} onClick={() => select(m.id)}
                      aria-current={m.id === activeMonth ? 'true' : undefined}
                      aria-label={`Month ${n}, ${after(m.title)}, ${ms.complete ? 'complete' : `${ms.done} of ${ms.total} done`}`}>
                      <div className="month__top">
                        <span className="figure month__num">{two(n)}</span>
                        <span className="month__count">{ms.complete ? 'Done' : `${ms.done}/${ms.total}`}</span>
                      </div>
                      <p className="month__title">{after(m.title)}</p>
                      <div className="bars" aria-hidden="true">
                        <div className="bar bar--weeks"><i style={{ '--p': wd / m.weeks.length }} /></div>
                        <div className="bar bar--project"><i style={{ '--p': pd / m.projects.length }} /></div>
                        <div className="bar bar--habit"><i style={{ '--p': progress[`${m.id}_iq`] === true ? 1 : 0 }} /></div>
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </section>

      <aside className="sheet" ref={sheetRef} aria-labelledby="sheet-title">
        <div className="sheet__head">
          <p className="label">{`Phase ${roman}, month ${idx + 1} of ${all.length}`}</p>
          <h2 id="sheet-title">{after(month.title)}</h2>
          <p>{month.description}</p>
        </div>
        <div className="sheet__course">
          <p className="label">Course</p>
          {courses.map((o) => (
            <div className="sheet__course-row" key={o.link}>
              <p>{o.course}{o.type ? ` (${o.type.toLowerCase()} route)` : ''}</p>
              <a className="btn" href={o.link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${o.course} (opens in a new tab)`}>Open course <ExternalLink size={14} aria-hidden="true" /></a>
            </div>
          ))}
        </div>
        <Group kind="weeks" title="Weekly topics" progress={progress} onToggle={onToggle}
          items={month.weeks.map((w) => ({ key: `${month.id}_${w.id}`, text: w.text }))} />
        <Group kind="project" title={month.projects.length > 1 ? 'Projects' : 'Project'} progress={progress} onToggle={onToggle}
          items={month.projects.map((p, i) => ({ key: `${month.id}_p${i}`, text: p }))} />
        <Group kind="habit" title="Study habit" progress={progress} onToggle={onToggle}
          items={[{ key: `${month.id}_iq`, text: month.iq }]} />
        <div className="sheet__nav">
          <button type="button" className="btn" disabled={!prev} onClick={() => setActiveMonth(prev.id)}><ChevronLeft size={16} aria-hidden="true" />{`Month ${idx}`}</button>
          <button type="button" className="btn" disabled={!nextM} onClick={() => setActiveMonth(nextM.id)}>{`Month ${idx + 2}`}<ChevronRight size={16} aria-hidden="true" /></button>
        </div>
      </aside>
    </section>
  );
}
