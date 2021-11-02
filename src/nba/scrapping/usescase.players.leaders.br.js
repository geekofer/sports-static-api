const puppeteer = require('puppeteer');
const { storage } = require('../../utils/data.storage');

const standingsHeader = {
  meta: {
    version: 1,
    seasonYear: "2021-22",
    time: new Date().toISOString(),
  },
};

async function scrappUseCasePlayers() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  async function getPageData() {
    await page.goto(
      'https://www.basketball-reference.com/leagues/NBA_2022.html',
      {
        waitUntil: 'domcontentloaded',
      },
    );
    const data = await page.evaluate(() => {
      const standings = [];
      const $tableLeaders = document.querySelectorAll('#div_leaders > div');
      $tableLeaders.forEach($stat => {
        $stat.querySelectorAll('table').forEach(($table) => {
          $table.querySelectorAll('tr').forEach(($tr, index) => {
            standings.push({
              statType: $table.querySelector('.poptip').textContent.trim().toLocaleLowerCase().replace(/\s/g, '_'),
              statName: $table.querySelector('.poptip').textContent.trim(),
              rank: $tr.querySelector('td.rank').textContent.trim(),
              player: $tr.querySelector('td.who').textContent.trim().split('•')[0].trim(),
              teamTricode: $tr.querySelector('td.who').textContent.trim().split('•')[1].replace(/\s/g, ''),
              value: $tr.querySelector('td.value').textContent.trim()
            })
          })
        })
      })
      return {
        standings
      };
    });
    storage('nba', 'players-leaders.json', { ...standingsHeader, ...data })
  }
  await getPageData();
  await browser.close();
}

module.exports = scrappUseCasePlayers;