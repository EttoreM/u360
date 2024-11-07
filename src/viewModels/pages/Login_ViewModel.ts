import { Login_Model } from "$models/pages/Login_Model";
import type { LoginForm } from "../../types/pages/LoginForm";
import { type Writable, writable } from "svelte/store";
import { get } from "svelte/store";
import { goto } from '$app/navigation';
import axios from "axios";
// import { SECRET_INGREDIENT } from '$env/static/private';
// import jwt from 'jsonwebtoken';
 
  
export class Login_ViewModel {

  private _model: Writable<LoginForm> = writable(Login_Model);

  constructor() {};

  get model() {
    return this._model;
  }

  private async _LogUserIn(_loginData: {email: string, password: string}) {
    try {
      console.log(_loginData);
      const res = await axios.post(`https://localhost:7168/api/auth/login`, _loginData);
      // const { password, ...userWithoutPassword } = res.data;
      // const authToken = jwt.sign({authedUser: userWithoutPassword}, SECRET_INGREDIENT, {expiresIn: '24h'});
      // cookies.set('authToken', authToken, {httpOnly: true, maxAge: 60*60*24*1000, sameSite: 'strict'});
      return {
        success: true,
        data: res.data,
        error: false,
        status: res.status,
        message: res.statusText
      };
      
    }
    catch (error : any) {
  
      if (error.response) {
        let message = '';
        if (typeof(error.response.data.errors) == 'object'){
          Object.keys(error.response.data.errors).forEach(key => {   
            message += `${error.response.data.errors[key]}\n`;
          });
        }
        else {
          message = error.response.data.errors;
        }
        
        return {
          success: false,
          data: null,
          error: true,
          status: error.code,
          message: message
        };
      }
      else {
        // Network error (e.g., server is unreachable)
        return {
          success: false,
          data: null,
          error: true,
          status: 503,
          message: `Network error: ${error.code}`,
        };
      }
    }
  }

  // #region Private Methods

  private _ResetFormStatus() 
  {
    this._model.update(model => {
      model.error = false;
      model.message = [];
      model.isFirstNameEmpty = false;
      model.isLastNameEmpty = false;
      model.isEmailDomainWrong = false;
      model.isInstitutionInvalid = false;
      model.isPasswordWeak = false;
      return model;
    })
  }


  private _CheckFormFieldsValidity()
  {
    const model = get(this._model);

    // Check whether a valid email address has been provided.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(model.credentials.email)) {
      this._model.update(model => {
        model.isEmailInvalid = true;
        model.error = true;
        model.message.push(`Enter a valid email address`);
        return model;
      })  
    }

    // Check whether a password has been provided
    if (model.credentials.password === '') {
      this._model.update(model => {
        model.isPasswordEmpty = true;
        model.error = true;
        model.message.push(`Enter your password`);
        return model;
      });
    }
  }

  // #endregion


  // #reion Public Methods
  async LoginUser() {

    this._ResetFormStatus();
    this._CheckFormFieldsValidity();

    const model = get(this._model);
    const loginData = model.credentials;

    if (!model.error) {
      let res = await this._LogUserIn(loginData);
      if (res.success) {
        goto('/');
      }
      else {
        this._model.update(model => {
          model.error = true;
          model.message = [res.message];
          model.isEmailDomainWrong = true;
          return model;
        })
      }
    }
  }

  // #endregion

}
