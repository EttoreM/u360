// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { UserWithoutPassword } from './types/pages/UserWithoutPassword';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			authedUser : UserWithoutPassword | undefined;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
