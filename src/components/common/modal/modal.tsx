import { useAlert } from '../../../hooks/alert/alertHook';
import './modal.scss';

function Modal({ children, showHeader }: {children: any, showHeader?: boolean}) {
  const { closeAlert } = useAlert();
  return (
    <div className="Modal_MainContainer">
      <div className="Modal_SubContainer">
        {
            showHeader && (
            <div className="Modal_HeaderContainer">
              <button type="button" className="btn btn-link app_font_l" onClick={() => closeAlert()}>
                <i className="bi bi-x" />
              </button>
            </div>
            )
        }
        <div className="Modal_ContentContainer">
          {children}
        </div>
      </div>

    </div>
  );
}

export default Modal;
