const db = require('../dbConfig.js');

const getUserToDosById = async(user_id) => {
  try{
    const data = await db
      .select('id', 'details')
      .from('todos')
      .where('user_id', user_id);
    return data;
  } catch(err) {
    console.log('error:', err);
  }
}

const getUserToDoByUserIdToDoId = async(user_id, todo_id) => {
  try{
    const data = await db
      .select('id', 'details')
      .from('todos')
      .where('user_id', user_id)
      .andWhere('id', todo_id)
      .first();
    return data;
  } catch(err) {
    console.log('error:', err);
  }
}

const insertUserToDoReturnsToDoId = async(todo_user_id, insert_by_user_id, details) => {
  try{
    const newTodo = {user_id: todo_user_id, details: details, created_by: insert_by_user_id, last_edited_by: insert_by_user_id};
    const results = await db
      .insert(newTodo)
      .into('todos');
    return results[0];
  } catch(err) {
    console.log('error:', err);
  }
}

const deleteUserToDoReturnsTrue = async(todo_id) => {
  try{
    const results = await db
      .from('todos')
      .del() // returns 1 or 0
      .where('id', todo_id);
    return !!results;
  } catch(err) {
    console.log('error:', err);
  }
}

module.exports = {
  getUserToDosById,
  getUserToDoByUserIdToDoId,
  insertUserToDoReturnsToDoId,
  deleteUserToDoReturnsTrue
};
