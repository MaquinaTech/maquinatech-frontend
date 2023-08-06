// pages/auth/Login.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// Styles
import styles from '../../styles/Auth.module.scss';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const [loginError, setLoginError] = useState('');
  const router = useRouter();

  const handleLogin = async (values) => {
    try {
      // Send a POST request to Strapi with the username and password.
      const response = await fetch('http://localhost:1337/auth/local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      // Handle success or error.
      if (data.message) {
        // Handle error.
        setLoginError(data.message[0].messages[0].message);
        return;
      }

      // Save token to local storage.
      localStorage.setItem('token', data.token);

      // Redirect to home page.
      router.push('/');
    } catch (error) {
      // Handle error.
      setLoginError('Invalid username or password provided!');
    }
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
              className={styles.container__input}
              />
            <ErrorMessage name="username" component="div" className={styles.container__error} />
          </div>
          <div className={styles.container__field}>
            <label className={styles.container__label}>Contraseña:</label>
            <Field 
              type="password" 
              name="password" 
              className={styles.container__input}
              />
            <ErrorMessage name="password" component="div" className={styles.container__error} />
          </div>
          {loginError && <div className={styles.container__error}>{loginError}</div>}
          <button type="submit" className={styles.container__button}>Iniciar sesión</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
