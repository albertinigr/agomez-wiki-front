import * as React from "react";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Typography from "../form-components//Typography";

function Copyright() {
  return (
    <React.Fragment>
      {"© "}
      <Link color="inherit" href="https://wikipedia.com">
        Wikipedia
      </Link>{" "}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

// const iconStyle = {
//   width: 48,
//   height: 48,
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   backgroundColor: "warning.main",
//   mr: 1,
//   "&:hover": {
//     bgcolor: "warning.dark",
//   },
// };

export default function Footer() {
  return (
    <Typography
      component="footer"
      sx={{ display: "flex", bgcolor: "secondary.light" }}
    >
      <Container sx={{ my: 8, display: "flex" }}>
        <Copyright />
      </Container>
    </Typography>
  );
}
