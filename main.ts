// Rejected Olympic Sports — a make.fun entry.
// Writes one funny single-line rejected Olympic sport (<= 200 characters)
// to /output/entry.txt.
//
// The entry: a genuine Olympic event (the 400m hurdles) plus exactly one
// absurd, concrete rule — athletes must assemble each hurdle mid-race,
// using only the Allen key provided. The joke lands in one read: the twist
// ("only the Allen key provided") arrives on the last clause, and the line
// is written in the voice of a real event a broadcaster would have to
// explain with a straight face. It was picked from 10 compared variants
// (see rejected-olympic-variants.md); the winning line is 107 characters.
//
// The program is deliberately deterministic: the entry is a fixed string,
// the gate below validates it (1-200 characters, not only white space,
// single line, no trailing newline), and the file is written byte-for-byte
// as-is. Nothing about the entry text is computed or randomised.
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

// The gate: 1 to 200 characters, not only white space, a single line,
// and no leading/trailing white space. Any violation fails loudly with a
// clear message naming the exact problem, so a bad entry can never be
// written to /output/entry.txt silently.
function checkGate(text: string): void {
  const chars = [...text].length;
  if (chars < 1) {
    throw new Error("entry rejected: empty entry, gate is 1-200 characters");
  }
  if (chars > 200) {
    throw new Error(
      `entry rejected: entry is ${chars} characters, gate is 1-200 characters`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry rejected: entry is only white space");
  }
  if (text !== text.trim()) {
    throw new Error("entry rejected: entry has leading or trailing white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry rejected: entry must be a single line");
  }
}

// Grader runs with /output; local runs may set MAKEFUN_OUTPUT_DIR.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
checkGate(SPORT);
writeFileSync(join(outDir, "entry.txt"), SPORT, "utf8");
console.log(`wrote ${[...SPORT].length}-character entry to ${join(outDir, "entry.txt")}`);
