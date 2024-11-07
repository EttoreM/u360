process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Ignore self-signed certificates in development

import type { Actions, RequestEvent, ActionFailure, Redirect } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import type { RegisterFormData } from '../../types/pages/RegisterFormData';
import { checkPasswordValidity, getEntitiesFromDB, insertElementInDBTable } from '../../utils/utilityFunctions';
import { Sign } from 'node:crypto';
import type { Institution } from '../../types/db/Institution';
import type { EmailDomain } from '../../types/db/EmailDomain';


let data : {institutions: Array<Institution>, emailDomains: Array<EmailDomain>};
// Load the data needed for the page.
export async function load() {
	const institutions = await getEntitiesFromDB('institutions');
  const emailDomains = await getEntitiesFromDB('emaildomains');
  data = {institutions, emailDomains}
	return { 
		...data
	};
}


// define actions
export const actions:Actions = {
  signup: async({request}: RequestEvent): Promise<RegisterFormData | ActionFailure<RegisterFormData> | Redirect> => {
    const signupFormData = await request.formData();
    const firstName   = signupFormData.get('firstName')?.toString()?? '';
    const lastName    = signupFormData.get('lastName')?.toString()?? '';
    const email       = signupFormData.get('email')?.toString()?? '';
    const password    = signupFormData.get('password')?.toString()?? '';
    const institution = Number(signupFormData.get('institution'));

    
    let SignUpResponse: RegisterFormData = {
      weakPassword: false,
      wrongEmailDomain: false,
      error: false,
      success: false,
      message: [],
      user: {
        id: undefined,
        first_name: firstName,
        last_name: lastName,
        email: email,
        hashed_password: password,
        institution: institution,
        role: 1
      }
    }


    // Check whether the password is OK and return fail if it is not. 
    const isPasswordValid = checkPasswordValidity(password.toString())
    if (!isPasswordValid) {
      SignUpResponse.weakPassword = true;
      SignUpResponse.error = true;
      SignUpResponse.message.push(`Password does not meet requirements`);
    }

    // Check whether the email is OK and return fail if it is not.
    let isEmailOK = false; 
    const emailDomains = data.emailDomains.filter(e =>
      e.institution === institution
    );
    emailDomains.forEach(e => {
      let domain = e.domain.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = new RegExp(`^[^@]+@${domain}$`);
      if (pattern.test(email)) {
        isEmailOK = true;
      }
    })
    if (!isEmailOK) {
      SignUpResponse.wrongEmailDomain = true;
      SignUpResponse.error = true;
      SignUpResponse.message.push(`The email entered seems incorrect`);
      SignUpResponse.user.hashed_password = '';
    }

    if (SignUpResponse.error) {
      return fail(400, SignUpResponse);
    }


    let res = await insertElementInDBTable('users', SignUpResponse.user);
    console.log(res);
    if (res.success) {
      throw redirect(303, '/');
    }
    
    SignUpResponse.error = true;
    SignUpResponse.message = [res.message];
    SignUpResponse.user.hashed_password = '';

    return fail(res.status, SignUpResponse);
  }
}