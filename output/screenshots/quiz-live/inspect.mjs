import { chromium } from "/tmp/pw-runner/node_modules/playwright/index.mjs";

const viewport = { width: 1440, height: 1100 };
const urls = [
  "http://127.0.0.1:8765/sprints/fastlab/content/selectai/index.html",
  "http://127.0.0.1:8765/developer/dev-ai-app-dev-gaming/workshops/sandbox/index.html",
  "http://127.0.0.1:8765/database/hitchhikers-guide-upgrade-to-26ai/workshops/livelabs/index.html",
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport });

for (const url of urls) {
  console.log(`URL: ${url}`);
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(8000);

  const info = await page.evaluate(() => {
    const tocLinks = [...document.querySelectorAll("#toc a")].slice(0, 25).map((a) => a.textContent.trim()).filter(Boolean);
    const headings = [...document.querySelectorAll("h1,h2,h3")].slice(0, 30).map((el) => el.textContent.trim()).filter(Boolean);
    const buttons = [...document.querySelectorAll("button")].map((el) => el.textContent.trim()).filter(Boolean).slice(0, 40);
    const quizText = document.body.innerText.includes("Check Your Understanding");
    const scoreText = document.body.innerText.includes("Scored Quiz");
    const checkAnswerText = document.body.innerText.includes("Check Answer");
    return {
      title: document.title,
      tocLinks,
      headings,
      buttons,
      quizText,
      scoreText,
      checkAnswerText,
      bodySample: document.body.innerText.slice(0, 2000),
    };
  });

  console.log(JSON.stringify(info, null, 2));
  console.log("-----");
}

await browser.close();
