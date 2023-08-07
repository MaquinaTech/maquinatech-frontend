import React, {useState} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/ui/Input';
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

  /*const [isActiveUsername, setIsActiveUsername] = useState(false);
  const [isActivePassword, setIsActivePassword] = useState(false);

  // Input focus handlers
  const handleFocus = (field) => {
    if (field === 'username') setIsActiveUsername(true);
    if (field === 'password') setIsActivePassword(true);
  };
  const handleBlur = (field) => {
    if (field === 'username') setIsActiveUsername(false);
    if (field === 'password') setIsActivePassword(false);
  };*/

  // Call the action from Redux
  const handleLogin = async (values) => {
    dispatch(login(values));
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.info}>
        <div className={styles.info__title}>
          Master Project
        </div>
        <div className={styles.info__text}>
          <div className={styles.info__text__desc}>
            <p>Master Project es una aplicación web donde muestro mis habilidades de programación</p>
            <p>Este proyecto ha sido desarrollado por MaquinaTech</p>
            <p>Para poder utilizar la aplicación, es necesario crear una cuenta.</p>
          </div>

          <div className={styles.info__text__profile}>
            <p>
              <span className={styles.bold}>GitHub: </span>
              <span className={styles.medium}>
                <Link href="https://github.com/MaquinaTech" target='_blank'>
                <img src="/gitHub.png" alt="gitHub" className={styles.info__text__profile__git}/>
                </Link>
              </span>
            </p>
          </div>    
        </div>
      </div>

      
      <div className={styles.login}>
        <h1 className={styles.login__title}>Iniciar sesión</h1>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          <Form>

            <Input 
              labelText="Nombre de usuario"
              type="text"
              name="username"
            />

            <Input 
              labelText="Contraseña"
              type="password"
              name="password"
            />

            {loginError && <div className={styles.login__error}>{loginError}</div>}
            <button type="submit" className={styles.login__button}>Iniciar sesión</button>

            <div className={styles.login__field__register}>
              <Link href="/auth/register" className={styles.login__link}>
                  Crear cuenta
              </Link>
            </div>

          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
