import './profileInfo.scss';
import { FormikProps, useFormik } from 'formik';
import { User } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../hooks/state/appStateHook';
import { useUser } from '../../../hooks/user/userHook';
import { selectUserData, selectUserName } from '../../../state/user/user.selectors';
import { Loading } from '../loading/loading';

interface ProfileInfoFormModel {
  userEmail: string,
  userName: string,
}

function profileInfo() {
  const userName = useAppSelector<string>(selectUserName);
  const userData = useAppSelector<User | null>(selectUserData);
  const { updateUser, loading } = useUser();
  const { t } = useTranslation();

  const formik: FormikProps<ProfileInfoFormModel> = useFormik<ProfileInfoFormModel>({
    initialValues: {
      userEmail: userData?.email as string,
      userName,
    },
    onSubmit: async () => {
      // await updateSettings();
    },
  });

  return (
    <>
      { loading
            && <Loading />}
      <div className="profileInfo_MainContainer">
        <form onChange={formik.handleSubmit}>
          <div className="profileInfo_Settings">
            <div className="profileInfo_Setting">
              <label htmlFor="userEmail">
                <p className="app_font_l app_font_noMargin">{t('views.profile.info.form.email.label')}</p>
                <div className="form-check form-switch">
                  <input
                    type="text"
                    id="userEmail"
                    name="userEmail"
                    disabled
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.userEmail}
                    className="form-control"
                    placeholder={t('views.profile.info.form.email.placeholder')}
                  />
                </div>
              </label>

            </div>
            <div className="profileInfo_Setting">
              <label htmlFor="userName">
                <p className="app_font_l app_font_noMargin">{t('views.profile.info.form.userName.label')}</p>
                <div className="form-check form-switch">
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    disabled
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.userName}
                    className="form-control"
                    placeholder={t('views.profile.info.form.userName.placeholder')}
                  />
                </div>
              </label>

            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default profileInfo;
