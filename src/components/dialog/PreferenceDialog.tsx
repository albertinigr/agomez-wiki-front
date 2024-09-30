"use client";
import { useState } from "react";
import {
  Dialog,
  Button,
  Tabs,
  Tab,
  DialogTitle,
  DialogContent,
  Stack,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useGlobalContext } from "../../context/GlobalContext";
import Typography from "../form-components/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { CloseOutlined } from "@mui/icons-material";
import { FlatTabPanel } from "../tab/FlatTabPanel";
import useLocale from "../../hooks/useLocale";

export default function PreferenceDialog() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { availableLanguages, locale, changeLocale } = useLocale();
  const { preferencesOpen, togglePreferences } = useGlobalContext();
  const [activeTab, setActiveTab] = useState(0);

  const closeMenu = () => {
    togglePreferences();
    navigate(pathname);
  };

  const LanguagePanel = () => {
    if (!availableLanguages?.length) return null;
    return (
      <Box
        sx={{ pt: 5, overflowY: "auto", minHeight: "50vh", maxHeight: "50vh" }}
      >
        <Grid container spacing={6}>
          {availableLanguages.map(({ code, name }) => (
            <Grid size={4} sx={{ textAlign: "center" }}>
              <Button
                key={code}
                variant={code === locale.code ? "outlined" : "text"}
                onClick={() => changeLocale({ code, name })}
              >
                <Stack sx={{ justifyContent: "center" }}>
                  <Typography sx={{ textTransform: "capitalize" }}>
                    {name}
                  </Typography>
                  <Typography>[{code}]</Typography>
                </Stack>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const PreferencePanel = () => {
    return (
      <div>
        <Typography component="h6" sx={{ fontWeight: 500 }}>
          Preferences
        </Typography>
        <Typography as="p" className="mt-2">
          Set your preferences for the wiki.
        </Typography>
      </div>
    );
  };

  const data = [
    {
      label: "Language & Region",
      value: 0,
      panel: <LanguagePanel />,
    },
    {
      label: "Preferences",
      value: 1,
      panel: <PreferencePanel />,
    },
  ];

  return (
    <Dialog
      open={preferencesOpen}
      onClose={() => closeMenu}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        <Stack
          direction="row"
          sx={{
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
          spacing={0.3}
        >
          <Typography component="h6" sx={{ fontWeight: 500 }}>
            Preferences
          </Typography>
          <Button
            variant="text"
            sx={{ color: "gray", p: 3, borderRadius: "full" }}
            onClick={closeMenu}
          >
            <CloseOutlined />
          </Button>
        </Stack>
      </DialogTitle>
      <DialogContent className="h-[42rem] overflow-scroll">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={activeTab}
            onChange={(_, newValue: number) => setActiveTab(newValue)}
          >
            {data.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                label={label}
                id={`tabpanel-${value}`}
              />
            ))}
          </Tabs>
        </Box>
        {data.map(({ value, panel }) => (
          <FlatTabPanel
            key={value}
            value={activeTab}
            index={value}
            id={`tabpanel-${value}`}
          >
            {panel}
          </FlatTabPanel>
        ))}
      </DialogContent>
    </Dialog>
  );
}
