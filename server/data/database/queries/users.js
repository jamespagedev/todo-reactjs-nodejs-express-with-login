const db = require('../dbConfig.js');

const getUserByUsername = (username) => {
  return db('users')
    .whereRaw('LOWER(username) = ?', username.toLowerCase());
}

module.exports = {
  getUserByUsername
};
