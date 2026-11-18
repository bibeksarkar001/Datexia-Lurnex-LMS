import React, { useEffect, useRef, useState } from 'react';
import { Cpu, Download, LogIn, LogOut, MoreVertical, Moon, RotateCcw, Sun, Upload } from 'lucide-react';

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

  const item = 'ring-focus flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-bold transition-colors hover:bg-slate-100 dark:hover:bg-slate-800';
  const themeBtn = (active, on) => `ring-focus rounded-md p-2 transition-all ${active ? `bg-white shadow-sm dark:bg-slate-800 ${on}` : 'text-slate-500'}`;

  return (
    <nav aria-label="Main" className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/70 px-4 py-3 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/70 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 p-2 text-white shadow-md shadow-teal-600/20"><Cpu size={22} /></div>
          <div className="min-w-0">
            <p className="truncate text-base font-bold uppercase leading-tight tracking-wide sm:text-lg"><span className="sr-only sm:hidden">Datexia Lurnex LMS</span><span className="hidden sm:inline">Datexia Lurnex LMS</span></p>
            <p className="hidden text-xs font-semibold tracking-widest text-teal-600 dark:text-teal-400 sm:block">Sovereign AI Architect</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="mr-2 hidden flex-col items-end md:flex"><span className="eyebrow">Completion</span><span className="font-mono text-lg font-bold leading-none text-teal-500">{percent}%</span></div>

          <div role="group" aria-label="Theme" className="flex rounded-lg bg-slate-100 p-1 dark:bg-slate-900">
            <button aria-label="Light theme" aria-pressed={!darkMode} onClick={() => setDarkMode(false)} className={themeBtn(!darkMode, 'text-amber-500')}><Sun size={16} /></button>
            <button aria-label="Dark theme" aria-pressed={darkMode} onClick={() => setDarkMode(true)} className={themeBtn(darkMode, 'text-indigo-400')}><Moon size={16} /></button>
          </div>

          {user ? (
            <span className="flex items-center gap-2 rounded-full border border-slate-300 py-1 pl-1 pr-1 dark:border-slate-700 sm:pr-3">
              {user.photoURL
                ? <img src={user.photoURL} alt="" referrerPolicy="no-referrer" className="h-7 w-7 rounded-full object-cover" />
                : <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">{(user.displayName || 'U')[0].toUpperCase()}</span>}
              <span className="hidden max-w-[120px] truncate text-sm font-bold sm:block">{user.displayName || 'Architect'}</span>
            </span>
          ) : (
            <button onClick={onSignIn} className="ring-focus inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-teal-600 px-3 py-2 text-sm font-bold text-white shadow-md shadow-teal-600/20 transition hover:bg-teal-700">
              <LogIn size={16} /> <span className="hidden lg:inline">Sign in with Google to sync across devices</span><span className="lg:hidden">Sign in</span>
            </button>
          )}

          <div className="relative" ref={wrap}>
            <button aria-label="Progress menu" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(!open)} className="ring-focus rounded-lg border border-slate-300 p-2 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"><MoreVertical size={18} /></button>
            {open && (
              <div role="menu" className="menu-in absolute right-0 mt-3 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                {user && <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800"><p className="truncate text-sm font-bold">{user.displayName || 'Architect'}</p><p className="truncate text-xs text-slate-500">{user.email}</p></div>}
                <button role="menuitem" className={item} onClick={() => { setOpen(false); onExport(); }}><Download size={16} /> Download progress (JSON)</button>
                <button role="menuitem" className={item} onClick={() => fileRef.current?.click()}><Upload size={16} /> Import progress (JSON)</button>
                <button role="menuitem" className={`${item} text-red-500`} onClick={() => { setOpen(false); onReset(); }}><RotateCcw size={16} /> Reset progress</button>
                {user && <button role="menuitem" className={`${item} border-t border-slate-100 dark:border-slate-800`} onClick={() => { setOpen(false); onSignOut(); }}><LogOut size={16} /> Sign out</button>}
              </div>
            )}
            <input ref={fileRef} type="file" accept="application/json,.json" className="sr-only" tabIndex={-1} aria-hidden="true"
              onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ''; setOpen(false); if (f) onImport(f); }} />
          </div>
        </div>
      </div>
    </nav>
  );
}
