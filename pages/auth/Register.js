import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/ui/Input';
// Styles
import styles from '../../styles/Auth.module.scss';
// Actions
import { register } from '../../redux/actions/authActions';

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Register = () => {
  const dispatch = useDispatch();
  const registerError = useSelector((state) => state.auth.error);

  const handleRegister = async (values) => {
    dispatch(register(values));
  };

  return (
    <div className={styles.wrap}>
      {/* ... (your info section) ... */}

      <div className={styles.login}>
        <h1 className={styles.login__title}>Crear cuenta</h1>
        <Formik
          initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={RegisterSchema}
          onSubmit={handleRegister}
        >
          <Form>
            <Input labelText="Nombre de usuario" type="text" name="username" />
            <Input labelText="Correo electrónico" type="email" name="email" />
            <Input labelText="Contraseña" type="password" name="password" />
            <Input labelText="Confirmar contraseña" type="password" name="confirmPassword" />

            {registerError && <div className={styles.login__error}>{registerError}</div>}
            <button type="submit" className={styles.login__button}>
              Crear cuenta
            </button>

            <div className={styles.login__field__register}>
              <Link href="/auth/login" className={styles.login__link}>
                Iniciar sesión
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;
