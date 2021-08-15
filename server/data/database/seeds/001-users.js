require('dotenv').config({path: '../../../.env'});
const bcrypt = require('bcryptjs');
const { userStatusIds, numOfHashes } = require('../../../config/middleware/globals.js');

// For loop to generate numOfFakeUsers
const generateSeeds = () => {
  let arr = [];
  const now = new Date().getTime();

  // test account(s)
  arr.push({
    username: process.env.INITIAL_USER,
    password: bcrypt.hashSync(process.env.INITIAL_USER_PSWD, numOfHashes),
    email: process.env.INITIAL_USER_EMAIL,
    status_id: userStatusIds.active,
    created_by: 1, // initial user id
    created_at: now,
    last_edited_by: 1, // initial user id
    last_edited_at: now,
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
