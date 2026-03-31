import { chromium } from "/tmp/pw-runner/node_modules/playwright/index.mjs";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

await page.goto("http://127.0.0.1:8765/database/hitchhikers-guide-upgrade-to-26ai/workshops/livelabs/index.html", {
  waitUntil: "domcontentloaded",
  timeout: 60000,
});
await page.waitForTimeout(8000);
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

const info = await page.evaluate(() => ({
  buttons: [...document.querySelectorAll("button")].map((el) => el.textContent.trim()).filter(Boolean),
  links: [...document.querySelectorAll("a")].map((el) => el.textContent.trim()).filter(Boolean).slice(0, 50),
  body: document.body.innerText.slice(0, 5000),
  badgeImgs: [...document.querySelectorAll("img")].map((img) => ({
    src: img.getAttribute("src"),
    alt: img.getAttribute("alt"),
    width: img.width,
    height: img.height,
  })).filter((img) => img.src && img.src.includes("badge")),
}));

console.log(JSON.stringify(info, null, 2));
await browser.close();
