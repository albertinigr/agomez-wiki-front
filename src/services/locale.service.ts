import { AVAILABLE_LANGUAGES } from "./endpoints";

const fetchAvailableLocales = async () => {
  return fetch(AVAILABLE_LANGUAGES).then((response) => response.json());
};

export { fetchAvailableLocales };
