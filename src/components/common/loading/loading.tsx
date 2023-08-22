import { useTranslation } from 'react-i18next';
import Modal from '../modal/modal';
import './loading.scss';

function Loading() {
  const { t } = useTranslation();

  return (
    <Modal>
      <div className="Loading_SubContainer">
        <div className="lds-dual-ring" />
        <p className="app_font_m">{t('modals.loading.title')}</p>
      </div>
    </Modal>
  );
}

export { Loading };
