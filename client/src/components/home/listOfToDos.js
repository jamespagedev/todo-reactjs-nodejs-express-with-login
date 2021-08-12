// Components
import ToDo from './todo.js';

const ListOfToDos = (props) => {
  // variables
  const { todos, editToDo, deleteToDoModal } = props;

  return (
    <div>
      {!todos || todos.length === 0 ? <h1>No ToDo's Found</h1> :
        todos.map(todo =>
          <ToDo key={todo.id} id={todo.id} details={todo.details} editToDo={editToDo} deleteToDoModal={deleteToDoModal} />
        )
      }
    </div>
  )
}

export default ListOfToDos;