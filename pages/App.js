import React from 'react';
import { useRouter } from 'next/router';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';

const AppContent = () => {
  const router = useRouter();
  const isAuthenticated = useSelector(state => state.auth.user !== null);

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    router.replace('/auth/Login');
    return null;
  }

  return (
    <div>
      <h1>Welcome to the protected App page</h1>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}> {/* Agregamos el componente Provider */}
      <AppContent />
    </Provider>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default App;
