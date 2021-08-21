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
      <div className={modalData.isOpen ? "modal-delete-opened" : "modal-delete-closed"} onClick={ev => ev.stopPropagation()}>
        <div className="modal-delete-top">
          <h2>Delete the following To Do?</h2>
        </div>
        <div className="modal-delete-mid">
          <p>{modalData.details}</p>
        </div>
        <div className="modal-delete-bot">
          <button type="button" className="cancel" onClick={closeModal}>CANCEL</button>
          <button type="button" className="delete" onClick={ev => deleteHandler(ev)}>DELETE</button>
        </div>
      </div>
    </div>
  );
}

export default ModalDeleteToDo;