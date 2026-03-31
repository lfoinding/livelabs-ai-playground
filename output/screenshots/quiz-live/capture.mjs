import fs from "node:fs";
import path from "node:path";
import { chromium } from "/tmp/pw-runner/node_modules/playwright/index.mjs";

const shotRoot = "/Users/lindafoinding/Documents/GitHub/livelabs-ai-playground/output/screenshots/quiz-live";
const viewport = { width: 1440, height: 1100 };

async function waitForWorkshop(page) {
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(8000);
  await page.locator("#module-content article").waitFor({ state: "visible", timeout: 30000 });
}

async function scrollToElement(page, selector, offset = 140) {
  const locator = page.locator(selector).first();
  await locator.waitFor({ state: "attached", timeout: 30000 });
  const handle = await locator.elementHandle();
  if (!handle) throw new Error(`Missing element for ${selector}`);
  const box = await handle.boundingBox();
  if (!box) throw new Error(`No box for ${selector}`);
  await page.evaluate(
    ({ y, offsetPx }) => window.scrollTo({ top: Math.max(0, y - offsetPx), behavior: "instant" }),
    { y: box.y + (await page.evaluate(() => window.scrollY)), offsetPx: offset }
  );
  await page.waitForTimeout(800);
}

async function captureSelectAi(page) {
  await page.goto("http://127.0.0.1:8765/sprints/fastlab/content/selectai/index.html", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await waitForWorkshop(page);
  await page.getByRole("button", { name: "Expand All Tasks" }).click();
  await page.waitForTimeout(1200);
  await scrollToElement(page, ".ll-quiz[data-quiz-id='quiz-0-q0']", 180);
  await page.screenshot({ path: path.join(shotRoot, "01-option-2-selectai-live-desktop.png") });
}

async function captureGaming(page) {
  await page.goto("http://127.0.0.1:8765/developer/dev-ai-app-dev-gaming/workshops/sandbox/index.html?lab=user-story", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await waitForWorkshop(page);
  await page.getByRole("button", { name: "Expand All Tasks" }).click();
  await page.waitForTimeout(1200);
  await scrollToElement(page, ".ll-quiz[data-quiz-id='quiz-0-q0']", 220);
  await page.screenshot({ path: path.join(shotRoot, "02-option-3-gaming-live-desktop.png") });
}

async function captureUpgrade(page) {
  await page.goto("http://127.0.0.1:8765/database/hitchhikers-guide-upgrade-to-26ai/workshops/livelabs/index.html", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await waitForWorkshop(page);
  await page.getByText("Lab 16: Check Your Understanding", { exact: true }).click();
  await page.waitForTimeout(8000);
  await page.getByRole("button", { name: "Expand All Tasks" }).click();
  await page.waitForTimeout(1500);

  const answers = [
    "#quiz-0-q0-opt2",
    "#quiz-1-q0-opt2",
    "#quiz-2-q0-opt2",
    "#quiz-3-q0-opt1",
    "#quiz-4-q0-opt1",
  ];

  for (const selector of answers) {
    await page.locator(selector).check({ force: true });
  }

  const checks = page.locator("button.ll-quiz-check");
  for (let i = 0; i < 5; i += 1) {
    await checks.nth(i).click();
    await page.waitForTimeout(400);
  }

  await page.waitForTimeout(2000);
  await scrollToElement(page, "text=Download Your Badge", 220);
  await page.screenshot({ path: path.join(shotRoot, "03-option-1-upgrade-badge-live-desktop.png") });
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });

try {
  await captureSelectAi(page);
  await captureGaming(page);
  await captureUpgrade(page);
} finally {
  await browser.close();
}

const lines = [
  "# Screenshot Manifest",
  "",
  `- Run name: \`quiz-live\``,
  `- Timestamp: \`${new Date().toISOString()}\``,
  `- Viewport: \`${viewport.width}x${viewport.height}\``,
  `- Capture mode: \`viewport\``,
  `- Tool: \`Playwright against local liveserver on port 8765\``,
  `- Caveats: \`Rendered LiveLabs pages loaded from local workshop paths with shared LiveLabs assets.\``,
  "",
  "## Files",
  "",
  "- `01-option-2-selectai-live-desktop.png` — Select AI FastLab rendered quiz section from the local liveserver.",
  "- `02-option-3-gaming-live-desktop.png` — Gaming workshop rendered in-line quiz block from Lab 1 on the local liveserver.",
  "- `03-option-1-upgrade-badge-live-desktop.png` — Upgrade workshop rendered completed quiz state with badge visible after correct answers.",
];

fs.writeFileSync(path.join(shotRoot, "manifest.md"), `${lines.join("\n")}\n`);
