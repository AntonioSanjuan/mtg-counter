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
      <button
        type="button"
        className="btn btn-link ProfileSection_ImageContainer"
        onClick={() => goToProfile()}
      >
        { user.isLogged
          ? (
            <i className="bi bi-person-circle" />
          )
          : (
            <i className="bi bi-person-x-fill" />
          )}
      </button>
    </div>
  );
}

export { ProfileSection };
