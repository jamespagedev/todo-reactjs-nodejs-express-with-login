import { useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Components
import ListOfToDos from '../components/home/listOfToDos.js';
import FormAddToDo from '../components/home/formAddTodo.js';
import ModalDeleteToDo from '../components/modals/modalDeleteToDo.js';

// globals
import { GlobalContext, proxyServer, backendRoutes, locStorTokName, cloneObjByValue } from '../globals/index.js';

const Home = () => {
  // variables
  const { globalBackendData } = useContext(GlobalContext);
  const [todos, setTodos] = useState([]);
  const [deleteModalData, setDeleteModalData] = useState({isOpen: false, id: 0, details: ""});

  // functions
  const getToDos = () => {
    const headers = { headers: {Authorization: `${globalBackendData.userInfo.id} ${localStorage.getItem(locStorTokName)}`} }
    axios.get(`${proxyServer}/${backendRoutes.todos.all}/${globalBackendData.userInfo.id}`, headers)
    .then(res => setTodos(res.data))
    .catch(err => console.log(err)); // <-- todo: create error modal
  }

  const addToDo = (newToDoText) => {
    const headers = { headers: {Authorization: `${globalBackendData.userInfo.id} ${localStorage.getItem(locStorTokName)}`} }
    const data = {
      details: newToDoText
    }
    axios.post(`${proxyServer}/${backendRoutes.todos.add}/${globalBackendData.userInfo.id}`, data, headers)
    .then(res => {
      if(res.data > 0){
        const copyOfToDos = cloneObjByValue(todos);
        copyOfToDos.push({id: res.data, details: newToDoText})
        setTodos(copyOfToDos);
      }
    })
    .catch(err => console.log(err)); // <-- todo: create error modal
  }

  const editToDo = (id, details) => {
    const headers = { headers: {Authorization: `${globalBackendData.userInfo.id} ${localStorage.getItem(locStorTokName)}`} }
    const data = { details: details }
    axios.put(`${proxyServer}/${backendRoutes.todos.edit}/${id}`, data, headers)
    .then(res => {
      if(res.data.id > 0){
        const editedToDo = res.data;
        const copyOfToDos = cloneObjByValue(todos);
        const toDoIdIndex = copyOfToDos.findIndex(todo => todo.id === editedToDo.id);
        copyOfToDos[toDoIdIndex] = editedToDo;
        setTodos(copyOfToDos);
      }
    })
    .catch(err => console.log(err)); // <-- todo: create error modal
  }

  const deleteToDo = (id) => {
    const headers = { headers: {Authorization: `${globalBackendData.userInfo.id} ${localStorage.getItem(locStorTokName)}`} }
    axios.delete(`${proxyServer}/${backendRoutes.todos.delete}/${id}`, headers)
    .then(res => {
      if(res.data > 0){
        const deletedId = res.data;
        const copyOfToDos = cloneObjByValue(todos);
        const deletedIdIndex = copyOfToDos.findIndex(todo => todo.id === deletedId);
        copyOfToDos.splice(deletedIdIndex, 1);
        setTodos(copyOfToDos);
      }
    })
    .catch(err => console.log(err)); // <-- todo: create error modal
  }

  // setup
  useEffect(getToDos, [globalBackendData.userInfo.id]);

  return (
    <div className="view">
      <div className="view-container">
        <FormAddToDo addToDo={addToDo} />
        <ListOfToDos todos={todos} editToDo={editToDo} deleteToDoModal={setDeleteModalData} />
      </div>
      <ModalDeleteToDo modalData={deleteModalData} deleteToDo={deleteToDo} setModalData={setDeleteModalData} />
    </div>
  )
}

export default Home;