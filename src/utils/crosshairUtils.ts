export function saveCrosshairSettings(crosshairSettings: any) {
	localStorage.setItem("crosshairSettings", JSON.stringify(crosshairSettings));
	console.log("Crosshair settings saved to LocalStorage:", crosshairSettings);
}

export function loadCrosshairSettings(): any {
	const savedSettings = localStorage.getItem("crosshairSettings");
	return savedSettings ? JSON.parse(savedSettings) : null;
}

export function exportCrosshair(properties: any): string {
	const jsonString = JSON.stringify(properties);
	return btoa(jsonString);
}

export function importCrosshair(encodedString: string): any {
	const jsonString = atob(encodedString);
	return JSON.parse(jsonString);
}
