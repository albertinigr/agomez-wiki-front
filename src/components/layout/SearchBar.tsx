import { Box, InputBase } from "@mui/material";
import { CustomDatePicker } from "../form-components/CustomDatePicker";

export default function SearchBar() {
  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "secondary.light",
        minWidth: "50vw",
        maxWidth: "50vw",
        height: "80px",
        justifyContent: "center",
        alignItems: "center",
      }}
    ></Box>
  );
}
