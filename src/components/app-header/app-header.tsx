import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getAuthUser, isAuthorized } from '../../services/slices/authSlice';

export const AppHeader: FC = () => {
  const isAuth = useSelector(isAuthorized);
  const user = useSelector(getAuthUser);

  return <AppHeaderUI userName={isAuth ? user?.name : ''} />;
};
