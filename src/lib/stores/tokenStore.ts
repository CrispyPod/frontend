import { goto } from "$app/navigation";
import { writable } from "svelte/store";

function tokenStore() {
    const storageKeyName = 'token';
    const isBrowser = typeof window != 'undefined';

    let initValue = null;
    if (isBrowser) {
        initValue = localStorage.getItem(storageKeyName);
    }

    const { subscribe, set } = writable(initValue);

    subscribe((v) => {

        if (isBrowser) {
            if (v != null) {
                localStorage.setItem(storageKeyName, v);
            } else {
                localStorage.removeItem(storageKeyName);
                goto('/admin/signin');
            }
        }
    });

    return {
        subscribe,
        set,
    };
}

export const token = tokenStore();