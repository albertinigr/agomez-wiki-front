import { Skeleton, Stack } from "@mui/material";

export default function PaginatedContentSkeleton({
  cards = 5,
}: {
  cards: number;
}) {
  return (
    <Stack spacing={2}>
      {[...Array(cards)].map((_, index) => (
        <Skeleton key={index} variant="rectangular" height={100} />
      ))}
    </Stack>
  );
}
