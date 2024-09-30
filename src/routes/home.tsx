import { Container, Stack } from "@mui/material";
import PaginatedContent from "../components/layout/PaginatedContent";

export default function Home() {
  return (
    <Container maxWidth="xl">
      <Stack spacing={2}>
        <PaginatedContent />
      </Stack>
    </Container>
  );
}
