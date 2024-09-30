import { useEffect, useState } from "react";
import { fetchAvailableLocales } from "../services/locale.service";
import { STORE_AVAILABLE_LOCALES_KEY } from "../libs/constants";
import { Locale } from "../types/locale";
import { useGlobalContext } from "../context/GlobalContext";

export default function useLocale() {
  const { locale, setLocale } = useGlobalContext();
  const [availableLanguages, setAvailableLanguages] = useState<Locale[]>();

  useEffect(() => {
    async function fetchData() {
      const availableLocales = await fetchAvailableLocales();
      if (!availableLocales) return;
      setAvailableLanguages(availableLocales);
      localStorage.setItem(
        STORE_AVAILABLE_LOCALES_KEY,
        JSON.stringify(availableLocales)
      );
    }
    const locales = localStorage.getItem(STORE_AVAILABLE_LOCALES_KEY);
    if (!locales) fetchData();
    else setAvailableLanguages(JSON.parse(locales));
  }, []);

  const changeLocale = (locale: Locale) => {
    const selectedLocale = availableLanguages?.find(
      (l) => l.code === locale.code
    );
    if (!selectedLocale) return;
    setLocale(selectedLocale);
  };

  return { locale, availableLanguages, changeLocale };
}
