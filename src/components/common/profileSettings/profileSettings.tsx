import './profileSettings.scss';
import { FormikProps, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useAppSelector } from '../../../hooks/state/appStateHook';
import { useUser } from '../../../hooks/user/userHook';
import { FirebaseUserSettingsDto } from '../../../models/dtos/firebaseStore/firebaseUser.model';
import { selectUserName, selectUserSettings } from '../../../state/user/user.selectors';
import { Loading } from '../loading/loading';

function ProfileSettings() {
  const userSettings = useAppSelector<FirebaseUserSettingsDto | undefined>(selectUserSettings);
  const userName = useAppSelector<string>(selectUserName);
  const { updateUser, loading } = useUser();
  const { t } = useTranslation();

  const formik: FormikProps<FirebaseUserSettingsDto> = useFormik<FirebaseUserSettingsDto>({
    initialValues: userSettings as FirebaseUserSettingsDto,
    validateOnChange: true,
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
      await updateUser(newSettings, userName);
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
              <p className="app_font_l">{t('views.profile.settings.form.darkMode.label')}</p>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="darkMode"
                  aria-label="Dark Mode"
                  name="darkMode"
                  onChange={(e) => {
                    formik.handleChange(e);
                    e.preventDefault();
                  }}
                  onBlur={formik.handleBlur}
                  checked={formik?.values?.darkMode ?? false}
                  // defaultChecked={formik?.values?.darkMode ?? false}
                />
              </div>
            </div>
            <div className="ProfileSettings_Setting">
              <p className="app_font_l">{t('views.profile.settings.form.language.label')}</p>
              <select
                className="form-select"
                id="lang"
                aria-label="Language"
                name="lang"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lang}
              >
                <option value="es">{t('views.profile.settings.form.language.options.es')}</option>
                <option value="en">{t('views.profile.settings.form.language.options.en')}</option>
                <option value="fr">{t('views.profile.settings.form.language.options.fr')}</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ProfileSettings;
