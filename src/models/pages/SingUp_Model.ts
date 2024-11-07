import type { SignUpForm } from '../../types/pages/SignUpForm';


export let SignUp_Model : SignUpForm = {
  isFirstNameEmpty: false,
  isLastNameEmpty: false,
  isInstitutionInvalid: false,
  isPasswordWeak: false,
  isEmailDomainWrong : false,
  error : false,
  success : false,
  message : [],
  user : {
    id: undefined,
    first_name: '',
    last_name: '',
    email: '',
    hashed_password: '',
    institution: 0,
    role: 1
  }
}