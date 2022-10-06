import './Sidenav.scss';
import { useNavigate } from 'react-router-dom';
import { useSidenavLayer } from '../../hooks/sidenav/sidenavHook';
import { useAppSelector } from '../../hooks/state/appStateHook';
import { selectUserIsLogged } from '../../state/user/user.selectors';
import { Section } from '../common/section/section';

function Sidenav() {
  const isLoggedIn = useAppSelector<boolean>(selectUserIsLogged);
  const navigate = useNavigate();

  const { switchSidenavStatus } = useSidenavLayer();

  const handleNavigation = (dest: string) => {
    navigate(dest);
    switchSidenavStatus();
  };

  return (
    <div className="sidenav_MainContainer">
      <div className="sidenav_NavContainer">
        <Section
          sectionName="New Game"
          onClickCallback={() => { handleNavigation('/'); }}
        >
          <i className="bi bi-plus" />
        </Section>
        {isLoggedIn && (
          <Section
            sectionName="History"
            onClickCallback={() => { handleNavigation('/'); }}
          >
            <i className="bi bi-bookmark-star-fill" />
          </Section>
        )}
      </div>
    </div>
  );
}

export { Sidenav };
