"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Locale } from "../types/locale";
import { DEFAULT_LOCALE } from "../libs/constants";
import { ArticleEssencial } from "../types/article-essencial";
import { PaginatedResource } from "../types/paginated-resource";

const DEFAULT_PAGINATED_RESOURCE: PaginatedResource<ArticleEssencial> = {
  items: [],
  totalItems: 0,
  page: 0,
  size: 5,
};

export type GlobalContextType = {
  preferencesOpen: boolean;
  locale: Locale;
  searchResults: PaginatedResource<ArticleEssencial>;
  loadingSearchResults?: boolean;
  togglePreferences: () => void;
  setLocale: (locale: Locale) => void;
  setSearchResults: (results: PaginatedResource<ArticleEssencial>) => void;
  setLoadingSearchResults: (loading: boolean) => void;
};

const defaultGlobalContextValues: GlobalContextType = {
  preferencesOpen: false,
  locale: DEFAULT_LOCALE,
  searchResults: DEFAULT_PAGINATED_RESOURCE,
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
  const [searchResults, setSearchResults] = useState<
    PaginatedResource<ArticleEssencial>
  >(DEFAULT_PAGINATED_RESOURCE);
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
