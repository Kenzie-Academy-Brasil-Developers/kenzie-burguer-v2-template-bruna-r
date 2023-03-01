import { createContext, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  IDefaultError,
  IDefaultProviderProps,
  ILoginFormValues,
  IRegisterFormValues,
  IResponseUser,
  IUser,
  IUserContext,
} from './@types';
import { api } from '../../services/api';

export const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserProvider = ({ children }: IDefaultProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  const userRegister = async (formData: IRegisterFormValues) => {
    try {
      const response = await api.post<IResponseUser>('/users', formData);
      setUser(response.data.user);
      localStorage.setItem('@TOKEN', response.data.accessToken);
      localStorage.setItem('@USERID', response.data.user.id);
      toast.success('cadastro realizado com sucesso!');
      navigate('/shop');
    } catch (error) {
      const currentError = error as AxiosError<IDefaultError>;
      toast.error(currentError.response?.data.error);
    }
  };

  const userLogin = async (formData: ILoginFormValues) => {
    try {
      const response = await api.post<IResponseUser>('/login', formData);
      setUser(response.data.user);
      localStorage.setItem('@TOKEN', response.data.accessToken);
      localStorage.setItem('@USERID', response.data.user.id);
      toast.success('Login realizado com sucesso!');
      navigate('/shop');
    } catch (error) {
      const currentError = error as AxiosError<IDefaultError>;
      toast.error(currentError.response?.data.error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('@TOKEN');
    const userId = localStorage.getItem('@USERID');
    if (token) {
      const autoLogin = async () => {
        try {
          const response = await api.get<IUser>(`/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
          navigate('/shop');
        } catch (error) {
          const currentError = error as AxiosError<IDefaultError>;
          toast.error(currentError.response?.data.error);
          localStorage.removeItem('@TOKEN');
          localStorage.removeItem('@USERID');
        }
      };
      autoLogin();
    }
  }, []);

  const userLogOut = () => {
    setUser(null);
    localStorage.removeItem('@TOKEN');
    localStorage.removeItem('@USERID');
    navigate('/');
  };

  return (
    <UserContext.Provider value={{ user, userRegister, userLogin, userLogOut }}>
      {children}
    </UserContext.Provider>
  );
};
