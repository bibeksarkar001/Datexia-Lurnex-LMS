import React from 'react';

const roman = (phase) => phase.title.split(':')[0].replace('Phase ', '');

export default function Head({ user, bannerOpen, onDismiss, onSignIn, stats, next, curriculum, onJump }) {
  const phase = next && curriculum.find((p) => p.phaseId === next.phaseId);
  const monthNo = next ? Number(next.monthId.slice(1)) : 0;
  const fresh = stats.completed === 0;
  const figures = [
    [stats.completed, stats.total, 'Tasks done'],
    [stats.monthsDone, stats.monthsTotal, 'Months complete'],
    [stats.projectsDone, stats.projectsTotal, 'Projects done'],
  ];

  return (
    <section className="head" aria-labelledby="page-title">
      <div className="head__intro">
        <h1 id="page-title">From API consumer to sovereign architect</h1>
        <p className="lead">A free 26-month roadmap from the Unix shell to CUDA kernels and AI agents. Tick each task as you go.</p>
        {user ? (
          <p className="head__sync">Synced to your Google account.</p>
        ) : bannerOpen && (
          <p className="head__sync">
            Saved in this browser.
            <button type="button" className="textlink" onClick={onSignIn}>Sign in with Google to sync</button>
            <button type="button" className="textlink" aria-label="Hide this note" onClick={onDismiss}>Hide</button>
          </p>
        )}
      </div>

      <section className="nextup" aria-labelledby="nextup-title">
        {next ? (
          <>
            <h2 id="nextup-title">Next up</h2>
            <p className="nextup__task">{next.label}</p>
            <p className="label">{`Month ${monthNo}, Phase ${roman(phase)}`}</p>
            <button type="button" className="btn btn--primary" onClick={() => onJump(next)}>{fresh ? 'Start month 1' : `Open month ${monthNo}`}</button>
          </>
        ) : (
          <>
            <h2 id="nextup-title">All 26 months done</h2>
            <p>Every task is ticked. You are ready to build and ship the system.</p>
          </>
        )}
      </section>

      <div className="figures">
        {figures.map(([d, t, l]) => (
          <div key={l}><p className="figure">{d}<small>/{t}</small></p><p className="label">{l}</p></div>
        ))}
        <div><p className="figure">{stats.percent}<small>%</small></p><p className="label">Of the roadmap</p></div>
      </div>
    </section>
  );
}
