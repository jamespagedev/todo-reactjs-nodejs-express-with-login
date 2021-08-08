import { useContext, useState } from 'react';

// components
import HeaderGuest from '../components/headers/headerGuest.js';
import ModalLogin from '../components/modals/modalLogin.js';

// globals
import { GlobalContext } from '../globals/index.js';

const HomeLogin = () => {
  // variables
  const { isLoggingIn } = useContext(GlobalContext);
  const [modalData, setModalData] = useState({isOpen: false});

  // functions
  const openLoginModal = () => {
    setModalData({isOpen: true});
  }

  // render
  return (
    <div className="view">
      <HeaderGuest openLoginModal={openLoginModal} />
      <div className="view-container">
        <h1>Please Log In</h1>
      </div>
      {!isLoggingIn && <ModalLogin modalData={modalData} setModalData={setModalData} />}
    </div>
  )
}

export default HomeLogin;