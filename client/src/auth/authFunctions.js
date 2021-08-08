import axios from 'axios';

// globals
import { proxyServer } from '../globals/index.js'

const login = async(username, pswd, setIsLoggingIn, setGlobalBackendData) => {
  await setIsLoggingIn(true);
  const data = {
    userName: username,
    pswd: pswd
  }
  console.log('login');
  console.log('data =', data);
  console.log('proxyServer =', proxyServer);
  // ToDo: since token is being returned from server here, ensure it gets set before calling setGlobalBackendData()
  axios.post(`${proxyServer}/users/login`, data)
  .then(res => {
    console.log('res', res.data);
    setGlobalBackendData({isGlobalDataLoaded: true, userInfo: res.data})
  })
  .catch(err => console.log(err)) // <-- todo: create error modal
  .finally(() => setIsLoggingIn(false));
  // setGlobalBackendData({isGlobalDataLoaded: true, userInfo: {id: 1}})
  // await setIsLoggingIn(false);
}

export {
  login
}