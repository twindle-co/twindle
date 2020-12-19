import { writable } from 'svelte/store';

/** @type {import("svelte/store").Writable<{[key:number]: HTMLDivElement}>} */
export const listElStore = writable({});
