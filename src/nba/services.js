const axios = require("axios");
const environment = require("../evironment");

const { storage } = require("../utils/data.storage");
const mapperScoreboard = require("./mapper.scoreboard");

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

const getSeasonStandings = async () => {

  try {
    let standings = null;

    if (!standings || standings === null) {
      const results = await axios({
        method: "get",
        url: environment.nba.seasonStandingsUrl,
      }, {
        Origin: "https://www.nba.com",
        Referer: "https://www.nba.com/"
      });
      console.log(results);
      if (results && results.data) {
        await storage("nba", "season-standings.json", results.data);
      }
    }
    console.log(JSON.stringify(standings));
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};

module.exports = { getScoreboard, getSeasonStandings };
