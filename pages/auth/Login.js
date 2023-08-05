// pages/auth/Login.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const [loginError, setLoginError] = useState('');
  const router = useRouter();

  const handleLogin = async (values) => {
    try {
      // Aquí realizarías la solicitud de inicio de sesión al backend para verificar las credenciales.
      // Por simplicidad, en este ejemplo, asumimos que el inicio de sesión es exitoso y se almacena un token en el almacenamiento local (localStorage).
      const fakeToken = 'fakeToken123'; // Esto es solo un ejemplo. En una implementación real, deberías obtener el token del backend.
      localStorage.setItem('token', fakeToken);

      // Redirigir al usuario a la página principal después del inicio de sesión exitoso.
      router.push('/');
    } catch (error) {
      // Manejo de errores en caso de que la solicitud falle o las credenciales sean inválidas.
      setLoginError('Invalid username or password');
    }
  };

  return (
    <div>
      <h1>Iniciar sesión</h1>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        <Form>
          <div>
            <label>Nombre de usuario:</label>
            <Field type="text" name="username" />
            <ErrorMessage name="username" component="div" className="error" />
          </div>
          <div>
            <label>Contraseña:</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          {loginError && <div className="error">{loginError}</div>}
          <button type="submit">Iniciar sesión</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
