import { Button } from "@mui/material";
import { CustomDatePicker } from "../form-components/CustomDatePicker";
import CustomAutoComplete from "../form-components/CustomAutoComplete";
import { Locale } from "../../types/locale";
import { Search } from "@mui/icons-material";
import useLocale from "../../hooks/useLocale";
import dayjs, { Dayjs } from "dayjs";
import { t } from "../lang";
import useFeed from "../../hooks/useFeed";
import { useLocation, useNavigate } from "react-router-dom";
import { DATE_FORMAT } from "../../libs/constants";
import { SyntheticEvent } from "react";
import Typography from "../form-components/Typography";

export function SearchBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { availableLanguages } = useLocale();
  const { searchFilters, setSearchFilters, searchFeeds } = useFeed();

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
    <>
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
      <Button
        size="large"
        color="primary"
        variant="outlined"
        onClick={handleSearch}
      >
        <Typography
          sx={{
            display: { xs: "none", sm: "flex" },
            textTransform: "capitalize",
          }}
        >
          {t("app.search")}
        </Typography>
        <Search sx={{ pl: { xs: 0, sm: 1 } }} />
      </Button>
    </>
  );
}
