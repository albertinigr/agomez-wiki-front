import Box from "@mui/material/Box";
import { AppBar, Button, Stack, Toolbar } from "@mui/material";
import { Language } from "@mui/icons-material";
import Typography from "../form-components/Typography";
import PreferenceDialog from "../dialog/PreferenceDialog";
import { useGlobalContext } from "../../context/GlobalContext";
import useLocale from "../../hooks/useLocale";
import useFeed from "../../hooks/useFeed";
import { SearchBar } from "../search/SearchBar";
import { useEffect } from "react";

function PreferenceMenu() {
  const { togglePreferences } = useGlobalContext();
  const { locale } = useLocale();

  return (
    <>
      <Button
        onClick={togglePreferences}
        sx={{
          ml: 2,
          color: "common.white",
          fontWeight: 400,
          textTransform: "none",
          fontSize: 16,
        }}
      >
        {locale.name}
        <Language sx={{ ml: 1 }} />
      </Button>
      <PreferenceDialog />
    </>
  );
}

function TopBar() {
  const { searchFilters, searchFeeds } = useFeed();

  useEffect(() => {
    searchFeeds(searchFilters);
  }, []);

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" sx={{ flex: 1 }} spacing={0.3}>
            <Typography variant="h6" component="h1" color="inherit">
              Wiki
            </Typography>
            <Typography
              variant="h6"
              component="h1"
              color="inherit"
              sx={{ fontWeight: 400 }}
            >
              pedia
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
          >
            <SearchBar />
          </Stack>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <PreferenceMenu />
          </Box>
        </Toolbar>
        <Toolbar
          sx={{ display: { xs: "flex", sm: "none" }, alignItems: "center" }}
        >
          <Stack direction="row" spacing={1}>
            <SearchBar />
          </Stack>
        </Toolbar>
      </AppBar>
      {/* Placeholder for searchbar */}
      <Box
        component={"div"}
        sx={{ display: { xs: "flex", sm: "none" }, height: "112px", flex: 1 }}
      />
    </div>
  );
}

export default TopBar;
