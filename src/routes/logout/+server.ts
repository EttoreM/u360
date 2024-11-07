import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET = async ({ cookies, locals }) => {
  // Perform the same logout actions
  console.log(`Logging out (GET)...`);
  cookies.delete('authToken', { path: '/' });
  locals.authedUser = undefined;
  throw redirect(303, '/login');
};

// Keep the existing POST handler
export const POST = async ({ cookies, locals }) => {
   // Perform the same logout actions
   console.log(`Logging out (POST)...`);
   cookies.delete('authToken', { path: '/' });
   locals.authedUser = undefined;
   throw redirect(303, '/login');
};