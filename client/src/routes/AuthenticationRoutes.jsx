import MinimalLayout from 'layout/MinimalLayout';
import RegisterForm from 'views/pages/auth/Register';
import AccessDenied from 'views/403';
import LoginForm from 'views/pages/auth/Login';

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <LoginForm />
    },
    {
      path: '/403',
      element: <AccessDenied />
    }
  ]
};

export default AuthenticationRoutes;
