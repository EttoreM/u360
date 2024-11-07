import type { User } from "../db/User"

export type LoginForm = {
  isEmailInvalid: boolean,
  isPasswordEmpty: boolean,
  error: boolean,
  message: Array<string>,
  credentials: {
    email: string,
    password: string
  }
  [key:string]: any
}