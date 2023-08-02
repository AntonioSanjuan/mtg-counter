import { useNavigate } from 'react-router-dom';
import { useSidenavLayer } from '../../hooks/sidenav/sidenavHook';
import { useAppSelector } from '../../hooks/state/appStateHook';
import { selectUserIsLogged } from '../../state/user/user.selectors';
import { Section } from '../common/section/section';
import SCSidenav from './Sidenav.style';
import Coloredlogo from '../../assets/ColoredLogo.png';
import { SearchInput } from '../common/searchInput/searchInput';

function Sidenav() {
  const isLoggedIn = useAppSelector<boolean>(selectUserIsLogged);
  const navigate = useNavigate();

  const { switchSidenavStatus } = useSidenavLayer();

  const handleNavigation = (dest: string) => {
    navigate(dest);
    switchSidenavStatus();
  };

  return (
    <SCSidenav>
      <div className="Sidenav_NavContainer">
        <div className="Sidenav_BodyContainer">
          <div className="Sidenav_HeaderContainer">
            <img src={Coloredlogo} alt="logo" />
          </div>
          <hr />
          <div className="Sidenav_SectionContainer">
            {/* <ProfileSection /> */}
            <Section
              sectionName="New Game"
              onClickCallback={() => { handleNavigation('/'); }}
            >
              <i className="bi bi-plus" />
            </Section>
            {isLoggedIn && (
            <>
              <Section
                sectionName="History"
                onClickCallback={() => { handleNavigation('/history'); }}
              >
                <i className="bi bi-bookmark-star-fill" />
              </Section>
              <Section
                sectionName="Deck Collection"
                onClickCallback={() => { handleNavigation('/deckCollection'); }}
              >
                <i className="bi bi-collection" />
              </Section>

            </>
            )}
          </div>

        </div>
        <div className="Sidenav_FooterContainer">
          <hr />
          <Section
            sectionName="Profile Settings"
            onClickCallback={() => { handleNavigation('/Profile'); }}
          >
            <i className="bi bi-gear-fill" />
          </Section>
          <hr />

          <SearchInput onSearch={undefined} />

          <p className="app_font_m app_font_noMargin">
            Version:
            {}
          </p>
        </div>
      </div>
    </SCSidenav>
  );
}

export { Sidenav };
