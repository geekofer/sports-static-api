const puppeteer = require('puppeteer');
const { storage } = require('../../utils/data.storage');

const standingsHeader = {
  meta: {
    version: 1,
    seasonYear: "2021-22",
    time: new Date().toISOString(),
  },
};

async function scrappUseCaseBR() {
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
      const statics = [];
      const $tableStats = document.querySelectorAll('.standings_confs > div');
      $tableStats.forEach($table => {
        $table.querySelectorAll('.stats_table > tbody > tr').forEach($tbody => {
          statics.push({
            team: $tbody
              .querySelector('[data-stat="team_name"]')
              .textContent.trim(),
            wins: $tbody.querySelector('[data-stat="wins"]').textContent.trim(),
            losses: $tbody
              .querySelector('[data-stat="losses"]')
              .textContent.trim(),
            win_loss_pct: $tbody
              .querySelector('[data-stat="win_loss_pct"]')
              .textContent.trim(),
            gb: $tbody.querySelector('[data-stat="gb"]').textContent.trim(),
            pts_per_g: $tbody
              .querySelector('[data-stat="pts_per_g"]')
              .textContent.trim(),
            opp_pts_per_g: $tbody
              .querySelector('[data-stat="opp_pts_per_g"]')
              .textContent.trim(),
            srs: $tbody.querySelector('[data-stat="srs"]').textContent.trim(),
          });
        });
      });
      return {standings: statics};
    });
    storage('nba', 'season-standings.json', {...standingsHeader, ...data})
  }
  await getPageData();
  await browser.close();
}

module.exports = scrappUseCaseBR;