import axios, { AxiosError, type AxiosResponse } from "axios";


export function checkPasswordValidity (password: string) {
  const minLength = 8;

  if (password.length < minLength) {
    return false;
  }

  let numberOfLowerCase = 0;
  let numberOfUpperCase = 0;
  let numberOfDigits = 0;
  let numberOfSymbols = 0;

  numberOfLowerCase = /.*[a-z].*/.test(password) ? ++numberOfLowerCase : numberOfLowerCase;
  numberOfUpperCase = /.*[A-Z].*/.test(password) ? ++numberOfUpperCase : numberOfUpperCase;
  numberOfDigits = /.*[0-9].*/.test(password) ? ++numberOfDigits : numberOfDigits;
  numberOfSymbols = /.*[a-z,A-Z,0-9].*/.test(password) ? ++numberOfSymbols : numberOfSymbols;

  if (!numberOfLowerCase || !numberOfUpperCase || !numberOfDigits || !numberOfSymbols) {
    return false;
  }

  return true;
}


export function checkEmailValidity(email: string) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}


export async function getEntitiesFromDB(_entities: string) {
	try {
		const res = await fetch(`https://localhost:7168/api/${_entities}`);
		if (!res.ok) {			
				console.log(`Error fetching data: ${res.statusText}`);
				return null;
		}
		const entities = await res.json();
		return entities;
	} catch (error) {
			console.error(`Failed to fetch ${_entities}:`, error);
			return null; // Return null if there's an error fetching the data
	}
}


export async function insertElementInDBTable(_tableName: string, _element: any) {
  try {
    console.log(_element);
    const res = await axios.post(`https://localhost:7168/api/${_tableName.toLocaleLowerCase()}`, _element);
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