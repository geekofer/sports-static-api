const {
  getScoreboard,
  getSeasonStandings,
  getPlayersStandings,
} = require('./src/nba/services');
const getNBAScoreboard = () => getScoreboard();
const getNBASeasonStandings = () => getSeasonStandings();
const getNBAPlayersStandings = () => getPlayersStandings();

module.exports = {
  getNBAScoreboard,
  getNBASeasonStandings,
  getNBAPlayersStandings,
};
