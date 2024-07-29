const puppeteer = require('puppeteer');

async function scrapeBooks(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Wait for the necessary DOM to be rendered
    await page.waitForSelector('.product_pod');

    // Extract the data from the page
    const books = await page.evaluate(() => {
        const bookList = [];
        const bookNodes = document.querySelectorAll('.product_pod');

        bookNodes.forEach(node => {
            const title = node.querySelector('h3 a').getAttribute('title');
            const price = node.querySelector('.price_color').textContent;
            bookList.push({ title, price });
        });

        return bookList;
    });

    console.log(books);
    await browser.close();
}

scrapeBooks('http://books.toscrape.com/');
