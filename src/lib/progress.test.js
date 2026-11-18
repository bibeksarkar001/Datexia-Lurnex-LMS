import test from 'node:test';
import assert from 'node:assert/strict';
import { CURRICULUM } from '../data/curriculum.js';
import { computeStats, findNextTask, mergeProgress, validateImport } from './progress.js';

test('empty progress', () => {
  const s = computeStats(CURRICULUM, {});
  assert.equal(s.completed, 0);
  assert.ok(s.total > 100);
  assert.equal(findNextTask(CURRICULUM, {}).key, 'm1_w1');
});

test('unknown keys are not counted', () => {
  const s = computeStats(CURRICULUM, { m1_w1: true, bogus: true, m1_w2: false });
  assert.equal(s.completed, 1);
  assert.equal(s.months.m1.done, 1);
});

test('findNextTask skips checked, null when done', () => {
  assert.equal(findNextTask(CURRICULUM, { m1_w1: true }).key, 'm1_w2');
  const all = {};
  CURRICULUM.forEach((p) => p.months.forEach((m) => {
    m.weeks.forEach((w) => (all[`${m.id}_${w.id}`] = true));
    m.projects.forEach((_, i) => (all[`${m.id}_p${i}`] = true));
    all[`${m.id}_iq`] = true;
  }));
  assert.equal(findNextTask(CURRICULUM, all), null);
  assert.equal(computeStats(CURRICULUM, all).percent, 100);
});

test('mergeProgress unions true keys', () => {
  assert.deepEqual(mergeProgress({ a: true, b: false }, { b: true, c: true }), { a: true, b: true, c: true });
});

test('validateImport', () => {
  assert.deepEqual(validateImport({ m1_w1: true, m1_w2: false }, CURRICULUM), { m1_w1: true });
  assert.equal(validateImport({ nope: true }, CURRICULUM), null);
  assert.equal(validateImport({ m1_w1: 'yes' }, CURRICULUM), null);
  assert.equal(validateImport([], CURRICULUM), null);
});
