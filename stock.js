const puppeteer = require('puppeteer');

async function scrapeStockData(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const stockData = await page.evaluate(() => {
        let title = document.querySelector('h1.svelte-3a2v0c').innerText;
        let price = document.querySelector('.livePrice.svelte-mgkamr').innerText; // Example selector, adjust as needed
        return {
            title,
            price
            
        };
    });

    console.log(stockData);
    await browser.close();
}

scrapeStockData('https://finance.yahoo.com/quote/AAPL/');
