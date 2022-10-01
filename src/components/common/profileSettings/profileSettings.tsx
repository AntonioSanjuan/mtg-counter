import './profileSettings.scss';
import { FormikProps, useFormik } from 'formik';
import { useAppSelector } from '../../../hooks/state/appStateHook';
import { useUserSettings } from '../../../hooks/userSettings/userSettingsHook';
import { FirebaseUserSettingsDto } from '../../../models/dtos/firebaseStore/firebaseUserSettings.model';
import { selectUserSettings } from '../../../state/user/user.selectors';
import { Loading } from '../loading/loading';

function ProfileSettings() {
  const userSettings = useAppSelector<FirebaseUserSettingsDto | undefined>(selectUserSettings);
  const { updateUserSettings, loading } = useUserSettings();
  const formik: FormikProps<FirebaseUserSettingsDto> = useFormik<FirebaseUserSettingsDto>({
    initialValues: userSettings as FirebaseUserSettingsDto,
    onSubmit: async () => {
      await updateSettings();
    },
  });

  const updateSettings = async () => {
    if (userSettings) {
      const newSettings: FirebaseUserSettingsDto = {
        ...userSettings,
        lang: formik.values.lang,
        darkMode: formik.values.darkMode,
      };
      await updateUserSettings(newSettings);
    }
  };

  return (
    <>
      { loading
            && <Loading />}
      <div className="ProfileSettings_MainContainer">
        <form onChange={formik.handleSubmit}>
          <div className="ProfileSettings_Settings">
            <div className="ProfileSettings_Setting">
              <label className="app_font_m">Dark Mode</label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="darkMode"
                  aria-label="Dark Mode"
                  name="darkMode"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.darkMode}
                />
              </div>
            </div>
            <div className="ProfileSettings_Setting">
              <p className="app_font_m">Language</p>
              <select
                className="form-select"
                id="lang"
                aria-label="Language"
                name="lang"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lang}
              >
                <option value="es">Spanish</option>
                <option value="en">English</option>
                <option value="fr">French</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ProfileSettings;
