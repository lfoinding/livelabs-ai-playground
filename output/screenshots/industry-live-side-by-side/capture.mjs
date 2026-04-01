import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { chromium } from "/tmp/pw-runner/node_modules/playwright/index.mjs";

const root = "/Users/lindafoinding/Documents/GitHub";
const runRoot = "/Users/lindafoinding/Documents/GitHub/livelabs-ai-playground/output/screenshots/industry-live-side-by-side";
const viewport = { width: 1536, height: 768 };
const port = 8767;

fs.mkdirSync(runRoot, { recursive: true });

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
};

function createStaticServer(baseDir) {
  return http.createServer((req, res) => {
    const requestPath = decodeURIComponent((req.url || "/").split("?")[0]);
    const safePath = path.normalize(requestPath).replace(/^(\.\.[/\\])+/, "");
    let targetPath = path.join(baseDir, safePath);

    if (fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory()) {
      targetPath = path.join(targetPath, "index.html");
    }

    if (!targetPath.startsWith(baseDir) || !fs.existsSync(targetPath)) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }

    const ext = path.extname(targetPath).toLowerCase();
    res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
    fs.createReadStream(targetPath).pipe(res);
  });
}

function wrapperHtml(financeUrl, originalUrl) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Industry Converter Side By Side</title>
  <style>
    :root { color-scheme: dark; }
    body {
      margin: 0;
      background: #1f1e1c;
      font-family: Arial, sans-serif;
      overflow: hidden;
    }
    .compare {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      padding: 10px;
      box-sizing: border-box;
      width: 100vw;
      height: 100vh;
      position: relative;
    }
    iframe {
      width: 100%;
      height: 100%;
      border: 2px solid #2a2927;
      background: #ffffff;
    }
    .overlay-box {
      position: absolute;
      border: 4px solid #d73b2f;
      border-radius: 8px;
      box-sizing: border-box;
      pointer-events: none;
      box-shadow: 0 0 0 2px rgba(255,255,255,0.12);
    }
    .overlay-label {
      position: absolute;
      background: #d73b2f;
      color: white;
      font-size: 14px;
      font-weight: 700;
      line-height: 1;
      padding: 7px 10px;
      border-radius: 999px;
      pointer-events: none;
      box-shadow: 0 6px 18px rgba(0,0,0,0.32);
    }
  </style>
</head>
<body>
  <div class="compare">
    <iframe name="finance" src="${financeUrl}"></iframe>
    <iframe name="original" src="${originalUrl}"></iframe>
  </div>
</body>
</html>`;
}

async function waitForWorkshop(frame) {
  await frame.waitForSelector("#module-content article", { timeout: 90000 });
  await frame.waitForTimeout(9000);
}

async function clearOverlays(page) {
  await page.evaluate(() => {
    document.querySelectorAll(".overlay-box,.overlay-label").forEach((node) => node.remove());
  });
}

async function addOverlay(page, box, label, labelX = box.x + 8, labelY = box.y - 14) {
  await page.evaluate(
    ({ x, y, width, height, labelText, labelLeft, labelTop }) => {
      const boxNode = document.createElement("div");
      boxNode.className = "overlay-box";
      Object.assign(boxNode.style, {
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
      });
      document.body.appendChild(boxNode);

      if (labelText) {
        const labelNode = document.createElement("div");
        labelNode.className = "overlay-label";
        labelNode.textContent = labelText;
        Object.assign(labelNode.style, {
          left: `${Math.max(8, labelLeft)}px`,
          top: `${Math.max(8, labelTop)}px`,
        });
        document.body.appendChild(labelNode);
      }
    },
    { ...box, labelText: label, labelLeft: labelX, labelTop: labelY }
  );
}

async function loadComparison(page) {
  const financeUrl = `http://127.0.0.1:${port}/database/db-26ai-fundamentals/industries/finance/workshops/sandbox/index.html`;
  const originalUrl = `http://127.0.0.1:${port}/database/db-26ai-fundamentals/workshops/aiworld25-sandbox/index.html`;

  await page.setContent(wrapperHtml(financeUrl, originalUrl), { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1500);

  const financeFrame = page.frame({ name: "finance" });
  const originalFrame = page.frame({ name: "original" });

  if (!financeFrame || !originalFrame) {
    throw new Error("Failed to attach comparison iframes.");
  }

  await Promise.all([waitForWorkshop(financeFrame), waitForWorkshop(originalFrame)]);
  return { financeFrame, originalFrame };
}

async function captureIntro(page, financeFrame, originalFrame) {
  await clearOverlays(page);

  const financeTitle = await financeFrame.locator("#module-content article h1").boundingBox();
  const originalTitle = await originalFrame.locator("#module-content article h1").boundingBox();
  if (!financeTitle || !originalTitle) throw new Error("Missing intro titles.");

  await addOverlay(page, financeTitle, "Finance rewrite");
  await addOverlay(page, originalTitle, "AI World source");

  await page.screenshot({
    path: path.join(runRoot, "01-finance-vs-aiworld-intro-live-desktop.png"),
    fullPage: false,
  });
}

async function openLab(frame, title) {
  await frame.getByText(title, { exact: true }).click();
  await frame.waitForTimeout(2500);
}

async function expandTasks(frame) {
  const button = frame.getByRole("button", { name: "Expand All Tasks" });
  if (await button.count()) {
    await button.click();
    await frame.waitForTimeout(1200);
  }
}

async function scrollToTask(frame, text) {
  await frame.locator("h2", { hasText: text }).first().scrollIntoViewIfNeeded();
  await frame.waitForTimeout(1200);
}

async function captureLab1(page, financeFrame, originalFrame) {
  await clearOverlays(page);
  await openLab(financeFrame, "Lab 1: Domains and Annotations");
  await openLab(originalFrame, "Lab 1: Data Use Case Domains and Schema Annotations");
  await Promise.all([
    financeFrame.waitForSelector("text=Task 1: Creating Domains", { timeout: 60000 }),
    originalFrame.waitForSelector("text=Task 1: Creating Domains", { timeout: 60000 }),
  ]);
  await Promise.all([expandTasks(financeFrame), expandTasks(originalFrame)]);
  await Promise.all([
    scrollToTask(financeFrame, "Task 1: Creating Domains"),
    scrollToTask(originalFrame, "Task 1: Creating Domains"),
  ]);
  await Promise.all([
    financeFrame.locator("pre").first().scrollIntoViewIfNeeded(),
    originalFrame.locator("pre").first().scrollIntoViewIfNeeded(),
  ]);
  await page.waitForTimeout(1200);

  const financeCode = await financeFrame.locator("pre").first().boundingBox();
  const originalCode = await originalFrame.locator("pre").first().boundingBox();
  if (!financeCode || !originalCode) throw new Error("Missing Lab 1 SQL blocks.");

  await addOverlay(page, financeCode, "Finance domains and entities");
  await addOverlay(page, originalCode, "Healthcare source entities");

  await page.screenshot({
    path: path.join(runRoot, "02-finance-vs-aiworld-lab1-live-desktop.png"),
    fullPage: false,
  });
}

async function captureLab2(page, financeFrame, originalFrame) {
  await clearOverlays(page);
  await openLab(financeFrame, "Lab 2: JSON and SQL");
  await openLab(originalFrame, "Lab 2: JSON and SQL");
  await Promise.all([
    financeFrame.waitForSelector("text=Task 1: Using the JSON Data Type", { timeout: 60000 }),
    originalFrame.waitForSelector("text=Task 1: Using the JSON Data Type", { timeout: 60000 }),
  ]);
  await Promise.all([expandTasks(financeFrame), expandTasks(originalFrame)]);
  await Promise.all([
    financeFrame.locator("h2", { hasText: "Task 1: Using the JSON Data Type" }).first().scrollIntoViewIfNeeded(),
    originalFrame.locator("h2", { hasText: "Task 1: Using the JSON Data Type" }).first().scrollIntoViewIfNeeded(),
  ]);
  await page.waitForTimeout(1200);

  const financeCode = await financeFrame.locator("pre").first().boundingBox();
  const originalCode = await originalFrame.locator("pre").first().boundingBox();
  if (!financeCode || !originalCode) throw new Error("Missing Lab 2 SQL blocks.");

  await addOverlay(page, financeCode, "Clients and reviews");
  await addOverlay(page, originalCode, "Patients and appointments");

  await page.screenshot({
    path: path.join(runRoot, "03-finance-vs-aiworld-lab2-live-desktop.png"),
    fullPage: false,
  });
}

const server = createStaticServer(root);
await new Promise((resolve, reject) => {
  server.once("error", reject);
  server.listen(port, "127.0.0.1", resolve);
});

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });

try {
  const { financeFrame, originalFrame } = await loadComparison(page);
  await captureIntro(page, financeFrame, originalFrame);
  await captureLab1(page, financeFrame, originalFrame);
  await captureLab2(page, financeFrame, originalFrame);
} finally {
  await browser.close();
  await new Promise((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
}

const lines = [
  "# Screenshot Manifest",
  "",
  `- Run name: \`industry-live-side-by-side\``,
  `- Timestamp: \`${new Date().toISOString()}\``,
  `- Viewport: \`${viewport.width}x${viewport.height}\``,
  `- Capture mode: \`viewport side-by-side comparison with overlay boxes\``,
  `- Tool: \`Playwright with an in-process local static server on port ${port}\``,
  `- Caveats: \`Finance version is rendered on the left. Original AI World 25 sandbox version is rendered on the right.\``,
  "",
  "## Files",
  "",
  "- `01-finance-vs-aiworld-intro-live-desktop.png` — Introduction comparison with overlay labels for the source and finance rewrite.",
  "- `02-finance-vs-aiworld-lab1-live-desktop.png` — Lab 1 side-by-side capture with red boxes around the converted SQL blocks.",
  "- `03-finance-vs-aiworld-lab2-live-desktop.png` — Lab 2 side-by-side capture with red boxes around the converted SQL blocks.",
];

fs.writeFileSync(path.join(runRoot, "manifest.md"), `${lines.join("\n")}\n`);
