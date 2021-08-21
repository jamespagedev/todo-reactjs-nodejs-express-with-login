import React, { useState, useContext } from "react";

// globals
import { GlobalContext } from '../../globals/index.js';

const ModalLogin = (props) => {
  // variables
  const { handleLogin } = useContext(GlobalContext);
  const { modalData, setModalData } = props;
  const [userName, setUserName] = useState('');
  const [pswd, setPswd] = useState('');

  // functions
  const formHandleSubmit = (ev) => {
    ev.preventDefault();
    handleLogin(userName, pswd)
  }

  const closeModal = () => {
    setModalData({isOpen: false});
  }

  // render
  return (
    <div className={modalData.isOpen ? "modal-background-show" : "modal-background-hide"} onClick={closeModal}>
      <form className={modalData.isOpen ? "modal-login-opened" : "modal-login-closed"} onClick={ev => ev.stopPropagation()} onSubmit={ev => formHandleSubmit(ev)}>
        <div className="modal-login-top">
          <h2>Login</h2>
        </div>
        <div className="modal-login-mid">
          <input type="text" placeholder="User Name..." value={userName} onChange={ev => setUserName(ev.target.value)} />
          <input type="text" placeholder="Password..." value={pswd} onChange={ev => setPswd(ev.target.value)} />
        </div>
        <div className="modal-login-bot">
          <button type="button" className="cancel" onClick={closeModal}>CANCEL</button>
          <button type="submit" className="login">LOGIN</button>
        </div>
      </form>
    </div>
  );
}

export default ModalLogin;