const { Builder, By, Key, util } = require("selenium-webdriver");
require('chromedriver');
require("regenerator-runtime");

beforeAll(async () => {
    jest.setTimeout(20000);
})

describe('example', async () => {
    test('test example', async () => {
        
        const driver = await new Builder().forBrowser("chrome").build();    
        try {
            await driver.get("https://www.duckduckgo.com");
            await driver.findElement(By.name("q")).sendKeys("test", Key.RETURN);
            let result = await (await driver.findElement(By.xpath("/html/body/div[2]/div[5]/div[3]/div/div[1]/div[5]/div[1]/div/div[1]/div/a/span[1]"))).getText();
            
            expect(result).toBe("https://www.speedtest.net");
        } finally { 
            driver.close(); 
        }
    });
});
