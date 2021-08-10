import { useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Components
import ToDo from '../components/home/todo.js';

// globals
import { GlobalContext, proxyServer, backendRoutes } from '../globals/index.js';

const Home = () => {
  // variables
  const { globalBackendData } = useContext(GlobalContext);
  const [ todos, setTodos] = useState([]);

  // setup
  useEffect(() => {
    axios.get(`${proxyServer}/${backendRoutes.todos.all}/${globalBackendData.userInfo.id}`)
    .then(res => setTodos(res.data))
    .catch(err => console.log(err)); // <-- todo: create error modal
  }, [globalBackendData.userInfo.id]);

  return (
    <div className="view">
      <div className="view-container">
        <div className="input"></div>
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