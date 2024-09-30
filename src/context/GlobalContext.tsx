"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Locale } from "../types/locale";
import { DEFAULT_LOCALE } from "../libs/constants";
import { ArticleEssencial } from "../types/article-essencial";

export type GlobalContextType = {
  preferencesOpen: boolean;
  locale: Locale;
  searchResults: ArticleEssencial[];
  loadingSearchResults?: boolean;
  togglePreferences: () => void;
  setLocale: (locale: Locale) => void;
  setSearchResults: (results: ArticleEssencial[]) => void;
  setLoadingSearchResults: (loading: boolean) => void;
};

const defaultGlobalContextValues: GlobalContextType = {
  preferencesOpen: false,
  locale: DEFAULT_LOCALE,
  searchResults: [],
  loadingSearchResults: false,
  togglePreferences: () => {},
  setLocale: () => {},
  setSearchResults: () => {},
  setLoadingSearchResults: () => {},
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
  const [searchResults, setSearchResults] = useState<ArticleEssencial[]>([]);
  const [loadingSearchResults, setLoadingSearchResults] = useState(false);

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
        searchResults,
        loadingSearchResults,
        togglePreferences,
        setLocale,
        setSearchResults,
        setLoadingSearchResults,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
