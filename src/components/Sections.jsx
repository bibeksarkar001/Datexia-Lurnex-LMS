import React, { useEffect, useRef, useState } from 'react';

const ext = { target: '_blank', rel: 'noopener noreferrer' };

const STEPS = [
  ['Open the next task', 'The Next up box always points at your first unticked task.'],
  ['Study the linked course', 'Each month links one free or auditable course, from MIT to Hugging Face.'],
  ['Tick what you finish', 'Weekly topics, the project and the study habit. A month turns ink when every box is ticked.'],
  ['Sync if you like', 'Progress saves in this browser. Sign in with Google to carry it to any device.'],
];

export function Guide() {
  return (
    <section className="section" aria-labelledby="guide-title">
      <div className="section__head">
        <h2 id="guide-title">How it works</h2>
        <a className="textlink" href="https://github.com/bibeksarkar001/Datexia-Lurnex-LMS/blob/main/USER_GUIDE.md" {...ext}>Read the full user guide</a>
      </div>
      <ol className="steps plain">
        {STEPS.map(([h, p], i) => (
          <li key={h}><p className="figure" aria-hidden="true">{i + 1}</p><h3>{h}</h3><p>{p}</p></li>
        ))}
      </ol>
    </section>
  );
}

export function Jobs({ jobs }) {
  return (
    <section className="section" aria-labelledby="jobs-title">
      <div className="section__head">
        <h2 id="jobs-title">Roles this roadmap points to</h2>
        <p className="label">Indicative 2026 India ranges. Check current market data before deciding.</p>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th scope="col">Role</th><th scope="col">Pay, INR lakh a year</th><th scope="col">What the role does</th></tr></thead>
          <tbody>
            {jobs.map((j) => (
              <tr key={j.role}>
                <td className="strong">{j.role}</td>
                <td className="nowrap">{j.pay.replace(/^INR\s*/, '').replace(/\s*LPA$/, '')}</td>
                <td className="muted">{j.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const DIFFS = ['All', 'Beginner', 'Foundational', 'Intermediate', 'Advanced', 'Master'];

export function Roadmap({ projects }) {
  const [diff, setDiff] = useState('All');
  const rows = diff === 'All' ? projects : projects.filter((p) => p.diff === diff);
  return (
    <section className="section" aria-labelledby="projects-title">
      <div className="section__head">
        <h2 id="projects-title">The project roadmap</h2>
        <div className="tabs" role="group" aria-label="Filter by difficulty">
          {DIFFS.map((d) => <button type="button" className="tab" key={d} aria-pressed={diff === d} onClick={() => setDiff(d)}>{d}</button>)}
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th scope="col">Month</th><th scope="col">Project</th><th scope="col">Difficulty</th><th scope="col">Focus</th></tr></thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.name}>
                <td className="nowrap">{String(p.m).padStart(2, '0')}</td>
                <td className="strong">{p.name}</td>
                <td>{p.diff}</td>
                <td>{p.focus}</td>
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
    <div className="scrim" onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="dialog" role="dialog" aria-modal="true" aria-labelledby="reset-title" aria-describedby="reset-desc">
        <h2 id="reset-title">Reset all progress?</h2>
        <p id="reset-desc">This clears every ticked box across all 26 months. It cannot be undone.</p>
        <div className="dialog__actions">
          <button type="button" className="btn" ref={cancelRef} onClick={onCancel}>Cancel</button>
          <button type="button" className="btn btn--danger btn--primary" onClick={onConfirm}>Reset progress</button>
        </div>
      </div>
    </div>
  );
}

export function Toast({ toast }) {
  if (!toast) return null;
  const err = toast.type === 'error';
  return <div role={err ? 'alert' : 'status'} className={err ? 'toast toast--error' : 'toast'}>{toast.msg}</div>;
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a className="wordmark" href="#main">Lurnex</a>
          <p>A free, open-source study tracker for the Sovereign AI Architect roadmap.</p>
          <p className="label">MIT licensed. Made by bibeksarkar001.</p>
        </div>
        <div className="footer__cols">
          <div>
            <h2>Project</h2>
            <ul className="plain">
              <li><a className="textlink" href="https://github.com/bibeksarkar001/Datexia-Lurnex-LMS" {...ext}>GitHub</a></li>
              <li><a className="textlink" href="https://github.com/bibeksarkar001/Datexia-Lurnex-LMS/blob/main/USER_GUIDE.md" {...ext}>User guide</a></li>
              <li><a className="textlink" href="https://github.com/bibeksarkar001/Datexia-Lurnex-LMS/issues/new?template=broken_link.yml" {...ext}>Report a broken link</a></li>
              <li><a className="textlink" href="https://github.com/bibeksarkar001/Datexia-Lurnex-LMS/blob/main/LICENSE" {...ext}>MIT license</a></li>
            </ul>
          </div>
          <div>
            <h2>Versions</h2>
            <ul className="plain">
              <li><a className="textlink" href="#main" aria-current="page">v3, this design</a></li>
              <li><a className="textlink" href="https://bibeksarkar001.github.io/Datexia-Lurnex-LMS/v2/">v2</a></li>
              <li><a className="textlink" href="https://bibeksarkar001.github.io/Datexia-Lurnex-LMS/">Classic v1</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
