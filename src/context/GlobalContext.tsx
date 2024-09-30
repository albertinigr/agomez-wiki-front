"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Locale } from "../types/locale";
import { DATE_FORMAT, DEFAULT_LOCALE } from "../libs/constants";
import { ArticleEssencial } from "../types/article-essencial";
import { PaginatedResource } from "../types/paginated-resource";
import dayjs from "dayjs";
import { SearchFilter } from "../types/search-filter";

const DEFAULT_PAGINATED_RESOURCE: PaginatedResource<ArticleEssencial> = {
  items: [],
  totalItems: 0,
  page: 0,
  size: 5,
};

const DEFAULT_SEARCH_FILTER: SearchFilter = {
  date: dayjs().format(DATE_FORMAT),
  target: null,
  page: 0,
  size: 5,
};

export type GlobalContextType = {
  preferencesOpen: boolean;
  locale: Locale;
  searchFilters: SearchFilter;
  searchResults: PaginatedResource<ArticleEssencial>;
  loadingSearchResults?: boolean;
  togglePreferences: () => void;
  setLocale: (locale: Locale) => void;
  setSearchFilters: (filters: SearchFilter) => void;
  setSearchResults: (results: PaginatedResource<ArticleEssencial>) => void;
  setLoadingSearchResults: (loading: boolean) => void;
};

const defaultGlobalContextValues: GlobalContextType = {
  preferencesOpen: false,
  locale: DEFAULT_LOCALE,
  searchFilters: DEFAULT_SEARCH_FILTER,
  searchResults: DEFAULT_PAGINATED_RESOURCE,
  loadingSearchResults: false,
  togglePreferences: () => {},
  setLocale: () => {},
  setSearchFilters: () => {},
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
  const [searchFilters, setSearchFilters] = useState<SearchFilter>(
    DEFAULT_SEARCH_FILTER
  );
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
        searchFilters,
        searchResults,
        loadingSearchResults,
        togglePreferences,
        setLocale,
        setSearchFilters,
        setSearchResults,
        setLoadingSearchResults,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
