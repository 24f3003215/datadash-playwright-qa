const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let totalSum = 0;
  const seeds = [84,85,86,87,88,89,90,91,92,93];

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url, { waitUntil: 'networkidle' });

    await page.waitForSelector('table');

    const numbers = await page.$$eval('table td', cells =>
      cells
        .map(td => parseFloat(td.innerText.replace(/,/g, '').trim()))
        .filter(n => !isNaN(n))
    );

    totalSum += numbers.reduce((a, b) => a + b, 0);
  }

  // 👇 THIS IS CRITICAL
  console.log(`TOTAL_SUM=${totalSum}`);

  await browser.close();
})();