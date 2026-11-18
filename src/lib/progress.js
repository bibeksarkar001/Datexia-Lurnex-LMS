// Pure progress helpers. Keys: <monthId>_<weekId>, <monthId>_p<i>, <monthId>_iq.

// All checkable items of a month, in display order.
export function monthItems(month) {
  return [
    ...month.weeks.map((w) => ({ key: `${month.id}_${w.id}`, label: w.text })),
    ...month.projects.map((p, i) => ({ key: `${month.id}_p${i}`, label: `Project: ${p}` })),
    { key: `${month.id}_iq`, label: month.iq },
  ];
}

export function allKeys(curriculum) {
  return curriculum.flatMap((p) => p.months.flatMap((m) => monthItems(m).map((i) => i.key)));
}

// Counts only keys that exist in the curriculum.
export function computeStats(curriculum, progress = {}) {
  const phases = {};
  const months = {};
  let total = 0;
  let completed = 0;
  let projectsDone = 0;
  let projectsTotal = 0;
  for (const p of curriculum) {
    let pt = 0;
    let pd = 0;
    for (const m of p.months) {
      const items = monthItems(m);
      const done = items.filter((i) => progress[i.key] === true).length;
      months[m.id] = { total: items.length, done, complete: done === items.length };
      m.projects.forEach((_, i) => {
        projectsTotal++;
        if (progress[`${m.id}_p${i}`] === true) projectsDone++;
      });
      pt += items.length;
      pd += done;
    }
    phases[p.phaseId] = { total: pt, done: pd, percent: pt ? Math.round((pd / pt) * 100) : 0 };
    total += pt;
    completed += pd;
  }
  return {
    total,
    completed,
    percent: total ? Math.round((completed / total) * 100) : 0,
    phases,
    months,
    monthsDone: Object.values(months).filter((m) => m.complete).length,
    monthsTotal: Object.keys(months).length,
    projectsDone,
    projectsTotal,
  };
}

export function findNextTask(curriculum, progress = {}) {
  for (const p of curriculum) {
    for (const m of p.months) {
      for (const it of monthItems(m)) {
        if (progress[it.key] !== true) return { phaseId: p.phaseId, monthId: m.id, key: it.key, label: it.label };
      }
    }
  }
  return null;
}

// Union of true keys.
export function mergeProgress(a = {}, b = {}) {
  const out = {};
  for (const k of Object.keys(a)) if (a[k] === true) out[k] = true;
  for (const k of Object.keys(b)) if (b[k] === true) out[k] = true;
  return out;
}

export function sameProgress(a, b) {
  const ka = Object.keys(a).filter((k) => a[k] === true);
  const kb = Object.keys(b).filter((k) => b[k] === true);
  return ka.length === kb.length && ka.every((k) => b[k] === true);
}

// Returns a clean {key:true} object, or null if invalid.
export function validateImport(data, curriculum) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null;
  const known = new Set(allKeys(curriculum));
  const out = {};
  for (const [k, v] of Object.entries(data)) {
    if (typeof v !== 'boolean' || !known.has(k)) return null;
    if (v) out[k] = true;
  }
  return out;
}
