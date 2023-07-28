import './appLoading.scss';
import AppLoadingLogo from '../../../assets/AppLoadingLogo.png';

function AppLoading() {
  return (
    <div className="AppLoading_MainContainer">
      <img src={AppLoadingLogo} alt="app loading" />
    </div>
  );
}

export { AppLoading };
