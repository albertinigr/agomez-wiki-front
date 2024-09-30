import { Skeleton, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { CARD_HEIGHT } from "../../libs/constants";

export default function PaginatedContentSkeleton({
  cards = 5,
}: {
  cards: number;
}) {
  return (
    <Stack spacing={2}>
      <Grid container spacing={3}>
        {[...Array(cards)].map((_, index) => (
          <Grid
            key={index}
            size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}
            sx={{ textAlign: "center" }}
          >
            <Skeleton key={index} variant="rectangular" height={CARD_HEIGHT} />
          </Grid>
        ))}
      </Grid>
      <Stack direction="row" sx={{ justifyContent: "flex-end", m: 2 }}>
        <Skeleton variant="rectangular" width={300} height={20} />
      </Stack>
    </Stack>
  );
}
