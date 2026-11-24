// SPDX-License-Identifier: MIT
// Make the AI Judge Laugh: the Office Joke Open
// Writes one original single-line office joke to /output/entry.txt.
// Node 22, stdlib only, deterministic, no network, no wall clock.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke: a familiar office setup (printer out of toner) taken somewhere
// unexpected — the warning sign printed by the very printer it warns about.
// The payoff lands in the last four words.
const JOKE =
  "Our printer ran out of toner, so I printed a sign that says 'Out of Toner' — it came out blank.";

function fail(message: string): never {
  throw new Error(message);
}

function validate(joke: string): void {
  if (joke.length === 0) fail("joke is empty");
  if (joke.length > 200) fail(`joke is ${joke.length} characters, over the 200 limit`);
  if (joke.trim().length === 0) fail("joke is only whitespace");
  if (joke.includes("\n") || joke.includes("\r")) fail("joke must be a single line");
}

function main(): void {
  validate(JOKE);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, JOKE, "utf8");

  // Read back and verify byte-for-byte what was written.
  const roundTrip = readFileSync(outPath, "utf8");
  if (roundTrip !== JOKE) fail("read-back mismatch: entry.txt differs from the joke");
  validate(roundTrip);

  console.log(`Wrote ${JOKE.length}-character entry to ${outPath}`);
}

main();
