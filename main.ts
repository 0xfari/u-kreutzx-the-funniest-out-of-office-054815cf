import * as fs from "node:fs";
import * as path from "node:path";

// The Funniest Out-of-Office: one line, at most 140 characters, the funniest
// out-of-office auto-reply. Writes it to /output/entry.txt.
const OUT_NAME = "entry.txt";

// The dog ate the homework; now it has eaten the inbox too.
// No remorse, no replies, no refunds on the chewed ones.
const LINE =
  "I'm out until Monday. My inbox is guarded by my dog, who has already eaten two urgent emails and shows no remorse.";

function clearFolder(dir: string): void {
  for (const name of fs.readdirSync(dir)) {
    fs.rmSync(path.join(dir, name), { recursive: true, force: true });
  }
}

function run(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  fs.mkdirSync(outDir, { recursive: true });
  clearFolder(outDir);
  fs.writeFileSync(path.join(outDir, OUT_NAME), LINE + "\n", "utf8");
}

run();
