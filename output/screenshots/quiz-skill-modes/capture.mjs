import { chromium } from "/tmp/pw-runner/node_modules/playwright/index.mjs";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const runRoot = "/Users/lindafoinding/Documents/GitHub/livelabs-ai-playground/output/screenshots/quiz-skill-modes";
const previewRoot = path.join(runRoot, "preview");
const viewport = { width: 1440, height: 1100 };
const timestamp = new Date().toISOString();

const targets = [
  {
    source: path.join(previewRoot, "option-1-upgrade.html"),
    output: path.join(runRoot, "01-option-1-upgrade-desktop.png"),
    label: "Option 1 additional quiz lab",
  },
  {
    source: path.join(previewRoot, "option-2-selectai.html"),
    output: path.join(runRoot, "02-option-2-selectai-desktop.png"),
    label: "Option 2 FastLab append-in-place",
  },
  {
    source: path.join(previewRoot, "option-3-gaming.html"),
    output: path.join(runRoot, "03-option-3-gaming-desktop.png"),
    label: "Option 3 distributed quiz blocks",
  },
];

async function launchBrowser() {
  const launchers = [
    { channel: "chrome" },
    { channel: "msedge" },
    {},
  ];

  let lastError;
  for (const options of launchers) {
    try {
      return await chromium.launch({ headless: true, ...options });
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

const browser = await launchBrowser();
const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });

for (const target of targets) {
  const url = pathToFileURL(target.source).href;
  await page.goto(url, { waitUntil: "load" });
  await page.screenshot({ path: target.output, fullPage: false });
}

await browser.close();

const manifestLines = [
  "# Screenshot Manifest",
  "",
  `- Run name: \`quiz-skill-modes\``,
  `- Timestamp: \`${timestamp}\``,
  `- Viewport: \`${viewport.width}x${viewport.height}\``,
  `- Capture mode: \`viewport\``,
  `- Tool: \`Playwright\``,
  `- Caveats: \`Local preview pages rendered from workshop excerpts for deterministic captures.\``,
  "",
  "## Files",
  "",
];

for (const target of targets) {
  manifestLines.push(`- \`${path.basename(target.output)}\` — ${target.label}; source \`${target.source}\``);
}

fs.writeFileSync(path.join(runRoot, "manifest.md"), `${manifestLines.join("\n")}\n`);
