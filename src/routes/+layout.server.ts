export function load({ locals }) {
  return {
    user: locals.authedUser
  };
}  