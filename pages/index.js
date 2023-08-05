// pages/Index.js

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Index = () => {
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
      {/* Content of the Index page */}
      {isAuthenticated && <h1>Welcome to the protected Index page</h1>}
    </div>
  );
};

// Your authentication check logic function.
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
    props: {}, // Will be passed to the page component as props
  };
}

export default Index;
