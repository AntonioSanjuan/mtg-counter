import { NotificationAlertPropsModel } from '../../../models/internal/models/alertProps.model';
import './notification.scss';

function Notification({
  title, description, onOkButtonClick, onCancelButtonClick,
}: NotificationAlertPropsModel) {
  return (
    <div className="Notification_MainContainer">
      <div className="Notification_HeaderContainer">
        <p className="app_font_m">{title}</p>
      </div>
      <div className="Notification_ContentContainer">
        <p className="app_font_s">{description}</p>
      </div>
      <div className="Notification_ActionsContainer">
        <button
          type="button"
          aria-label="Notification_OkButton"
          className="btn btn-primary"
          onClick={onOkButtonClick}
        >
          OK
        </button>
        <button
          type="button"
          aria-label="Notification_CancelButton"
          className="btn btn-danger"
          onClick={onCancelButtonClick}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Notification;
