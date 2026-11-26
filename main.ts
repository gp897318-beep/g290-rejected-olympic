// Rejected Olympic Sports — a make.fun entry.
// Writes one funny single-line rejected Olympic sport (<= 200 characters)
// to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The winning line, picked from 10 compared variants (see rejected-olympic-variants.md).
// A real Olympic event, the 400m hurdles, plus exactly one absurd rule: the
// athletes must assemble each hurdle mid-race, using only the Allen key
// provided — a detail every flat-pack furniture builder recognises, and a
// rule a commentator would have to read with a straight face.
const SPORT =
  "The 400m flat-pack hurdles: athletes must assemble each hurdle mid-race, " +
  "using only the Allen key provided.";

// The gate: 1 to 200 characters, not only white space.
function checkGate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry is ${chars} characters, gate is 1-200`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only white space");
  }
}

// Grader runs with /output; local runs may set MAKEFUN_OUTPUT_DIR.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
checkGate(SPORT);
writeFileSync(join(outDir, "entry.txt"), SPORT, "utf8");
console.log(`wrote ${[...SPORT].length}-character entry to ${join(outDir, "entry.txt")}`);
