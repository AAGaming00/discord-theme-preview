// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra');

const {promises: {readFile, writeFile}} =require('fs')
const {join} = require('path')
const chalk = require('chalk')
const fetcher = require("discord-build-fetcher-js");
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
  console.log(chalk.green('Captured ' + name))
  const arr = name.split('/')
  arr[arr.length - 1] = arr[arr.length - 1] + '.html'
  await writeFile(join(__dirname, '..', 'web', 'discord', ...arr), str)
}

(async () => {
  const oldBuild = await readFile('.build', 'utf8')
  const build = await fetcher('canary')
  console.log(build)
  if (build.buildHash === oldBuild){
    console.log(chalk.yellow('Build hasn\'t changed, cancelling'))
    return
  }
  
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXEC_PATH, // set by docker container
    headless: false,
    args: process.env.CI ? [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ] : []
  });
  await sleep(100)
  const page = await browser.newPage();
  const preloadFile = await readFile('./preload.js', 'utf8');
  await page.exposeFunction('capture', (name, str) => capture(name, str))
  await page.exposeFunction('shutdown', async (code = 0) => {
    if (code === 0) {
      await writeFile('.build', build.buildHash)
    }
    await browser.close();
    await process.exit(code)
  })
  await page.exposeFunction('log', (...e) => console.log(chalk.green(e.join(' '))))
  await page.exposeFunction('consoleLog', (...e) => console.log(chalk.blue('[DISCORD LOG] ' + e.join(' '))))
  await page.exposeFunction('consoleWarn', (...e) => console.warn(chalk.yellow('[DISCORD WARN] ' + e.join(' '))))
  await page.exposeFunction('consoleError', (...e) => console.error(chalk.red('[DISCORD ERROR] ' + e.join(' '))))
  await page.exposeFunction('getDiscordPreviewEnv', () => filterObject(process.env, (x) => x.startsWith('DISCORD_')))
  await page.evaluateOnNewDocument(`((token)=>{${preloadFile}})("${process.env.DISCORD_TOKEN}")`);
  await page.goto('https://canary.discord.com/app', {timeout: 60000});
  // await browser.close();
})();
