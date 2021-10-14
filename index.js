const axios = require("axios");
const fs = require("fs");
const path = require("path");

const getNbaScoreboard = async (date) => {
  try {
    let scoreBoard = null;

    if (!scoreBoard || scoreBoard === null) {
      const results = await axios({
        method: "get",
        url: "https://cdn.nba.com/static/json/staticData/scheduleLeagueV2_1.json",
      });

      if (results && results.data) {
        const score = results.data;
        const prettyGames = score.leagueSchedule.gameDates.map((g, index) => ({
          date: g.gameDate.split(' ')[0],
          games: g.games.map(game => ({
            gameId: game.gameId,
            gameCode: game.gameCode,
            gameStatusText: game.gameStatusText,
            homeTeam: game.homeTeam,
            awayTeam: game.awayTeam,
            arenaName: game.arenaName,
            arenaCity: game.arenaCity,
            arenaState: game.arenaState,
            gameDateEst: game.gameDateEst.split('T')[0],
            gameTimeEst: game.gameTimeEst.split('T')[1].replace('Z', ''),
            gameDateTimeEst: game.gameDateTimeEst,
            pointsLeaders: game.pointsLeaders
          })),
        }));
        
        const mappedGames = {
          meta: {
              version: 1,
              seasonYear:"2021-22",
              time: new Date().toISOString()
          },
          schedule: prettyGames
        }
        fs.writeFileSync(
          path.resolve(`${__dirname}/data/nba/`, `scoreboard.json`),
          JSON.stringify(mappedGames)
        );
        scoreBoard = mappedGames;
      }
    }
    console.log(JSON.stringify(scoreBoard));
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};

getNbaScoreboard();

