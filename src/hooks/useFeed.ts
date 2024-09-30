import { useGlobalContext } from "../context/GlobalContext";
import { fetchFeeds, translateFeeds } from "../services/feed.service";
import { ArticleEssencial } from "../types/article-essencial";
import { PaginatedResource } from "../types/paginated-resource";

export default function useFeed() {
  const {
    locale,
    loadingSearchResults,
    setLoadingSearchResults,
    searchResults,
    setSearchResults,
  } = useGlobalContext();

  const searchFeeds = async (
    date: string,
    page: number
  ): Promise<PaginatedResource<ArticleEssencial>> => {
    setLoadingSearchResults(true);
    const feeds = await fetchFeeds({
      locale: locale.code,
      date,
      page,
      size: 10,
    });
    setSearchResults(feeds);
    setLoadingSearchResults(false);
    return feeds;
  };

  const searchTranslatedFeeds = async (
    date: string,
    target: string,
    page: number
  ): Promise<PaginatedResource<ArticleEssencial>> => {
    setLoadingSearchResults(true);
    const feeds = await translateFeeds({
      locale: locale.code,
      target,
      date,
      page,
      size: 10,
    });
    setSearchResults(feeds);
    setLoadingSearchResults(false);
    return feeds;
  };

  return {
    searchResults,
    loadingSearchResults,
    searchFeeds,
    searchTranslatedFeeds,
  };
}
