import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerFormSchema } from './RegisterFormSchema';
import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import { UserContext } from '../../../providers/UserContext/UserContext';
import { IRegisterFormValues } from '../../../providers/UserContext/@types';

const RegisterForm = () => {
  const { userRegister } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRegisterFormValues>({
    resolver: yupResolver(registerFormSchema),
  });

  const submit: SubmitHandler<IRegisterFormValues> = (formData) => {
    userRegister(formData);
    reset();
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        type='text'
        label='Nome'
        placeholder='Digite seu nome'
        register={register('name')}
        error={errors.name}
      />
      <Input
        type='email'
        label='Email'
        placeholder='Digite seu email'
        register={register('email')}
        error={errors.email}
      />
      <Input
        type='password'
        label='Senha'
        placeholder='Digite sua senha'
        register={register('password')}
        error={errors.password}
      />
      <Input
        type='password'
        label='Confirme sua senha'
        placeholder='Confirme sua senha'
        register={register('confirmPassword')}
        error={errors.confirmPassword}
      />
      <StyledButton type='submit' $buttonSize='default' $buttonStyle='gray'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
