import { useTranslation } from 'react-i18next';
import ProfileSettings from '../../components/common/profileSettings/profileSettings';
import './Profile.scss';
import { useAppSelector } from '../../hooks/state/appStateHook';
import { selectUserIsLogged } from '../../state/user/user.selectors';
import ProfileInfo from '../../components/common/profileInfo/profileInfo';

function ProfilePage() {
  const { t } = useTranslation();
  const isLoggedIn = useAppSelector<boolean>(selectUserIsLogged);

  return (
    <div className="Profile_MainContainer">
      {isLoggedIn && (
      <div className="Profile_SettingsContainer">
        <p className="app_font_xl">{t('views.profile.info.title')}</p>
        <ProfileInfo />
      </div>
      )}
      <div className="Profile_SettingsContainer">
        <p className="app_font_xl">{t('views.profile.settings.title')}</p>
        <ProfileSettings />
      </div>
    </div>
  );
}

export default ProfilePage;
