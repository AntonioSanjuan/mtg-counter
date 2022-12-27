import { useAlert } from '../../../hooks/alert/alertHook';
import './modal.scss';

function Modal({ children, canBeClosed }: {children: any, canBeClosed?: boolean}) {
  const { closeAlert } = useAlert();

  const handleClose = () => {
    if (canBeClosed) {
      closeAlert();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="Modal_MainContainer"
      onClick={() => { handleClose(); }}
      onKeyDown={() => { handleClose(); }}
    >
      <div
        className="Modal_SubContainer"
        role="button"
        tabIndex={0}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <div className="Modal_ContentContainer">
          {children}
        </div>
      </div>

    </div>
  );
}

export default Modal;
