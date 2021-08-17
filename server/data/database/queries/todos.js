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

const getUserToDoByUserIdToDoId = async(todo_id) => {
  try{
    const data = await db
      .select('id', 'details')
      .from('todos')
      .where('id', todo_id)
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

const updateUserToDoReturnsToDoId = async(todo_id, edited_by_user_id, details) => {
  try{
    const updatedToDoId = await db
      .from('todos')
      .where('id', todo_id)
      .update({details: details, last_edited_by: edited_by_user_id}) // returns 1 or 0
      .then(res => !!res ? todo_id : 0);
    return updatedToDoId;
  } catch(err) {
    console.log('error:', err);
  }
}

const updateUserToDoReturnsToDo = async(todo_id, edited_by_user_id, details) => {
  // returns {id, details}
  try{
    const updatedToDo = await db
      .from('todos')
      .where('id', todo_id)
      .update({details: details, last_edited_by: edited_by_user_id}) // returns 1 or 0
      .then(res => !!res ? getUserToDoByUserIdToDoId(todo_id) : {id: 0, details: ""});
    return updatedToDo;
  } catch(err) {
    console.log('error:', err);
  }
}

const deleteUserToDoReturnsTrue = async(todo_id) => {
  try{
    const results = await db
      .from('todos')
      .del() // returns 1 or 0
      .where('id', todo_id)
      .then(res => !!res ? todo_id : 0);
    return results;
  } catch(err) {
    console.log('error:', err);
  }
}

module.exports = {
  getUserToDosById,
  getUserToDoByUserIdToDoId,
  insertUserToDoReturnsToDoId,
  updateUserToDoReturnsToDoId,
  updateUserToDoReturnsToDo,
  deleteUserToDoReturnsTrue
};
