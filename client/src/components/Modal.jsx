function Modal({ title, children, onCancel, onConfirm, confirmText }) {
  return (
    <>
      <div className="modal-backdrop"></div>
      <div className="modal">
        <header className="modal-header">
          <h3 className="modal-title">{title}</h3>
        </header>
        <section className="modal-body">{children}</section>
        <footer className="modal-footer">
          {onCancel && <button onClick={onCancel}>Cancel</button>}
          {onConfirm && (
            <button className="ml-1" onClick={onConfirm}>
              {confirmText}
            </button>
          )}
        </footer>
      </div>
    </>
  );
}

export default Modal;
