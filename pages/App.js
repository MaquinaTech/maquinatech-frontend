import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// Redux
import { useSelector } from 'react-redux';

const App = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status when the component mounts on the client-side.
    const isAuthenticated = checkAuthentication();
    setIsAuthenticated(isAuthenticated);

    if (!isAuthenticated) {
      router.replace('/auth/Login');
    }
  }, [router]);

  return (
    <div>
      {/* Content of the App page */}
      {isAuthenticated && <h1>Welcome to the protected App page</h1>}
    </div>
  );
};

// This function checks if the user is authenticated.
function checkAuthentication() {
  // When running on the client-side (in the browser), we can access localStorage.
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    return !!token; // Return true if the user is logged in, false otherwise.
  }
  return false;
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default App;
