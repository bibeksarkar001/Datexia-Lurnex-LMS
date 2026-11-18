import React, { useEffect, useRef, useState } from 'react';
import { Download, LogIn, LogOut, MoreVertical, Moon, RotateCcw, Sun, Upload } from 'lucide-react';

export default function Nav({ user, percent, darkMode, setDarkMode, onSignIn, onSignOut, onExport, onImport, onReset }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const down = (e) => wrap.current && !wrap.current.contains(e.target) && setOpen(false);
    const key = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', down);
    document.addEventListener('keydown', key);
    return () => { document.removeEventListener('mousedown', down); document.removeEventListener('keydown', key); };
  }, [open]);

  const menuBtn = { 'aria-haspopup': 'menu', 'aria-expanded': open, onClick: () => setOpen(!open) };

  return (
    <header className="topbar">
      <div className="container topbar__inner">
        <a className="wordmark" href="#main" aria-label="Datexia Lurnex LMS, back to top">Lurnex</a>
        <div className="topbar__actions">
          <span className="topbar__done">{percent}% done</span>
          <button type="button" className="btn btn--icon" onClick={() => setDarkMode(!darkMode)} aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}>
            {darkMode ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
          </button>
          {!user && (
            <button type="button" className="btn" onClick={onSignIn}>
              <LogIn size={16} aria-hidden="true" /><span className="topbar__label">Sign in to sync</span>
            </button>
          )}
          <div className="menu-wrap" ref={wrap}>
            {user && (
              <button type="button" className="btn btn--icon" aria-label="Account menu" {...menuBtn}>
                {user.photoURL
                  ? <img className="avatar" src={user.photoURL} alt="" referrerPolicy="no-referrer" />
                  : <span aria-hidden="true">{(user.displayName || 'U')[0].toUpperCase()}</span>}
              </button>
            )}
            <button type="button" className="btn btn--icon" aria-label="Progress menu" {...menuBtn}><MoreVertical size={16} aria-hidden="true" /></button>
            {open && (
              <div className="menu" role="menu">
                {user && <div className="menu__who"><p>{user.displayName || 'Architect'}</p><p className="label">{user.email}</p></div>}
                <button type="button" role="menuitem" className="menu__item" onClick={() => { setOpen(false); onExport(); }}><Download size={16} aria-hidden="true" />Export progress (JSON)</button>
                <button type="button" role="menuitem" className="menu__item" onClick={() => fileRef.current?.click()}><Upload size={16} aria-hidden="true" />Import progress</button>
                <button type="button" role="menuitem" className="menu__item menu__item--danger" onClick={() => { setOpen(false); onReset(); }}><RotateCcw size={16} aria-hidden="true" />Reset progress</button>
                {user && <button type="button" role="menuitem" className="menu__item" onClick={() => { setOpen(false); onSignOut(); }}><LogOut size={16} aria-hidden="true" />Sign out</button>}
              </div>
            )}
            <input ref={fileRef} type="file" accept="application/json,.json" className="visually-hidden" tabIndex={-1} aria-hidden="true"
              onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ''; setOpen(false); if (f) onImport(f); }} />
          </div>
        </div>
      </div>
    </header>
  );
}
