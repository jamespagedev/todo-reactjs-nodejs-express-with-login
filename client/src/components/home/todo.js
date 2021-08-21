import { useState } from "react";

const ToDo = (props) => {
  // variables
  const {editToDo, deleteToDoModal, id, details} = props;
  const [isEditingToDo, setIsEditingToDo] = useState(false);
  const [editToDoText, setEditToDoText] = useState(details);

  // functions
  const isEditTextChanged = () => {
    return editToDoText.length !== 0 && (editToDoText.length !== details.length || editToDoText !== details);
  }

  const editButtonHandler = (ev) => {
    ev.preventDefault();
    setIsEditingToDo(true);
  }

  const editCancelButtonHandler = (ev) => {
    ev.preventDefault();
    Promise.resolve(setEditToDoText(details))
    .then(() => setIsEditingToDo(false));
  }

  const editSaveButtonHandler = (ev) => {
    ev.preventDefault();
    if(isEditTextChanged()){
      Promise.resolve(console.log("edit text:", editToDoText))
      .then(() => editToDo(id, editToDoText)) // ToDo <-- replace with axios.put().then(() => cleanup())
      .then(() => setIsEditingToDo(false));
    }
  }

  const deleteButtonHandler = (ev) => {
    ev.preventDefault();
    deleteToDoModal({isOpen: true, id: id, details: details});
  }

  return ( isEditingToDo ?
    <div className="home-todo">
      <div className="div-details">
        <textarea className="textarea-details"  value={editToDoText} onChange={ev => setEditToDoText(ev.target.value)} />
      </div>
      <div className="actions">
        <button type="button" className="cancel" onClick={ev => editCancelButtonHandler(ev)}>CANCEL</button>
        <button type="button" className={(isEditTextChanged()) ? "save" : "disabled"} onClick={ev => editSaveButtonHandler(ev)}>SAVE</button>
      </div>
    </div> :
    <div className="home-todo">
      <div className="div-details">
        <p className="p-details">{details}</p>
      </div>
      <div className="actions">
        <button type="button" className="edit" onClick={ev => editButtonHandler(ev)}>EDIT</button>
        <button type="button" className="delete" onClick={ev => deleteButtonHandler(ev)}>DELETE</button>
      </div>
    </div>
  )
}

export default ToDo;