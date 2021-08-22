import { useContext, useState, useEffect, useMemo } from 'react';
import io from 'socket.io-client';
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
  const headers = useMemo(getHeaders, [globalBackendData.userInfo.id]);
  const [tempToDosUserId] = useState(globalBackendData.userInfo.id); // ToDo: refactor into admin cms to seperate the toDoUserId vs loggedInUserId.
  const [socket, setSocket] = useState(null);
  const [todos, setTodos] = useState([]);
  const [deleteModalData, setDeleteModalData] = useState({isOpen: false, id: 0, details: ""});

  // functions
  function getHeaders(){return { headers: {Authorization: `${globalBackendData.userInfo.id} ${localStorage.getItem(locStorTokName)}`} }}
  function getToDos(){
    axios.get(`${proxyServer}/${backendRoutes.todos.all}/${globalBackendData.userInfo.id}`, headers)
    .then(res => setTodos(res.data))
    .catch(err => console.log(err)); // <-- todo: create error modal
  }

  async function addToDo(newToDoText){
    const emitData = {
      toDoUserId: globalBackendData.userInfo.id,
      data: {details: newToDoText}
    }
    await socket.emit('add_todo', emitData, (data) => setTodos(data));
  }

  function editToDo(id, details){
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

  function deleteToDo(id){
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
  useEffect(() => {
    if(socket){
      socket.emit('socket_channel', tempToDosUserId)
      socket.on('update_todos', res => {
        setTodos(res); // this only updates on everyone else browser except yours
      });
    }
  }, [socket, tempToDosUserId]);
  useEffect(() => {
    const newSocket = io(`${proxyServer}`, {
      extraHeaders: { // note: socket.io lowercases all keynames.
        requestoruserid: globalBackendData.userInfo.id,
        token: localStorage.getItem(locStorTokName)
      }
    });
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket, globalBackendData.userInfo.id]);
  useEffect(getToDos, [globalBackendData.userInfo.id, headers]);

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