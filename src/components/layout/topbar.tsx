import Box from "@mui/material/Box";
import { AppBar, Button, Stack, Toolbar } from "@mui/material";
import { Language, Search } from "@mui/icons-material";
import Typography from "../form-components/Typography";
import PreferenceDialog from "../dialog/PreferenceDialog";
import { useGlobalContext } from "../../context/GlobalContext";
import useLocale from "../../hooks/useLocale";
import { t } from "../lang";
import { CustomDatePicker } from "../form-components/CustomDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { SyntheticEvent, useEffect } from "react";
import { DATE_FORMAT } from "../../libs/constants";
import useFeed from "../../hooks/useFeed";
import { useLocation, useNavigate } from "react-router-dom";
import { Locale } from "../../types/locale";
import CustomAutoComplete from "../form-components/CustomAutoComplete";

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
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { availableLanguages } = useLocale();
  const { searchFilters, setSearchFilters, searchFeeds } = useFeed();

  useEffect(() => {
    searchFeeds(searchFilters);
  }, []);

  const handleSearch = () => {
    searchFeeds(searchFilters);
    if (pathname !== "/") navigate("/");
  };

  const handleDateChange = (date: Dayjs | null) => {
    const selectedDate = dayjs(date).format(DATE_FORMAT);
    setSearchFilters({ ...searchFilters, date: selectedDate });
  };

  const handleTargetChange = (
    _: SyntheticEvent<Element, Event>,
    newValue: Locale | null
  ) => {
    setSearchFilters({ ...searchFilters, target: newValue });
  };

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
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <CustomDatePicker
              value={dayjs(searchFilters.date)}
              onChange={handleDateChange}
            />
            <CustomAutoComplete<Locale>
              options={availableLanguages || []}
              getOptionLabel={(option) => `${option.name} [${option.code}]`}
              value={searchFilters.target}
              onChange={handleTargetChange}
            />
            <Button color="inherit" onClick={handleSearch}>
              {t("app.search")}
              <Search fontSize="large" sx={{ pl: 2 }} />
            </Button>
          </Stack>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <PreferenceMenu />
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default TopBar;
