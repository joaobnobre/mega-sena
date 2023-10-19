import { writable } from "svelte/store";

export let visibility = writable(false);
export let crosshairColor = writable("");
export let crosshairLength = writable(0);
export let crosshairThickness = writable(0);
export let crosshairGap = writable(0);
export let crosshairOutlineThickness = writable(0);
export let crosshairOutlineAlpha = writable(0);
export let crosshairOutline = writable(false);
