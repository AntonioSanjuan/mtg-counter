import './SignUp.scss';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { FormikProps, useFormik } from 'formik';
import ColoredLogo from '../../assets/ColoredLogo.png';
import { useAuth } from '../../hooks/auth/authHook';
import { Loading } from '../../components/common/loading/loading';

interface SignUpPageFormModel {
  userEmail: string,
  userName: string,
  password: string
}

function SignUpPage() {
  const {
    loginWithGoogle, signUp, loading, error: authError,
  } = useAuth();
  const navigate = useNavigate();

  const formik: FormikProps<SignUpPageFormModel> = useFormik<SignUpPageFormModel>({
    initialValues: {
      userEmail: '',
      userName: '',
      password: '',
    },
    validationSchema: Yup.object({
      userEmail: Yup.string().required().email(),
      userName: Yup.string().required(),
      password: Yup.string().required(),
    }),
    onSubmit: (values, { resetForm }) => {
      resetForm();
      handleSubmit().then(() => {
        // navigate('/');
      });
    },
  });

  const handleSignUpWithGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      await formik.validateForm();
      await signUp({
        userEmail: formik.values.userEmail,
        userName: formik.values.userName,
        userPassword: formik.values.password,
      });
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      { loading
      && <Loading />}
      <div className="SignUp_MainContainer">
        <div className="SignUp_CardContainer">
          <div className="SignUp_Logo">
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
              <label htmlFor="userName">
                Username
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userName}
                  className="form-control"
                  placeholder="user name"
                />
              </label>
              {
              formik.touched.userName && formik.errors.userName
                  && <span className="app_font_error">{formik.errors.userName}</span>
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
            <div className="SignUp_ActionContainer">
              <button
                disabled={!formik.dirty || !formik.isValid}
                className="btn btn-secondary w-100"
                type="submit"
                name="Sign Up"
              >
                Sign Up
              </button>

              <button
                className="btn btn-dark w-100"
                type="button"
                onClick={handleSignUpWithGoogle}
              >
                <img
                  width="20px"
                  alt="Google sign-in"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                />
                Sign up with Google
              </button>
              <Link to="/login">
                <button
                  className="btn btn-link w-100"
                  type="button"
                >
                  ¿Ya tienes cuenta? Inicia sesion aqui.
                </button>
              </Link>
            </div>
          </form>
          {
          authError
          && (
          <div className="SignUp_ErrorContainer">
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

export default SignUpPage;
