import { writable } from 'svelte/store';

function userStore() {
	const { subscribe, set } = writable<User>();

	return {
		subscribe,
		set
	};
}

export const userS = userStore();
