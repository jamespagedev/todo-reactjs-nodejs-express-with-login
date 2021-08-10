const ModalDeleteToDo = (props) => {
  // variables
  const { modalData, deleteToDo, setModalData } = props;

  // functions
  const deleteHandler = (ev) => {
    ev.preventDefault();
    Promise.resolve(deleteToDo(modalData.id))
    .then(() => closeModal());
  }

  const closeModal = () => {
    setModalData({isOpen: false, id: 0, details: ""});
  }

  // render
  return (
    <div className={modalData.isOpen ? "modal-background-show" : "modal-background-hide"} onClick={closeModal}>
      <div className={modalData.isOpen ? "modal-login-opened" : "modal-login-closed"} onClick={ev => ev.stopPropagation()}>
        <div className="top">
          <h2>Are You Sure?</h2>
        </div>
        <div className="mid">
          <h3>Delete the following To Do:</h3>
          <p>{modalData.details}</p>
        </div>
        <div className="bot">
          <button type="button" onClick={closeModal}>CANCEL</button>
          <button type="button" onClick={ev => deleteHandler(ev)}>DELETE</button>
        </div>
      </div>
    </div>
  );
}

export default ModalDeleteToDo;