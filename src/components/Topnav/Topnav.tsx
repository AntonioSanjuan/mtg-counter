import { Link } from 'react-router-dom';
import Whitelogo from '../../assets/WhiteLogo.png';
import { useAppSelector } from '../../hooks/state/appStateHook';
import { selectUserIsLogged } from '../../state/user/user.selectors';
import { useSidenavLayer } from '../../hooks/sidenav/sidenavHook';
import './Topnav.scss';
import { SearchInput } from '../common/searchInput/searchInput';
import { ProfileSection } from '../common/profileSection/profileSection';
import { useAuth } from '../../hooks/auth/authHook';

function Topnav({ hideLoginButton, hideSidenavButton, hideSearchButton } :
  {hideLoginButton?: boolean | undefined, hideSidenavButton?: boolean, hideSearchButton?: boolean}) {
  const isLoggedIn = useAppSelector<boolean>(selectUserIsLogged);

  const { switchSidenavStatus } = useSidenavLayer();
  const { logout } = useAuth();

  const handleSidenavChange = (e: any) => {
    e.preventDefault();
    switchSidenavStatus();
  };

  const handleSearch = (searchValue: string) => {
    console.log('searching!!!!!...', searchValue);
  };

  return (
    <div className="TopNav_Maincontainer">
      <div className="TopNav_Subcontainer">
        <div className="TopNav_Leftcontainer">
          { !hideSidenavButton && (
          <>
            <button
              type="button"
              className="btn btn-dark"
              aria-label="switchSidenavButton"
              onClick={handleSidenavChange}
            >
              <i className="bi bi-list" />
            </button>
            { !hideSearchButton && (
            <div className="TopNav_Search">
              <SearchInput onSearch={handleSearch} />
            </div>
            )}
          </>
          )}
        </div>

        <div className="TopNav_Centercontainer">
          <Link to="/">
            <img src={Whitelogo} alt="logo" />
          </Link>
        </div>
        <div className="TopNav_Rightcontainer">

          <ProfileSection />
          {isLoggedIn && !hideLoginButton && (
          <button
            type="button"
            className="btn btn-danger"
            aria-label="logout"
            onClick={() => logout()}
          >
            Logout
          </button>
          )}
          {!isLoggedIn && !hideLoginButton && (
            <Link to="/Login">
              <button
                type="button"
                className="btn btn-primary"
                aria-label="login"
              >
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export { Topnav };
