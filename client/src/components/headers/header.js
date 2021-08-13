import { useContext } from 'react';
import './header.css';

// globals
import { GlobalContext } from '../../globals/index.js';

const Header = () => {
  // variables
  const { globalBackendData, handleLogout } = useContext(GlobalContext);

  // functions
  const logoutButtonHandler = (ev) => {
    ev.preventDefault();
    handleLogout();
  }

  return (
    <header className="header">
      <i className="fa fa-user-circle" />
      <p>{globalBackendData.userInfo.name}</p>
      <button onClick={ev => logoutButtonHandler(ev)}>Logout</button>
    </header>
  )
}

export default Header;