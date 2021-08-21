import axios from 'axios';

// globals
import { proxyServer, backendRoutes, locStorTokName, guestUserId } from '../globals/index.js'

const login = async(username, pswd, setIsLoggingIn, setGlobalBackendData) => {
  await setIsLoggingIn(true);
  const data = {
    userName: username,
    pswd: pswd
  }
  axios.post(`${proxyServer}/${backendRoutes.users.login}`, data)
  .then(res => {
    Promise.resolve(localStorage.setItem(locStorTokName, res.data.token))
    .then(() => setGlobalBackendData({userInfo: res.data}));
  })
  .catch(err => console.log(err)) // <-- todo: create error modal
  .finally(() => setIsLoggingIn(false));
}

const silentLogin = async(setGlobalBackendData) => {
  try {
    if(!localStorage.getItem(locStorTokName)){ // no login found
      setGlobalBackendData({ userInfo :{id: guestUserId, name: "", token: null} });
      return;
    }

    const loginSession = await axios.get(`${proxyServer}/${backendRoutes.users.silentLogin}`, { headers: {Authorization: localStorage.getItem(locStorTokName)} });
    if(loginSession.data.isNewToken){
      localStorage.setItem(locStorTokName, loginSession.data.token)
    }
    setGlobalBackendData({ userInfo :{id: loginSession.data.id, name: loginSession.data.name, token: loginSession.data.token}});
  } catch(err) {
    console.log(err); // <-- todo: create error modal
    localStorage.clear();
    setGlobalBackendData({ userInfo :{id: guestUserId, name: "", token: null} });
  }
}

const logout = (setGlobalBackendData) => {
  localStorage.clear();
  setGlobalBackendData({ userInfo :{id: guestUserId, name: "", token: null} });
}

export {
  login,
  silentLogin,
  logout
}