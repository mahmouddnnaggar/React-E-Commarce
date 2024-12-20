import { Navigate } from 'react-router-dom';
import { UserContext } from '../../context/User.context';
import { useContext } from 'react';

export default function ProtectedRoute({ children }) {
  const { token } = useContext(UserContext);

  if (token) return children;
  return <Navigate to={'/login'} />;
}
