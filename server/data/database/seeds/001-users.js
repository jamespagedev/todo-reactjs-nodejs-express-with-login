require('dotenv').config({path: '../../../.env'});
const { bcrypt } = require('../../../config/middleware/middleware.js');
const { userStatusIds, numOfHashes } = require('../../../config/middleware/globals.js');

// For loop to generate numOfFakeUsers
const generateSeeds = () => {
  let arr = [];

  // test account(s)
  arr.push({
    username: process.env.INITIAL_USER,
    hashed_pswd: bcrypt.hashSync(process.env.INITIAL_USER_PSWD, numOfHashes),
    email: process.env.INITIAL_USER_EMAIL,
    status_id: userStatusIds.active,
    created_by: 1, // initial user id
    last_edited_by: 1 // initial user id
  });
  return arr;
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries for users table
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert(generateSeeds());
    });
};
