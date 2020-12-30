const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  max_history: process.env.REACT_APP_MAX_HISTORY,
  green: process.env.REACT_APP_GREEN,
  red: process.env.REACT_APP_RED
};