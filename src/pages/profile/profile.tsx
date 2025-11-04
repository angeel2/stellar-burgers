import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { Preloader } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  getAuthUser,
  updateUser,
  getAuthLoading
} from '../../services/slices/authSlice';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getAuthUser);
  const isLoading = useSelector(getAuthLoading);

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError('');

    if (isFormChanged) {
      try {
        await dispatch(
          updateUser({
            name: formValue.name,
            email: formValue.email,
            password: formValue.password || undefined
          })
        ).unwrap();

        setFormValue((prev) => ({ ...prev, password: '' }));
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Ошибка обновления профиля';
        setError(errorMessage);
      }
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();

    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      updateUserError={error}
    />
  );
};
