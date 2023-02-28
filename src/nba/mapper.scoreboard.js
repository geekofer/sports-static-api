const scoreboardHeader = {
  meta: {
    version: 1,
    seasonYear: "2021-22",
    time: new Date().toISOString(),
  },
};

const mapperScoreboard = (data) => {
  const schedule = data.leagueSchedule.gameDates.map((g, index) => ({
    date: g.gameDate.split(" ")[0].split("/").map( e => parseInt(e)).join("/"),
    games: g.games.map((game) => ({
      gameId: game.gameId,
      gameCode: game.gameCode,
      gameStatusText: game.gameStatusText,
      homeTeam: game.homeTeam,
      awayTeam: game.awayTeam,
      arenaName: game.arenaName,
      arenaCity: game.arenaCity,
      arenaState: game.arenaState,
      gameDateEst: game.gameDateEst.split("T")[0],
      gameTimeEst: game.gameTimeEst.split("T")[1].replace("Z", ""),
      gameDateTimeEst: game.gameDateTimeEst,
      pointsLeaders: game.pointsLeaders,
    })),
  }));

  return { ...scoreboardHeader, schedule };
};

module.exports = mapperScoreboard;
