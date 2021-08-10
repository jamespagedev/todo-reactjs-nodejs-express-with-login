import { useContext } from 'react';
import './header.css';

// globals
import { GlobalContext } from '../../globals/index.js';

const Header = () => {
  // variables
  const { globalBackendData } = useContext(GlobalContext);
  return (
    <header className="header">
      <i className="fa fa-user-circle" />
      <p>{globalBackendData.userInfo.name}</p>
    </header>
  )
}

export default Header;