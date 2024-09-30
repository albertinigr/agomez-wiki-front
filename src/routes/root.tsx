import { Fragment } from "react";
import withProviders from "../providers";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import TopBar from "../components/layout/Topbar";
import Footer from "../components/layout/Footer";

function Root() {
  return (
    <Fragment>
      <TopBar />
      <Container
        maxWidth="xl"
        sx={{ backgroundColor: "background.default", minHeight: "90vh", py: 4 }}
      >
        <Outlet />
      </Container>
      <Footer />
    </Fragment>
  );
}

export default withProviders(Root);
