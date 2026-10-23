import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import test from 'node:test';

test('main library ceases all tracker use and exposes two accessible grouping tabs', () => {
  const app = readFileSync(new URL('../app/training-app.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(app, /localStorage|setTimer|Save to history|week-chip|How are you arriving/);
  assert.match(app, /By session/);
  assert.match(app, /By muscle area/);
  assert.match(app, /role="tablist"/);
  assert.match(app, /aria-controls/);
});

test('area index references all 27 canonical exercises without copying source records', async () => {
  const data = readFileSync(new URL('../app/training-data.ts', import.meta.url), 'utf8').replace(/^import type .*;\n/gm, '');
  const { drJoeLibrary } = await import(`data:text/javascript;base64,${Buffer.from(stripTypeScriptTypes(data)).toString('base64')}`);
  const source = readFileSync(new URL('../app/library-areas.ts', import.meta.url), 'utf8').replace(/^import .*;\n/gm, '');
  const { muscleAreas } = await import(`data:text/javascript;base64,${Buffer.from(stripTypeScriptTypes(source)).toString('base64')}`);
  const canonical = drJoeLibrary.flatMap(s => s.exercises).map(e => e.id).sort();
  assert.equal(canonical.length, 27);
  assert.equal(new Set(canonical).size, 27);
  assert.deepEqual([...new Set(muscleAreas.flatMap(a => a.exerciseIds))].sort(), canonical);
  for (const area of muscleAreas) assert.equal(new Set(area.exerciseIds).size, area.exerciseIds.length);
  assert.ok(muscleAreas.filter(a => a.exerciseIds.includes('s04-wall-supported-control')).length > 1);
});
