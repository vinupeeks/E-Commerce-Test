import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('Token');
  let isAdmin = false;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      isAdmin = decodedToken.isAdmin;
    } catch (error) {
      console.error('Error decoding token', error);
    }
  }

  return isAdmin ? element : <Navigate to="/login" />;
};

export default PrivateRoute;