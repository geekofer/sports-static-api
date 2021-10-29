const axios = require("axios");
const environment = require("../evironment");

const { storage } = require("../utils/data.storage");
const mapperScoreboard = require("./mapper.scoreboard");
const getSeasonStandings = require('./scrapping/usescase.statings.br');
const getPlayersStandings = require('./scrapping/usescase.players.leaders.br');

const getScoreboard = async () => {
  try {
    let scoreBoard = null;

    if (!scoreBoard || scoreBoard === null) {
      const results = await axios({
        method: "get",
        url: environment.nba.scoreboardUrl,
      });
      if (results && results.data) {
        scoreBoard = mapperScoreboard(results.data);
        await storage("nba", "scoreboard.json", scoreBoard);
      }
    }
    console.log(JSON.stringify(scoreBoard));
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};

module.exports = { getScoreboard, getSeasonStandings, getPlayersStandings };
