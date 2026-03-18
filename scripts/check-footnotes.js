import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = resolve(__dirname, "..", "dist", "index.html");

let html;
try {
  html = readFileSync(distPath, "utf-8");
} catch {
  console.error(`ERROR: Could not read ${distPath}`);
  console.error("Run 'pnpm build' first.");
  process.exit(1);
}

let errors = 0;

function error(msg) {
  console.error(`  FAIL: ${msg}`);
  errors++;
}

// 1. Collect footnote references: <sup><a href="#fn-N" id="fnref-N"> or id="fnref-Nb"
//    Pattern: id="fnref-..." href="#fn-..."
const fnrefPattern = /id="(fnref-(\d+[a-z]?))"\s*[^>]*href="#(fn-\d+)"|href="#(fn-\d+)"\s*[^>]*id="(fnref-(\d+[a-z]?))"/g;
const fnrefs = new Map(); // id -> href target (e.g. "fnref-1" -> "fn-1")
const allFnrefIds = [];
let m;

// More robust: find all elements with id starting with fnref-
const fnrefElementPattern = /id="(fnref-(\d+[a-z]?))"/g;
while ((m = fnrefElementPattern.exec(html)) !== null) {
  const id = m[1];       // e.g. "fnref-1" or "fnref-1b"
  const num = m[2];       // e.g. "1" or "1b"
  allFnrefIds.push(id);

  // Extract the base number (strip trailing letter for variants)
  const baseNum = parseInt(num, 10);
  const isVariant = /\d+[a-z]$/.test(num);

  if (!isVariant) {
    // Primary reference
    if (fnrefs.has(id)) {
      error(`Duplicate footnote reference ID: ${id}`);
    }
    fnrefs.set(id, { num: baseNum, target: `fn-${baseNum}` });
  }
}

// 2. Collect footnote definitions: <li id="fn-N">
const fnDefPattern = /id="(fn-(\d+))"/g;
const fnDefs = new Map(); // id -> number
while ((m = fnDefPattern.exec(html)) !== null) {
  const id = m[1];   // e.g. "fn-1"
  const num = parseInt(m[2], 10);
  if (fnDefs.has(id)) {
    error(`Duplicate footnote definition ID: ${id}`);
  }
  fnDefs.set(id, num);
}

// 3. Collect back-links: <a class="fn-back" href="#fnref-N"> or class containing fn-back
const backLinkPattern = /class="[^"]*fn-back[^"]*"\s*[^>]*href="#(fnref-\d+[a-z]?)"|href="#(fnref-\d+[a-z]?)"\s*[^>]*class="[^"]*fn-back[^"]*"/g;
const backLinks = new Set();
while ((m = backLinkPattern.exec(html)) !== null) {
  backLinks.add(m[1] || m[2]);
}

console.log("Footnote Integrity Check");
console.log("========================");
console.log(`  Found ${fnrefs.size} primary footnote references (fnref-N)`);
console.log(`  Found ${allFnrefIds.length} total reference IDs (including variants)`);
console.log(`  Found ${fnDefs.size} footnote definitions (fn-N)`);
console.log(`  Found ${backLinks.size} back-links (a.fn-back)\n`);

// Check: every fnref-N has a matching fn-N
console.log("Checking references -> definitions...");
for (const [id, { target }] of fnrefs) {
  if (!fnDefs.has(target)) {
    error(`Reference ${id} points to #${target}, but no definition found`);
  }
}

// Check: every fn-N has at least one fnref-N
console.log("Checking definitions -> references...");
for (const [id, num] of fnDefs) {
  const expectedRef = `fnref-${num}`;
  if (!allFnrefIds.includes(expectedRef)) {
    error(`Definition ${id} has no matching reference (expected ${expectedRef})`);
  }
}

// Check: sequential numbering with no gaps
console.log("Checking sequential numbering...");
const refNums = [...fnrefs.values()].map((v) => v.num).sort((a, b) => a - b);
if (refNums.length > 0) {
  for (let i = 0; i < refNums.length; i++) {
    const expected = i + 1;
    if (refNums[i] !== expected) {
      error(
        `Expected footnote ${expected} in sequence, but found ${refNums[i]} (gap or out of order)`
      );
      break;
    }
  }
}

const defNums = [...fnDefs.values()].sort((a, b) => a - b);
if (defNums.length > 0) {
  for (let i = 0; i < defNums.length; i++) {
    const expected = i + 1;
    if (defNums[i] !== expected) {
      error(
        `Definition numbering: expected fn-${expected}, but found fn-${defNums[i]} (gap or out of order)`
      );
      break;
    }
  }
}

// Check: no duplicate fnref-N IDs (variants like fnref-1b are OK)
console.log("Checking for duplicate IDs...");
const seen = new Set();
for (const id of allFnrefIds) {
  if (seen.has(id)) {
    error(`Duplicate ID found: ${id}`);
  }
  seen.add(id);
}

// Check: every fn-N has a back-link pointing to at least one fnref
console.log("Checking back-links...");
for (const [id, num] of fnDefs) {
  const primaryRef = `fnref-${num}`;
  // Check if any back-link points to fnref-N or fnref-Nb etc.
  const hasBackLink = [...backLinks].some((bl) => {
    const blBase = parseInt(bl.replace("fnref-", ""), 10);
    return blBase === num;
  });
  if (!hasBackLink) {
    error(`Definition ${id} has no back-link (expected a.fn-back[href="#${primaryRef}"])`);
  }
}

// Summary
console.log("");
if (errors === 0) {
  console.log(
    `OK: All ${fnrefs.size} footnotes are valid (${allFnrefIds.length} refs, ${fnDefs.size} defs, ${backLinks.size} back-links).`
  );
  process.exit(0);
} else {
  console.error(`FAILED: ${errors} error(s) found.`);
  process.exit(1);
}
