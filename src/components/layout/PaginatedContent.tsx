import { Stack, TablePagination } from "@mui/material";
import Grid from "@mui/material/Grid2";
import useFeed from "../../hooks/useFeed";
import PaginatedContentSkeleton from "../skeleton/PaginatedContentSkeleton";
import ArticleCard from "../card/ArticleCard";
import { t } from "../lang";
import { useEffect, useState } from "react";
import { STORE_VISITED } from "../../libs/constants";
import { ArticleEssencial } from "../../types/article-essencial";
import { getDeviceFormat } from "../../libs/utils";

export default function PaginatedContent() {
  const { searchResults, loadingSearchResults, searchFeeds, searchFilters } =
    useFeed();
  const [visitedArticles, setVisitedArticles] = useState<string[]>([]);
  const format = getDeviceFormat();

  useEffect(() => {
    const visited = getVisitedArticles();
    setVisitedArticles(visited);
  }, []);

  const handleChangePage = (_: unknown, newPage: number) =>
    searchFeeds({ ...searchFilters, page: newPage });

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) =>
    searchFeeds({ ...searchFilters, size: parseInt(event.target.value, 10) });

  const getVisitedArticles = () => {
    const visitedArticles = localStorage.getItem(STORE_VISITED);
    if (visitedArticles) {
      const visited = JSON.parse(visitedArticles);
      return visited;
    }
    return [];
  };

  const handleOpenArticle = (article: ArticleEssencial) => () => {
    const page =
      format === "mobile"
        ? article.content_urls?.mobile.page
        : article.content_urls?.desktop.page;
    const visited = getVisitedArticles();
    setVisitedArticles(visited);
    if (!visited.includes(page)) {
      visited.push(page);
      localStorage.setItem(STORE_VISITED, JSON.stringify(visited));
    }
    window.open(page, "_blank");
  };

  if (loadingSearchResults) return <PaginatedContentSkeleton cards={5} />;
  return (
    <Stack spacing={2}>
      <Grid container spacing={3}>
        {searchResults?.items?.map((article) => {
          const visited = visitedArticles.includes(
            format === "mobile"
              ? article.content_urls.mobile.page
              : article.content_urls.desktop.page
          );
          return (
            <Grid
              key={article.wikibase_item}
              size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}
              sx={{ textAlign: "center" }}
            >
              <ArticleCard
                article={article}
                handleClick={handleOpenArticle(article)}
                visited={visited}
              />
            </Grid>
          );
        })}
      </Grid>
      <TablePagination
        component="div"
        count={searchResults?.totalItems ?? 0}
        page={searchResults?.page ?? 0}
        rowsPerPage={searchResults?.size ?? 5}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={format === "mobile" ? "" : t("app.rowsPerPage")}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
      />
    </Stack>
  );
}
