// src/stores/userStore.ts
import { writable } from 'svelte/store';
import type { UserWithoutPassword } from '../types/pages/UserWithoutPassword';

// Create the store with a default value or initial state
export const User_Store = writable<UserWithoutPassword | undefined>(undefined);