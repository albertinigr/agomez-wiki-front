import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import useFeed from "../../hooks/useFeed";
import PaginatedContentSkeleton from "../skeleton/PaginatedContentSkeleton";
import ArticleCard from "../card/ArticleCard";

export default function PaginatedContent() {
  const { searchResults, loadingSearchResults } = useFeed();

  if (loadingSearchResults) return <PaginatedContentSkeleton cards={5} />;
  return (
    <Grid container spacing={1}>
      {searchResults?.items?.map((article, index) => (
        <Grid size={2.2} sx={{ textAlign: "center" }}>
          <ArticleCard key={index} article={article} />
        </Grid>
      ))}
    </Grid>
  );
}
