import * as yup from 'yup';

export const registerFormSchema = yup.object().shape({
  name: yup.string().required('Este campo é obrigratório'),
  email: yup
    .string()
    .required('Este campo é obrigratório')
    .email('O email digitado é inválido'),
  password: yup
    .string()
    .required('Este campo é obrigratório')
    .min(6, 'A senha precisa ter pelo menos 6 caracteres'),
  confirmPassword: yup
    .string()
    .required('Este campo é obrigratório')
    .oneOf([yup.ref('password')], 'A senha precisa ser igual'),
});
