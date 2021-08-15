const db = require('../dbConfig.js');

const getUserToDosById = (user_id) => {
  return db('todos')
    .where({ user_id });
}

module.exports = {
  getUserToDosById
};
