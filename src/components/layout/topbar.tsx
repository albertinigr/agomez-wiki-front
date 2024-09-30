import Box from "@mui/material/Box";
import { AppBar, Button, Stack, Toolbar } from "@mui/material";
import AccountMenu from "../menu/account-menu";
import { Language, Settings } from "@mui/icons-material";
import Typography from "../form-components/Typography";
import PreferenceDialog from "../dialog/PreferenceDialog";
import { useGlobalContext } from "../../context/GlobalContext";
import useLocale from "../../hooks/useLocale";
import { t } from "../lang";

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
  const menuItems = [
    {
      icon: <Language fontSize="small" />,
      label: "Language",
      onClick: () => {},
    },
    {
      icon: <Settings fontSize="small" />,
      label: "Settings",
      onClick: () => {},
    },
  ];

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
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Typography variant="h6" component="h1" color="inherit">
              {t("app.title")}
            </Typography>
            <PreferenceMenu />
            <AccountMenu avatar="Albertinigr" items={menuItems} />
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default TopBar;
