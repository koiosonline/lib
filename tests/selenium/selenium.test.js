const { Builder, By, Key, util } = require("selenium-webdriver");
require('chromedriver');
require("regenerator-runtime");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

beforeAll(async () => {
    jest.setTimeout(20000);
})

describe('example', () => {
    test('test example', async () => {
        
        const driver = await new Builder().forBrowser("chrome").build();    
        try {
            await driver.get("https://www.koios.online/newviewer");
            await sleep(3000);
            let result = await driver.findElement(By.xpath("/html/body/div[2]/div[6]/div[1]/div[3]/div")).getText();
            
            expect(result).toBe("Login");
        } finally { 
            driver.close(); 
        }
    });
});
