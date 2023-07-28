import './LoginLayout.scss';

import { Outlet } from 'react-router-dom';
import { Topnav } from '../../components/Topnav/Topnav';

function LoginLayout() {
  return (
    <div className="LoginLayout_MainContainer">
      <div className="LoginLayout_HeaderContainer">
        <Topnav
          hideLoginButton
          hideSidenavButton
        />
      </div>
      <div className="LoginLayout_ContentContainer">
        <Outlet />
      </div>
    </div>
  );
}

export { LoginLayout };
