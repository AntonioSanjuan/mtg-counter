import './Sidenav.scss';
import { useNavigate } from 'react-router-dom';
import { useSidenavLayer } from '../../hooks/sidenav/sidenavHook';
import { useAppSelector } from '../../hooks/state/appStateHook';
import { selectUserIsLogged } from '../../state/user/user.selectors';
import { Section } from '../common/section/section';
import { useAlert } from '../../hooks/alert/alertHook';
import { DynamicModalTypes } from '../../models/internal/types/DynamicModalEnum.model';

function Sidenav() {
  const isLoggedIn = useAppSelector<boolean>(selectUserIsLogged);
  const navigate = useNavigate();

  const { openAlert } = useAlert();
  const { switchSidenavStatus } = useSidenavLayer();

  const handleNavigation = (dest: string) => {
    navigate(dest);
    switchSidenavStatus();
  };

  const handleSearch = () => {
    switchSidenavStatus();
  };

  const handleOpenSettings = () => {
    switchSidenavStatus();
    openAlert(DynamicModalTypes.ProfileSettings);
  };

  return (
    <div className="sidenav_MainContainer">
      <div className="sidenav_NavContainer">
        <div
          role="button"
          tabIndex={0}
          className="sidenav_Section"
          onKeyPress={() => { handleNavigation('/'); }}
          onClick={() => { handleNavigation('/'); }}
        >
          <Section
            sectionName="New Game"
          >
            <i className="bi bi-plus" />
          </Section>
        </div>
        <div
          role="button"
          tabIndex={0}
          className="sidenav_Section"
          style={{ display: isLoggedIn ? 'inherit' : 'none' }}
          onKeyPress={() => { handleNavigation('/storedArticles'); }}
          onClick={() => { handleNavigation('/storedArticles'); }}
        >
          <Section
            sectionName="History"
          >
            <i className="bi bi-bookmark-star-fill" />
          </Section>
        </div>
      </div>
    </div>
  );
}

export { Sidenav };
