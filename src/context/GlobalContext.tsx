"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Locale } from "../types/locale";
import { DEFAULT_LOCALE } from "../libs/constants";

export type GlobalContextType = {
  preferencesOpen: boolean;
  locale: Locale;
  togglePreferences: () => void;
  setLocale: (locale: Locale) => void;
};

const defaultGlobalContextValues: GlobalContextType = {
  preferencesOpen: false,
  locale: DEFAULT_LOCALE,
  togglePreferences: () => {},
  setLocale: () => {},
};

const GlobalContext = createContext<GlobalContextType>(
  defaultGlobalContextValues
);

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchParams] = useSearchParams();
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

  const togglePreferences = () => setPreferencesOpen(!preferencesOpen);

  useEffect(() => {
    if (searchParams.get("openPreferences")) {
      setPreferencesOpen(true);
    }
    return () => {};
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        preferencesOpen,
        locale,
        togglePreferences,
        setLocale,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
