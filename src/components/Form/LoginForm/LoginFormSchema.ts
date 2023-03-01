import * as yup from 'yup';

export const loginFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('Este campo é obrigratório')
    .email('O email digitado é inválido'),
  password: yup.string().required('Este campo é obrigratório'),
});
