import styled from 'styled-components';

export interface SidenavStyleProps {
  opened: boolean,
}

const SCSidenav = styled.div.attrs<
SidenavStyleProps, // What is consumed by .attrs()
Required<SidenavStyleProps> // What comes out of .attrs()
>((props: SidenavStyleProps) => (
{
  opened: props.opened ?? false,
} as Required<SidenavStyleProps>
))`
flex-direction: column;
box-sizing: border-box;
display: flex;
place-content: flex-start;
align-items: flex-start;

width: var(--app-sidenav-width);
min-width: var(--app-sidenav-width);
height: 100%;

.Sidenav_NavContainer {
    flex-direction: column;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    position: sticky;

    height: 100%;
    top: var(--app-topnav-height);
    left: 0;

    padding: 5%;

    background-color: var(--app-sidenav-background-color);
    box-shadow: var(--app-hight-contrast) 0px 0px 20px;

    hr {
      height: 2px;
      color: var(--app-sidenav-section-font-color)
    }

    .Sidenav_BodyContainer {
      display: flex;
      flex-direction: column;

      .Sidenav_HeaderContainer {
        display: flex;
        flex-direction: column;

        img {
        }
      }
      .Sidenav_SectionContainer {
        display: flex;
        flex-direction: column;
      }
    }

    .Sidenav_FooterContainer {
      display: flex;
      flex-direction: column;

      > p {
        margin-top: 10px;
      }
    }
}

@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
.Sidenav_MainContainer {
    .Sidenav_NavContainer {
        top: 0;
    }
}

`;

export default SCSidenav;
