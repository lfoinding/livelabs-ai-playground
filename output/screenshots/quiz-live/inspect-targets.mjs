import { chromium } from "/tmp/pw-runner/node_modules/playwright/index.mjs";

const viewport = { width: 1440, height: 1100 };
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport });

async function inspect(name, url, clickText) {
  console.log(`=== ${name} ===`);
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(8000);
  if (clickText) {
    await page.getByText(clickText, { exact: true }).click();
    await page.waitForTimeout(8000);
  }

  const info = await page.evaluate(() => {
    const quizContainers = [...document.querySelectorAll("button")].filter((btn) => btn.textContent.includes("Check Answer")).map((btn) => {
      let node = btn.parentElement;
      for (let i = 0; i < 5 && node; i += 1) node = node.parentElement;
      return node || btn.parentElement;
    });
    const firstQuiz = quizContainers[0];
    const labels = [...document.querySelectorAll("label")].slice(0, 20).map((el) => el.textContent.trim()).filter(Boolean);
    const radios = [...document.querySelectorAll("input[type='radio'], input[type='checkbox']")].map((el) => ({
      type: el.type,
      name: el.name,
      value: el.value,
      checked: el.checked,
    }));
    return {
      title: document.title,
      headings: [...document.querySelectorAll("h1,h2,h3")].slice(0, 25).map((el) => el.textContent.trim()).filter(Boolean),
      buttons: [...document.querySelectorAll("button")].map((el) => el.textContent.trim()).filter(Boolean).slice(0, 50),
      labels,
      radios,
      quizHtml: firstQuiz ? firstQuiz.outerHTML.slice(0, 6000) : null,
      bodySample: document.body.innerText.slice(0, 3500),
    };
  });

  console.log(JSON.stringify(info, null, 2));
}

await inspect(
  "SelectAI",
  "http://127.0.0.1:8765/sprints/fastlab/content/selectai/index.html",
  null
);

await inspect(
  "Gaming Lab 1",
  "http://127.0.0.1:8765/developer/dev-ai-app-dev-gaming/workshops/sandbox/index.html",
  "Lab 1: Run the Demo"
);

await inspect(
  "Upgrade Lab 16",
  "http://127.0.0.1:8765/database/hitchhikers-guide-upgrade-to-26ai/workshops/livelabs/index.html",
  "Lab 16: Check Your Understanding"
);

await browser.close();
