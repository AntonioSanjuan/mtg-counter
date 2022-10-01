import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../../assets/images/Logo.png';
import { useAppSelector } from '../../hooks/state/appStateHook';
import { selectUserIsLogged } from '../../state/user/user.selectors';
import { useSidenavLayer } from '../../hooks/sidenav/sidenavHook';
import './Topnav.scss';
import { SearchInput } from '../common/searchInput/searchInput';
import { ProfileSection } from '../common/profileSection/profileSection';
import { useUser } from '../../hooks/user/userHook';

function Topnav({ displayLoginButton, hideSidenavButton, hideSearchButton } :
  {displayLoginButton: boolean | undefined, hideSidenavButton?: boolean, hideSearchButton?: boolean}) {
  const [loginButtonHidden, setLoginButtonHidden] = useState<boolean|undefined>(!displayLoginButton);

  const isLoggedIn = useAppSelector<boolean>(selectUserIsLogged);
  const { switchSidenavStatus } = useSidenavLayer();
  const { logout } = useUser();

  useEffect(() => {
    if (displayLoginButton) {
      setLoginButtonHidden(isLoggedIn);
    }
  }, [displayLoginButton, isLoggedIn]);

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
        <div className="TopNav_Leftcontainer" style={{ visibility: hideSidenavButton ? 'hidden' : 'visible' }}>
          <button type="button" className="btn btn-dark" aria-label="switchSidenavButton" onClick={handleSidenavChange}>
            <i className="bi bi-list" />
          </button>
          <div className="TopNav_Search" style={{ visibility: hideSearchButton ? 'hidden' : 'visible' }}>
            <SearchInput onSearch={handleSearch} />
          </div>
        </div>
        <div className="TopNav_Centercontainer">
          <Link to="/">
            <img src={logo} alt="logo" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-router-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M5.525 3.025a3.5 3.5 0 0 1 4.95 0 .5.5 0 1 0 .707-.707 4.5 4.5 0 0 0-6.364 0 .5.5 0 0 0 .707.707Z"
              />
              <path
                d="M6.94 4.44a1.5 1.5 0 0 1 2.12 0 .5.5 0 0 0 .708-.708 2.5 2.5 0 0 0-3.536 0 .5.5 0 0 0 .707.707Z"
              />
              <path
                d="M2.974 2.342a.5.5 0 1 0-.948.316L3.806 8H1.5A1.5 1.5 0 0 0 0 9.5v2A1.5 1.5 0 0 0 1.5 13H2a.5.5 0 0 0 .5.5h2A.5.5 0 0 0 5 13h6a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5h.5a1.5 1.5 0 0 0 1.5-1.5v-2A1.5 1.5 0 0 0 14.5 8h-2.306l1.78-5.342a.5.5 0 1 0-.948-.316L11.14 8H4.86L2.974 2.342ZM2.5 11a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm4.5-.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Zm2.5.5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm1.5-.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Zm2 0a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Z"
              />
              <path
                d="M8.5 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
              />
            </svg>
          </Link>
        </div>
        <div className="TopNav_Rightcontainer">
          { loginButtonHidden && (
          <>
            <ProfileSection />
            <button type="button" className="btn btn-danger" onClick={() => logout()}>
              Logout
            </button>
          </>
          )}
          { !loginButtonHidden && (
          <Link to="/Login">
            <button type="button" className="btn btn-primary">
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
