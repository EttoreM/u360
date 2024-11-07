import type { User } from "../db/User"

export interface RegisterFormData {
  weakPassword: boolean,
  wrongEmailDomain: boolean,
  error: boolean,
  message: Array<string>,
  user: User,
  [key:string]: any
}