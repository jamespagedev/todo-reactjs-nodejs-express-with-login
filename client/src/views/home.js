import { useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Components
import ToDo from '../components/home/todo.js';

// globals
import { GlobalContext, proxyServer, backendRoutes, cloneObjByValue } from '../globals/index.js';

const Home = () => {
  // variables
  const { globalBackendData } = useContext(GlobalContext);
  const [ todos, setTodos] = useState([]);
  const [newToDoText, setNewToDoText] = useState("");

  // functions
  const addButtonHandler = (ev) => {
    ev.preventDefault();
    const data = {
      details: newToDoText
    }
    console.log("ADD newToDoText:", newToDoText);
    axios.post(`${proxyServer}/${backendRoutes.todos.add}/${globalBackendData.userInfo.id}`, data)
    .then(res => {
      if(res.data > 0){
        const copyOfToDos = cloneObjByValue(todos);
        copyOfToDos.push({id: res.data, details: newToDoText})
        setTodos(copyOfToDos);
      }
    })
    .then(() => setNewToDoText(""))
    .then(() => console.log('new todos:', todos))
    .catch(err => console.log(err))
  }

  // setup
  useEffect(() => {
    axios.get(`${proxyServer}/${backendRoutes.todos.all}/${globalBackendData.userInfo.id}`)
    .then(res => setTodos(res.data))
    .catch(err => console.log(err)); // <-- todo: create error modal
  }, [globalBackendData.userInfo.id]);

  return (
    <div className="view">
      <div className="view-container">
        <form className="form-home-add-todo">
          <textarea rows="4" placeholder="Enter todo task here..." value={newToDoText} onChange={ev => setNewToDoText(ev.target.value)} />
          <button onClick={ev => addButtonHandler(ev)}>Add To Do</button>
        </form>
        {!todos || todos.length === 0 ? <h1>No ToDo's Found</h1> :
          todos.map(todo =>
            <ToDo key={todo.id} id={todo.id} details={todo.details} />
          )
        }
      </div>
    </div>
  )
}

export default Home;