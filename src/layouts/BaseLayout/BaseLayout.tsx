import './BaseLayout.scss';

import { Outlet } from 'react-router-dom';
import { Topnav } from '../../components/Topnav/Topnav';
import { Sidenav } from '../../components/Sidenav/Sidenav';
import { useAppSelector } from '../../hooks/state/appStateHook';
import { selectLayoutIsSidenavOpened } from '../../state/layout/layout.selectors';
import { inBlurAnimation, outBlurAnimation } from '../../animations/blur/blurAnimation';
import { useAnimationByStateTransition } from '../../hooks/animation/animationHook';
import { inSlideAnimation, outSlideAnimation } from '../../animations/slide/slideAnimation';

function Layout() {
  const isSidenavOpened = useAppSelector<boolean>(selectLayoutIsSidenavOpened);
  const useAnimation = useAnimationByStateTransition(isSidenavOpened);

  const getLayoutSidenavAnimation = () => (isSidenavOpened ? inSlideAnimation : outSlideAnimation);
  const getLayoutContentAnimation = () => (isSidenavOpened ? inBlurAnimation : outBlurAnimation);

  return (
    <div className="Layout_MainContainer">
      <div className="Layout_HeaderContainer">
        <Topnav displayLoginButton />
      </div>
      <div className="Layout_ContentContainer">
        <div className="Layout_ContentSidenav" style={useAnimation.stateTransition ? getLayoutSidenavAnimation() : undefined}>
          <Sidenav />
        </div>
        <div className="Layout_Content" style={useAnimation.stateTransition ? getLayoutContentAnimation() : undefined}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export { Layout };
