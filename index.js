const { getScoreboard, getSeasonStandings } = require("./src/nba/services");
const getNBAScoreboard = () => getScoreboard();
const getNBASeasonStandings = () => getSeasonStandings();

module.exports = {
    getNBAScoreboard,
    getNBASeasonStandings
};
