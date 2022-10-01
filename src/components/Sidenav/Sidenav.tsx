import './Sidenav.scss';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/user/userHook';
import { useSidenavLayer } from '../../hooks/sidenav/sidenavHook';
import { useAppSelector } from '../../hooks/state/appStateHook';
import { selectUserIsLogged } from '../../state/user/user.selectors';
import { ProfileSection } from '../common/profileSection/profileSection';
import { SearchInput } from '../common/searchInput/searchInput';
import { Section } from '../common/section/section';
import { useAlert } from '../../hooks/alert/alertHook';
import { DynamicModalTypes } from '../../models/internal/types/DynamicModalEnum.model';

function Sidenav() {
  const isLoggedIn = useAppSelector<boolean>(selectUserIsLogged);
  const navigate = useNavigate();

  const { logout } = useUser();
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
        <div>
          <div
            role="button"
            tabIndex={0}
            className="sidenav_Section"
            onKeyPress={() => { handleNavigation('/'); }}
            onClick={() => { handleNavigation('/'); }}
          >
            <Section
              sectionName="Popular Articles"
            >
              <i className="bi bi-book-fill" />
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
              sectionName="Stored Articles"
            >
              <i className="bi bi-bookmark-star-fill" />
            </Section>
          </div>
          <div className="sidenav_Section">
            <Section sectionName="to-do">
              <i className="bi bi-clock-fill" />
            </Section>
          </div>
        </div>
        <div className="sidenav_FooterSection">
          <div
            role="button"
            tabIndex={0}
            className="sidenav_Section"
            onKeyPress={() => { handleOpenSettings(); }}
            onClick={() => { handleOpenSettings(); }}
          >
            <Section
              sectionName="Settings"
            >
              <i className="bi bi-gear-fill" />
            </Section>
          </div>
          <div
            role="button"
            tabIndex={0}
            className="sidenav_Section"
            onKeyPress={() => { handleNavigation('/contact'); }}
            onClick={() => { handleNavigation('/contact'); }}
          >
            <Section
              sectionName="Contact"
            >
              <i className="bi bi-chat-left-dots-fill" />
            </Section>
          </div>
          <div
            role="button"
            tabIndex={0}
            style={{ display: isLoggedIn ? 'inherit' : 'none' }}
            onKeyPress={logout}
            onClick={logout}
            className="sidenav_Section"
          >
            <Section
              sectionName="Exit"
              color="var(--app-error-color)"
            >
              <i className="bi bi-box-arrow-right" />
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Sidenav };
