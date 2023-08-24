import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Whitelogo from '../../assets/WhiteLogo.png';
import { useAppSelector } from '../../hooks/state/appStateHook';
import { selectUserIsLogged } from '../../state/user/user.selectors';
import { useSidenavLayer } from '../../hooks/sidenav/sidenavHook';
import './Topnav.scss';
import { SearchInput } from '../common/searchInput/searchInput';
import { ProfileSection } from '../common/profileSection/profileSection';
import { useAuth } from '../../hooks/auth/authHook';
import { useAlert } from '../../hooks/alert/alertHook';
import { DynamicAlertTypes } from '../../models/internal/types/DynamicAlertEnum.model';

function Topnav({ hideLoginButton, hideSidenavButton } :
  {hideLoginButton?: boolean | undefined, hideSidenavButton?: boolean}) {
  const isLoggedIn = useAppSelector<boolean>(selectUserIsLogged);
  const { t } = useTranslation();

  const { switchSidenavStatus } = useSidenavLayer();
  const { logout } = useAuth();
  const { openAlert, closeAlert } = useAlert();

  const handleSidenavChange = (e: any) => {
    e.preventDefault();
    switchSidenavStatus();
  };

  return (
    <div className="TopNav_Maincontainer">
      <div className="TopNav_Subcontainer">
        <div className="TopNav_Leftcontainer">
          { !hideSidenavButton && (
          <button
            type="button"
            className="btn btn-dark"
            aria-label="switchSidenavButton"
            onClick={handleSidenavChange}
          >
            <i className="bi bi-list" />
          </button>
          )}
        </div>

        <div className="TopNav_Centercontainer">
          <Link to="/">
            <img src={Whitelogo} alt="logo" />
          </Link>
        </div>
        <div className="TopNav_Rightcontainer">
          {isLoggedIn && !hideLoginButton && (
          <button
            type="button"
            className="btn btn-danger"
            aria-label="logout"
            onClick={() => openAlert(DynamicAlertTypes.Notification, {
              title: t('layouts.base.topNav.signOut.title'),
              okButtonText: t('layouts.base.topNav.signOut.ok'),
              cancelButtonText: t('layouts.base.topNav.signOut.cancel'),
              onOkButtonClick: async () => {
                await logout();
                closeAlert();
              },
              onCancelButtonClick: closeAlert,
            })}
          >
            {t('layouts.base.topNav.actions.logOut')}
          </button>
          )}
          {!isLoggedIn && !hideLoginButton && (
            <Link to="/Login">
              <button
                type="button"
                className="btn btn-primary"
                aria-label="login"
              >
                {t('layouts.base.topNav.actions.logIn')}
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export { Topnav };
