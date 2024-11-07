import type { LoginForm } from '../../types/pages/LoginForm';


export let Login_Model : LoginForm = {
  isEmailInvalid : false,
  isPasswordEmpty: false,
  error : false,
  success : false,
  message : [],
  credentials : {
    email: '',
    password: ''
  }
}