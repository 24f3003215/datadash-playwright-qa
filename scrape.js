const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let totalSum = 0;

  const seeds = [84,85,86,87,88,89,90,91,92,93];

  for (const seed of seeds) {
    const url = `https://example.com/seed-${seed}`;  // Replace with real URL
    console.log(`Visiting: ${url}`);
    
    await page.goto(url, { waitUntil: 'networkidle' });

    const numbers = await page.$$eval('table td', cells =>
      cells.map(td => parseFloat(td.innerText))
           .filter(n => !isNaN(n))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed} sum: ${pageSum}`);

    totalSum += pageSum;
  }

  console.log("=================================");
  console.log(`FINAL TOTAL SUM: ${totalSum}`);
  console.log("=================================");

  await browser.close();
})();