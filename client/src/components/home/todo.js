const ToDo = (props) => {
  // variables
  const {id, details, openDeleteToDoModal} = props;

  // functions
  const editButtonHandler = (ev, toDoId) => {
    ev.preventDefault();
    console.log("Edit toDoId:", toDoId);
  }

  const deleteButtonHandler = (ev, toDoId, details) => {
    ev.preventDefault();
    openDeleteToDoModal({isOpen: true, id: toDoId, details: details});
  }

  return (
    <div className="home-todo">
      <div className="div-details">
        <p className="p-details">{details}</p>
      </div>
      <div className="actions">
        <button className="edit" onClick={ev => editButtonHandler(ev, id)}>Edit</button>
        <button className="delete" onClick={ev => deleteButtonHandler(ev, id, details)}>Delete</button>
      </div>
    </div>
  )
}

export default ToDo;