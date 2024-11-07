import { redirect } from '@sveltejs/kit';

export const actions = {
  logout: async ({ cookies, locals }) => {
    console.log(`logging out...`);
    // Delete the authentication token cookie
    cookies.delete('authToken', { path: '/' });

    // Clear the server-side authenticated user
    locals.authedUser = undefined;

    // Optionally, redirect to the login page or homepage
    throw redirect(303, '/login');
  },
};