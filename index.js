const axios = require("axios");
const fs = require("fs");
const path = require("path");

const getScoreBoardByDate = async (date) => {
  try {
    let scoreBoard = null;

    if (!scoreBoard || scoreBoard === null) {
      const results = await axios({
        method: "get",
        url: "https://cdn.nba.com/static/json/staticData/scheduleLeagueV2_1.json",
      });

      if (results && results.data) {
        fs.writeFileSync(
          path.resolve(`${__dirname}/data/`, `scoreboard_${date}.json`),
          JSON.stringify(results.data)
        );

        scoreBoard = results.data;
      }
    }
    console.log(JSON.stringify(scoreBoard));
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};

getScoreBoardByDate("10142021");
