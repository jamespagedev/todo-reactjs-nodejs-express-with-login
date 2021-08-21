import { useState } from "react";

const FormAddToDo = (props) => {
  // variables
  const { addToDo } = props;
  const [newToDoText, setNewToDoText] = useState("");
  const [addFormValidate, setAddFormValidate] = useState({isError: false, errMsg: ""});

  // functions
  const addButtonHandler = (ev) => {
    ev.preventDefault();
    if(newToDoText){
      Promise.resolve(addToDo(newToDoText))
      .then(() => setNewToDoText(""))
      .catch(err => console.log(err)); // <-- todo: create error modal
    } else {
      Promise.resolve(setAddFormValidate({isError: true, errMsg: "To Do must have text before being added to the list."})) // <-- todo: create error modal
      .then(() => console.log("error:", addFormValidate.errMsg));
    }
  }

  return (
    <form className="form-home-add-todo">
      <textarea rows="4" placeholder="Add todo task here..." value={newToDoText} onChange={ev => setNewToDoText(ev.target.value)} />
      <button type="button" className={newToDoText ? "add" : "disabled"} onClick={ev => addButtonHandler(ev)}>Add To Do</button>
    </form>
  )
}

export default FormAddToDo;