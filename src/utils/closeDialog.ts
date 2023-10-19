import { visibility } from "../store/stores";
import { fetchNui } from "../utils/fetchNui";

export const closeDialog = () => {
	visibility.set(false);
	fetchNui("hideUI");
};
