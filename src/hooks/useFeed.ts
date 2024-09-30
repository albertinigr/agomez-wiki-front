import { useGlobalContext } from "../context/GlobalContext";
import { fetchFeeds, translateFeeds } from "../services/feed.service";
import { ArticleEssencial } from "../types/article-essencial";
import { PaginatedResource } from "../types/paginated-resource";
import { SearchFilter } from "../types/search-filter";

export default function useFeed() {
  const {
    locale,
    searchFilters,
    setSearchFilters,
    loadingSearchResults,
    setLoadingSearchResults,
    searchResults,
    setSearchResults,
  } = useGlobalContext();

  const searchFeeds = async (
    filters: SearchFilter
  ): Promise<PaginatedResource<ArticleEssencial>> => {
    setLoadingSearchResults(true);
    setSearchFilters(filters);
    const commonPayload = {
      locale: locale.code,
      date: filters.date,
      page: filters.page,
      size: filters.size,
    };
    const feeds = filters.target
      ? await translateFeeds({
          ...commonPayload,
          target: filters.target.code,
        })
      : await fetchFeeds(commonPayload);
    setSearchResults(feeds);
    setLoadingSearchResults(false);
    return feeds;
  };

  return {
    searchFilters,
    searchResults,
    loadingSearchResults,
    searchFeeds,
    setSearchFilters,
  };
}
