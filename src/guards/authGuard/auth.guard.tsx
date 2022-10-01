import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/state/appStateHook';
import { selectUserIsLogged } from '../../state/user/user.selectors';

export function AuthRouteGuard({ children }: {children: any}) {
  const userIsLogged = useAppSelector<boolean>(selectUserIsLogged);
  return userIsLogged ? children : <Navigate to="/" />;
}
