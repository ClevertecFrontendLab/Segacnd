import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface IProtectionRoute {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: IProtectionRoute) => {
  const token = Cookies.get('jwt');

  if (!token) {
    return <Navigate to='/auth' replace={true} />;
  }

  return children;
};
