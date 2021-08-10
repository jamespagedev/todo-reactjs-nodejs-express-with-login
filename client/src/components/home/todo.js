const ToDo = (props) => {
  // variables
  const {id, details} = props;

  const editButtonHandler = (ev, toDoId) => {
    ev.preventDefault();
    console.log("Edit toDoId:", toDoId);
  }

  const deleteButtonHandler = (ev, toDoId) => {
    ev.preventDefault();
    console.log("Delete toDoId:", toDoId);
  }

  return (
    <div className="home-todo">
      <div className="div-details">
        <p className="p-details">{details}</p>
      </div>
      <div className="actions">
        <button className="edit" onClick={ev => editButtonHandler(ev, id)}>Edit</button>
        <button className="delete" onClick={ev => deleteButtonHandler(ev, id)}>Delete</button>
      </div>
    </div>
  )
}

export default ToDo;