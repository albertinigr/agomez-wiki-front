import { Autocomplete } from "@mui/material";
import Textfield from "./Textfield";
import { SyntheticEvent } from "react";

export default function CustomAutoComplete<T>({
  options,
  getOptionLabel,
  value,
  onChange,
}: {
  options: T[];
  getOptionLabel: (option: T) => string;
  value: T | null;
  onChange: (_: SyntheticEvent<Element, Event>, newValue: T | null) => void;
}) {
  return (
    <Autocomplete
      options={options || []}
      getOptionLabel={getOptionLabel}
      value={value}
      onChange={onChange}
      sx={{
        minWidth: "120px",
        flex: 1,
        height: "40px",
        p: "0 !important",
        pr: "0 !important",
        "& .MuiAutocomplete-inputRoot": {
          pr: "0 !important",
          borderRadius: 0,
        },
      }}
      renderInput={(params) => <Textfield {...params} />}
    />
  );
}
