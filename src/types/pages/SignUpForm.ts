import type { User } from "../db/User"

export type SignUpForm = {
  isFirstNameEmpty: boolean,
  isLastNameEmpty: boolean,
  isEmailDomainWrong: boolean,
  isInstitutionInvalid: boolean,
  isPasswordWeak: boolean,
  error: boolean,
  message: Array<string>,
  user: User,
  [key:string]: any
}