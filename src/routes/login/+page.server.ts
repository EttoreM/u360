process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Ignore self-signed certificates in development

import type { Actions, RequestEvent, ActionFailure, Redirect } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import type { LoginForm } from '../../types/pages/LoginForm';
import { checkEmailValidity } from '../../utils/utilityFunctions';
import { env } from '$env/dynamic/private';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { User_Store } from '../../stores/User_Store';


export async function load({cookies}) {
  const authToken = cookies.get('authToken');
  if (!authToken) return {clearUser: true};
  return {clearUser: false};
}


// define actions
export const actions:Actions = {
  default: async({cookies, request}: RequestEvent): Promise<LoginForm | ActionFailure<LoginForm> | Redirect> => {
    const loginFormData = await request.formData();
    const email    = loginFormData.get('email')?.toString()?? '';
    const password = loginFormData.get('password')?.toString()?? '';
    
    // Initialise response of login request
    let LoginResponse: LoginForm = {
      isEmailInvalid: false,
      isPasswordEmpty: false,
      error: false,
      success: false,
      message: [],
      credentials: {
        email: email,
        password: password,
      }
    }

    // Check if password was left empty and change login response accordingly. 
    const isPasswordEmpty = password?.toString().trim() !== '';
    if (!isPasswordEmpty) {
      LoginResponse.isPasswordEmpty = true;
      LoginResponse.error = true;
      LoginResponse.message.push(`Please enter your password`);
    }

    // Check if email is valid and change login response accordingly.
    let isEmailOK = checkEmailValidity(email); 
    if (!isEmailOK) {
      LoginResponse.isEmailInvalid = true;
      LoginResponse.error = true;
      LoginResponse.message.push(`Please enter a valid email address`);
    }

    // Return fail if password is empty and/or email is invalid.
    if (LoginResponse.error) {
      return fail(400, LoginResponse);
    }

    let res = await AttemptUserLogin(LoginResponse.credentials);
    if (res.success) {
      const { password, ...userWithoutPassword } = res.data; 
      const authToken = jwt.sign({authedUser: userWithoutPassword}, env.SECRET_INGREDIENT, {expiresIn: '24h'});
      cookies.set('authToken', authToken, {path: '/', httpOnly: true, maxAge: 60*60*24, sameSite: 'strict'});
      User_Store.update(user => {
        user = userWithoutPassword;
        return user;
      })
      console.log(userWithoutPassword);
      throw redirect(303, '/your_account');
    }
    else {
      LoginResponse.error = true;
      LoginResponse.message = res.message;
      return fail(res.status, LoginResponse);
    }

  }
}


async function AttemptUserLogin(_loginData: {email: string, password: string}) {
  try {
    const res = await axios.post(`https://localhost:7168/api/auth/login`, _loginData);
    return {
      success: true,
      data: res.data,
      error: false,
      status: res.status,
      message: [res.statusText]
    };  
  }

  catch (error : any) {

    // Error due to business login
    if (error.response) {
      let message: Array<string> = [];
      Object.keys(error.response.data.errors).forEach(key => {   
        message.push(error.response.data.errors[key]);
      });
      
      return {
        success: false,
        data: null,
        error: true,
        status: error.code,
        message: message
      };
    }

    // Error due to network (e.g., server is unreachable)
    else {
      return {
        success: false,
        data: null,
        error: true,
        status: 503,
        message: [`Network error: ${error.code}`],
      };
    }
  }
}