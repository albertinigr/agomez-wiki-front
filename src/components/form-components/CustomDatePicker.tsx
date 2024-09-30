import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Dayjs } from "dayjs";

export function CustomDatePicker({
  label,
  value,
  onChange,
}: {
  label?: string;
  value?: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          value={value}
          onChange={onChange}
          slotProps={{
            textField: {
              sx: {
                color: "#f8bbd0",
                borderRadius: "0px",
                borderWidth: "0px",
                borderColor: "#e91e63",
                border: "0px solid",
                backgroundColor: "white",
              },
              InputProps: {
                size: "small",
                readOnly: true,
                // sx: { fontSize: 30, maxWidth: 225 },
                disableUnderline: true,
              },
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
