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
    console.log('res.data.token:', res.data.token);
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

    const loginSession = await axios.get(`${proxyServer}/users/silentLogin`, { headers: {Authorization: localStorage.getItem(locStorTokName)} });
    console.log('tokenStatus:', loginSession);
    if(loginSession.data.isNewToken){
      console.log('new token');
      localStorage.setItem(locStorTokName, loginSession.data.token)
    }
    console.log('good token');
    setGlobalBackendData({ userInfo :{id: loginSession.data.id, name: loginSession.data.name, token: loginSession.data.token}});
  } catch(err) {
    console.log('bad token');
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