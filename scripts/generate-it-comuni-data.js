// One-off generation script. Run with: node scripts/generate-it-comuni-data.js
// Requires /tmp/comuni.json — the raw dataset from
// https://raw.githubusercontent.com/matteocontrini/comuni-json/master/comuni.json
// Regenerates lib/it-comuni-data.ts.
const fs = require("fs")
const comuni = JSON.parse(fs.readFileSync("/tmp/comuni.json", "utf8"))

function normalize(input) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z]/g, "")
}

const nameToSigla = new Map()
const capToSigla = new Map()

for (const c of comuni) {
  const key = normalize(c.nome)
  const existing = nameToSigla.get(key)
  if (!existing || c.popolazione > existing.pop) {
    nameToSigla.set(key, { sigla: c.sigla, pop: c.popolazione })
  }
  for (const cap of c.cap || []) {
    if (!capToSigla.has(cap)) capToSigla.set(cap, c.sigla)
  }
}

const nameObj = {}
for (const [k, v] of nameToSigla) nameObj[k] = v.sigla
const capObj = {}
for (const [k, v] of capToSigla) capObj[k] = v

const header =
  "// AUTO-GENERATED — do not hand-edit.\n" +
  "// Source: ISTAT comuni dataset (matteocontrini/comuni-json), " + comuni.length + " comuni.\n" +
  "// Maps every Italian comune name (normalized) and every postal code (CAP)\n" +
  "// to its 2-letter province code (sigla). Used to resolve ANY Italian\n" +
  "// address input to a province, so every roof analysis gets a map point —\n" +
  "// even for small comuni not individually listed in it-provinces.ts.\n" +
  "// Regenerate by re-running scripts/generate-it-comuni-data.js if the source dataset updates.\n\n" +
  "export const COMUNE_TO_PROVINCE: Record<string, string> = "

const capHeader = "\n\nexport const CAP_TO_PROVINCE: Record<string, string> = "

const out = header + JSON.stringify(nameObj) + capHeader + JSON.stringify(capObj) + "\n"
fs.writeFileSync(__dirname + "/../lib/it-comuni-data.ts", out)
console.log("written, bytes:", fs.statSync(__dirname + "/../lib/it-comuni-data.ts").size)
console.log("names:", Object.keys(nameObj).length, "caps:", Object.keys(capObj).length)
