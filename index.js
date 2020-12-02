// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra');

const {promises: {readFile, writeFile}} =require('fs')
const {join} = require('path')

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

// https://stackoverflow.com/a/5072145/13174603
function filterObject(obj, predicate) {
  let result = {}, key;

  for (key in obj) {
      if (obj.hasOwnProperty(key) && predicate(key)) {
          result[key] = obj[key];
      }
  }


  return result;
};


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function capture(name, str) {
  console.log('Captured ' + name)
  const arr = name.split('/')
  arr[arr.length - 1] = arr[arr.length - 1] + '.html'
  await writeFile(join(__dirname, 'discord', ...arr), str)
}

(async () => {
  const browser = await puppeteer.launch({ devtools: true, userDataDir: 
'./data' });
  await sleep(100)
  const page = await browser.newPage();
  const preloadFile = await readFile('./preload.js', 'utf8');
  await page.exposeFunction('capture', (name, str) => capture(name, str))
  await page.exposeFunction('shutdown', () => browser.close())
  await page.evaluateOnNewDocument(`((token, rawEnv)=>{${preloadFile}})("${process.env.DISCORD_TOKEN}", "${Buffer.from(JSON.stringify(filterObject(process.env, (x) => x.startsWith('DISCORD_'))), 'binary').toString('base64')}")`);
  await page.goto('https://canary.discord.com/app', {timeout: 60000});
  // await browser.close();
})();
