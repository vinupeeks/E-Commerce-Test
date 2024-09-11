import {jwtDecode} from 'jwt-decode';

export const isAdmin = () => {
  const token = localStorage.getItem('Token');
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.isAdmin;
  } catch (e) {
    console.error('Invalid token');
    return false;
  }
};