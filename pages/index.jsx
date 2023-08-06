import React from 'react';
import { Provider, useSelector } from 'react-redux';
import store from '../redux/store';
import Login from './auth/Login';
import Home from './../components/Home';

const App = () => {
  const AppContent = () => {
    // Authenticated user from Redux
    const isAuthenticated = useSelector((state) => state.auth.user !== null);

    return (
      // Conditional rendering based on isAuthenticated
      <>{isAuthenticated ? <Home /> : <Login />}</>
    );
  };

  return (
    <Provider store={store}>
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
