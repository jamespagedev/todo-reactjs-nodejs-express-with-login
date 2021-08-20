const db = require('../dbConfig.js');

const getUserInfoById = async(id) => {
  try {
    const data = await db
      .select()
      .from('users')
      .where('id', id)
      .first();
    return data;
  } catch(err) {
    console.log("error:", err);
  }
}

const getUserInfoByUsername = async(username) => {
  try {
    const data = await db
      .select()
      .from('users')
      .whereRaw('LOWER(username) = ?', username.toLowerCase())
      .first();
    return data;
  } catch(err) {
    console.log("error:", err);
  }
}

const getUserTypeIdByUserId = async(userId) => {
  try {
    const data = await db
      .select('user_type_id')
      .from('users')
      .where('id', userId)
      .first();
    return data.user_type_id;
  } catch(err) {
    console.log("error:", err);
  }
}

module.exports = {
  getUserInfoById,
  getUserInfoByUsername,
  getUserTypeIdByUserId
};
