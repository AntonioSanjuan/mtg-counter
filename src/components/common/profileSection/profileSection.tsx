import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/state/appStateHook';
import { UserState } from '../../../state/user/models/appUser.state';
import { selectUser } from '../../../state/user/user.selectors';
import './profileSection.scss';

function ProfileSection() {
  const user = useAppSelector<UserState>(selectUser);
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate('/Profile');
  };

  return (
    <div className="ProfileSection_MainContainer">
      {
        user.isLogged
          ? (
            <>
              <div className="ProfileSection_ImageContainer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>
              </div>
              <div className="ProfileSection_DataContainer">
                <button type="button" className="btn btn-link app_font_s" onClick={() => goToProfile()}>Profile</button>
              </div>
            </>
          )
          : (
            <div className="ProfileSection_ImageContainer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-person-x-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </div>
          )
      }
    </div>
  );
}

export { ProfileSection };
