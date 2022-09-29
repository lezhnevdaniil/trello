import "./Modal.scss";

const Modal = ({ setIsModal, children }) => {
  return (
    <div
      className="modal_container"
      onClick={() =>
        setIsModal({ changeColumn: false, addColumn: false, addTask: false })
      }
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
