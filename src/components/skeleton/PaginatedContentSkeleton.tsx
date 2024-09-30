import { Skeleton, Stack } from "@mui/material";
import { CARD_HEIGHT, CARD_WIDTH } from "../../libs/constants";

export default function PaginatedContentSkeleton({
  cards = 5,
}: {
  cards: number;
}) {
  return (
    <Stack spacing={3} direction="row">
      {[...Array(cards)].map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          height={CARD_HEIGHT}
          width={CARD_WIDTH}
        />
      ))}
    </Stack>
  );
}
