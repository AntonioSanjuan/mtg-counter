import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { FormikProps, useFormik } from 'formik';
import ColoredLogo from '../../assets/ColoredLogo.png';
import { useAuth } from '../../hooks/auth/authHook';
import { Loading } from '../../components/common/loading/loading';

interface LoginFormModel {
  userEmail: string,
  password: string
}

function LoginPage() {
  const {
    login, loginWithGoogle, loading, error,
  } = useAuth();
  const navigate = useNavigate();

  const formik: FormikProps<LoginFormModel> = useFormik<LoginFormModel>({
    initialValues: {
      userEmail: '',
      password: '',
    },
    validationSchema: Yup.object({
      userEmail: Yup.string().required().email(),
      password: Yup.string().required(),
    }),
    onSubmit: (values, { resetForm }) => {
      resetForm();
      handleSubmit(values).then(() => {
        navigate('/');
      });
    },
  });

  const handleSubmit = async (form: LoginFormModel) => login(
    { userEmail: form.userEmail, userPassword: form.password },
  );

  const handleLoginWithGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      { loading
      && <Loading />}
      <div className="Login_MainContainer">
        <div className="Login_CardContainer">
          <div className="Login_Logo">
            <img src={ColoredLogo} alt="logo" />
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-floating">

              <label htmlFor="userEmail">
                Email
                <input
                  type="email"
                  id="userEmail"
                  name="userEmail"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userEmail}
                  className="form-control"
                  placeholder="email@example.com"
                />
              </label>
              {
              formik.touched.userEmail && formik.errors.userEmail
                  && <span className="app_font_error">{formik.errors.userEmail}</span>
            }
            </div>

            <div className="form-floating">
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="form-control"
                  placeholder="****"
                />
              </label>
              {
              formik.touched.password && formik.errors.password
              && <span className="app_font_error">{formik.errors.password}</span>
            }
            </div>
            <div className="Login_ActionContainer">
              <button
                disabled={!formik.dirty || !formik.isValid}
                className="btn btn-primary w-100"
                type="submit"
              >
                Login
              </button>

              <button
                className="btn btn-dark w-100"
                type="button"
                onClick={handleLoginWithGoogle}
              >
                <img
                  width="20px"
                  alt="Google sign-in"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                />
                Login with Google
              </button>

              <Link to="/signUp">
                <button
                  className="btn btn-link w-100"
                  type="button"
                >
                  ¿No tienes cuenta? Regístrate aqui.
                </button>
              </Link>

            </div>
          </form>
          {
          error
          && (
          <div className="Login_ErrorContainer">
            <p className="app_font_error">
              Error!, try it again
            </p>
          </div>
          )
        }

        </div>
      </div>
    </>
  );
}

export default LoginPage;
