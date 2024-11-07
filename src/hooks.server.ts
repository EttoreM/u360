import { env } from "$env/dynamic/private";
import jwt from 'jsonwebtoken';
import { User_Store } from "./stores/User_Store";
import { User_Model } from "$models/db/User_Model";

export async function handle({event, resolve}) {
  const authToken = event.cookies.get("authToken");

  try {
    if (!authToken) {
      event.locals.authedUser = undefined;
    }

    const claims = jwt.verify(authToken, env.SECRET_INGREDIENT);

    if (!claims){
      event.locals.authedUser = undefined;
    }

    if(authToken && claims) {
      event.locals.authedUser = claims.authedUser
      User_Store.update(user => {
        user = claims.authedUser
        return user;
      });
    }

  }
  finally {
    const response = await resolve(event);
    return response;
  }
}