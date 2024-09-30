import Box from "@mui/material/Box";
import { AppBar, Button, Stack, Toolbar } from "@mui/material";
import { Language, Search } from "@mui/icons-material";
import Typography from "../form-components/Typography";
import PreferenceDialog from "../dialog/PreferenceDialog";
import { useGlobalContext } from "../../context/GlobalContext";
import useLocale from "../../hooks/useLocale";
import { t } from "../lang";
import { CustomDatePicker } from "../form-components/CustomDatePicker";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { DATE_FORMAT } from "../../libs/constants";
import useFeed from "../../hooks/useFeed";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

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
  const [date, setDate] = useState<string>(dayjs().format(DATE_FORMAT));
  const [target, setTarget] = useState<string | null>(null);
  const { searchFeeds, searchTranslatedFeeds } = useFeed();

  const handleSearch = () => {
    if (!date) {
      return;
    }
    const page = 1;
    if (target) {
      return searchTranslatedFeeds(date, target, page);
    } else {
      searchFeeds(date, page);
    }
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
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button color="inherit" sx={rightLink} onClick={() => null}>
              {t("app.today")}
            </Button>
            <CustomDatePicker
              value={dayjs(date)}
              onChange={(date) => setDate(dayjs(date).format(DATE_FORMAT))}
            />
            <Button color="inherit" sx={rightLink} onClick={handleSearch}>
              <Search fontSize="large" sx={{ pr: 1 }} />
              {t("app.search")}
            </Button>
          </Box>
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
