const { Builder, By, until, Options } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome')

describe('SauceDemo Automation', function () {
  let driver;

beforeEach(async function(){
  console.log("ini di dalam before () hook")
})


it('Sukses Login', async function(){
  options = new chrome.Options;
  options.addArguments ("--headless");

    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  await driver.get('https://www.saucedemo.com');

  let inputUsername = await driver.findElement(By.css('[data-test="username"]'))
  let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'))
  let buttonLogin = await driver.findElement(By.className('submit-button btn_action'))
  await inputUsername.sendKeys('standard_user')
  await inputPassword.sendKeys('secret_sauce')
  await buttonLogin.click()

  const pageTitle = await driver.findElement(By.className('title')).getText();
  assert.strictEqual(pageTitle, 'Products');

  await driver.wait(until.elementLocated(By.className('title')),);
  const titleText = await driver.findElement(By.className('title')).getText();
  assert.strictEqual(titleText, 'Products');

})

it('Urutkan Produk dari Z ke A', async function () {
    await driver.wait(until.elementLocated(By.className('product_sort_container')));
    
     await driver.wait(until.elementLocated(By.className('product_sort_container')));
    const sortDropdown = await driver.findElement(By.className('product_sort_container'));
    await sortDropdown.sendKeys('Name (Z to A)');

     const productElements = await driver.findElements(By.className('inventory_item_name'));
    const productNames = [];

    for (let element of productElements) {
      const name = await element.getText();
      productNames.push(name);
    }

    const sortedNames = [...productNames].sort().reverse();
    assert.deepStrictEqual(productNames, sortedNames);
  


 await driver.quit();

})
  });
