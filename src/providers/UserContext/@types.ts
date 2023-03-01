export interface IDefaultProviderProps {
  children: React.ReactNode;
}

export interface IUser {
  email: string;
  password?: string;
  name: string;
  id: number;
}

export interface IRegisterFormValues {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface IResponseUser {
  user: IUser;
  accessToken: string;
}

export interface IDefaultError {
  error: string;
}

export interface IUserContext {
  user: IUser | null;
  userRegister: (formData: IRegisterFormValues) => Promise<void>;
  userLogin: (formData: ILoginFormValues) => Promise<void>;
  userLogOut: () => void;
}
