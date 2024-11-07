import { SignUp_Model } from "$models/pages/SingUp_Model";
import type { SignUpForm } from "../../types/pages/SignUpForm";
import { checkPasswordValidity } from '../../utils/utilityFunctions';
import type { User } from "../../types/db/User";
import type { EmailDomain } from "../../types/db/EmailDomain";
import { type Writable, writable } from "svelte/store";
import { get } from "svelte/store";
import { goto } from '$app/navigation';
import axios from "axios";


export class SignUp_ViewModel {

  private _model: Writable<SignUpForm> = writable(SignUp_Model);

  constructor() {};

  PrintOutModel() {
    const model = get(this._model);
    console.log(model);
  }

  get model() {
    return this._model;
  }


  private async _CreateNewUser(_user: User) {
    try {
      console.log(_user);
      const res = await axios.post(`https://localhost:7168/api/auth/signup`, _user);
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


  private _CheckFormFieldsValidity(data: any)
  {
    const user: User = get(this._model).user;

    // Check that the first name has been entered
    if (!user.first_name.trim().length) {
      this._model.update(model => {
        model.isFirstNameEmpty = true;
        model.error = true;
        model.message.push(`You need to enter your first name.`);
        return model;
      })
    }

    // Check that the last name has been entered
    if (!user.last_name.trim().length) {
      this._model.update(model => {
        model.isLastNameEmpty = true;
        model.error = true;
        model.message.push(`You need to enter your last name.`);
        return model;
      })
    }

    // Check whether the email domain correspond to one allowed for the selected affiliation
    const isEmailOK = this._CheckEmailDomain(data, user.email, user.institution);
    if (!isEmailOK) {
      this._model.update(model => {
        model.isEmailDomainWrong = true;
        model.error = true;
        model.message.push(`The email entered seems incorrect`);
        return model;
      })  
    }

    // Check whether the password is strong enough
    if (!user.password) {
      user.password = '';
    }
    const isPasswordValid = checkPasswordValidity(user.password?.toString());
    if (!isPasswordValid) {
      this._model.update(model => {
        model.isPasswordWeak = true;
        model.error = true;
        model.message.push(`Password does not meet requirements`);
        return model;
      });
    }

    // Check whether an institution was selected
    if (!user.institution) {
      this._model.update(model => {
        model.isInstitutionInvalid = true;
        model.error = true;
        model.message.push(`You need to specify the institution to which you are affiliated.`);
        return model;
      });
    }
  }


  // Check if the email entered by the user ends with any of the 
  // domains corresponding to the selected institution
  _CheckEmailDomain(_data: any, _email: string, _institution: number) {
    let isEmailOK = false; 
    const emailDomains = _data.emailDomains.filter((e: EmailDomain) =>
      e.institution === _institution
    );
    emailDomains.forEach((e: EmailDomain) => {
      let domain = e.domain.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = new RegExp(`^[^@]+@${domain}$`);
      if (pattern.test(_email)) {
        isEmailOK = true;
      }
    })
    return isEmailOK;
  }

  // #endregion


  // #reion Public Methods
  async RegisterUser(data: any) {

    this._ResetFormStatus();
    this._CheckFormFieldsValidity(data);

    const model = get(this._model);
    const user: User = model.user;

    if (!model.error) {
      console.log(`All fields OK`);
      let res = await this._CreateNewUser(user);
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
