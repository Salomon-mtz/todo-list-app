import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Higher-Order Component (HOC) to add authentication logic to a component
export default function withAuth(Component) {
  return (props) => {
    const router = useRouter(); // Access the Next.js router

    useEffect(() => {
      // Check if the token is present in localStorage
      const token = localStorage.getItem('token');
      
      // If no token is found, redirect the user to the login page
      if (!token) {
        router.push('/login');
      }
    }, []); // Empty dependency array ensures this effect runs only once on mount

    // Render the wrapped component with the original props
    return <Component {...props} />;
  };
}
