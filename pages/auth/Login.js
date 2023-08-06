import React, {useState} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// Styles
import styles from '../../styles/Auth.module.scss';
// Actions
import { login } from '../../redux/actions/authActions';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch(); // Get the dispatch function from Redux
  const loginError = useSelector((state) => state.auth.error); // Get the error from Redux

  const [isActiveUsername, setIsActiveUsername] = useState(false);
  const [isActivePassword, setIsActivePassword] = useState(false);

  // Input focus handlers
  const handleFocus = (field) => {
    if (field === 'username') setIsActiveUsername(true);
    if (field === 'password') setIsActivePassword(true);
  };
  const handleBlur = (field) => {
    if (field === 'username') setIsActiveUsername(false);
    if (field === 'password') setIsActivePassword(false);
  };

  // Call the action from Redux
  const handleLogin = async (values) => {
    dispatch(login(values));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.container__title}>Iniciar sesión</h1>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        <Form>
          <div className={styles.container__field}>
            <label className={styles.container__label}>Nombre de usuario:</label>
            <Field 
              type="text" 
              name="username"
              className={isActiveUsername ? `${styles.container__input__active} ${styles.container__input}` : styles.container__input}
              onFocus={() => handleFocus('username')}
              onBlur={() => handleBlur('username')}
              />
            <ErrorMessage name="username" component="div" className={styles.container__error} />
          </div>
          <div className={styles.container__field}>
            <label className={styles.container__label}>Contraseña:</label>
            <Field 
              type="password" 
              name="password" 
              className={isActivePassword ? `${styles.container__input__active} ${styles.container__input}` : styles.container__input}
              onFocus={() => handleFocus('password')}
              onBlur={() => handleBlur('password')}
              />
            <ErrorMessage name="password" component="div" className={styles.container__error} />
          </div>


          {loginError && <div className={styles.container__error}>{loginError}</div>}
          <button type="submit" className={styles.container__button}>Iniciar sesión</button>

          <div className={styles.container__field__register}>
            <Link href="/auth/register" className={styles.container__link}>
                Crear cuenta
            </Link>
          </div>

        </Form>
      </Formik>
    </div>
  );
};

export default Login;
