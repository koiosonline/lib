// https://developers.google.com/web/updates/2017/04/headless-chrome
// https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/chrome.html

const { Builder, By, Key, util } = require("selenium-webdriver");
let chrome = require('selenium-webdriver/chrome');
require('chromedriver');
require("regenerator-runtime");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

beforeAll(async () => {
    jest.setTimeout(20000);
})

describe('dashboard', () => {
    it('should check if button GO exists', async () => {
        let driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options().headless())
            .build();


        try {
            await driver.get("https://www.koios.online/newviewer");
            await sleep(8000);

            let result = await driver.findElement(By.xpath("/html/body/div[2]/div[9]/div[3]/div/div[1]/div[3]/div")).getText();
            expect(result).toBe("GO!");
        } finally {
            driver.close();
        }
    });

    it('should simulate a mouseclick on the GO button', async () => {
        let driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options().headless())
            .build();

        try {
            await driver.get("https://www.koios.online/newviewer");
            await sleep(8000);
            await driver.findElement(By.xpath("/html/body/div[2]/div[9]/div[1]/div[2]/img")).click();

            let result = await driver.findElement(By.xpath("/html/body/div[7]/div[2]/div[5]/div[2]")).getText();
            expect(result).toBe("Settings");
        } finally {
            driver.close();
        }
    });

    it('should simulate a mouseclick on the settings button', async () => {
        let driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options().headless())
            .build();

        try {
            await driver.get("https://www.koios.online/newviewer");
            await sleep(8000);
            await driver.findElement(By.xpath("/html/body/div[2]/div[9]/div[1]/div[2]/img")).click();

            let result = await driver.findElement(By.xpath("/html/body/div[7]/div[2]/div[5]/div[2]")).getText();
            expect(result).toBe("Settings");
        } finally {
            driver.close();
        }
    });

    it('should simulate a mouseclick on the community button', async () => {
        let driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options().headless())
            .build();

        try {
            await driver.get("https://www.koios.online/newviewer");
            await sleep(8000);
            await driver.findElement(By.xpath("/html/body/div[2]/div[10]/div/div[3]/div[1]/div[3]/div")).click();

            let result = await driver.findElement(By.xpath("/html/body/div[12]/div[2]/div[2]/div[1]")).getText();
            expect(result).toBe("Leaderboard");
        } finally {
            driver.close();
        }
    });
});