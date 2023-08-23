import { useTranslation } from 'react-i18next';
import { NotificationAlertPropsModel } from '../../../models/internal/models/alertProps.model';
import './notification.scss';

function Notification({
  title, description, okButtonText, cancelButtonText, onOkButtonClick, onCancelButtonClick,
}: NotificationAlertPropsModel) {
  const { t } = useTranslation();

  return (
    <div className="Notification_MainContainer">
      <div className="Notification_HeaderContainer">
        <h3 className="app_font_xl">{title}</h3>
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
          {okButtonText || t('modals.notification.defaultOkButtonText')}
        </button>
        <button
          type="button"
          aria-label="Notification_CancelButton"
          className="btn btn-danger"
          onClick={onCancelButtonClick}
        >
          {cancelButtonText || t('modals.notification.defaultCancelButtonText')}
        </button>
      </div>
    </div>
  );
}

export default Notification;
