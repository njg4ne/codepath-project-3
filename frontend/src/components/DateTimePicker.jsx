import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker, DatePicker } from "@mui/x-date-pickers";
import { Typography, Stack, Button } from "@mui/material";
import { useEffect, useState } from "react";

export default function DateTimePicker({ setDatetime }) {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  function merge(date, time) {
    if (!date || !time) {
      return null;
    }
    const [day, monthIndex, year] = [
      date.getDate(),
      date.getMonth(),
      date.getFullYear(),
    ];
    const [hours, minutes] = [time.getHours(), time.getMinutes()];
    return new Date(year, monthIndex, day, hours, minutes);
  }

  useEffect(() => {
    // console.log(date, time);
    setDatetime(merge(date, time));
  }, [date, time]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={2}>
        <DatePicker
          label="Choose Date"
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
            setDatetime(merge(date, time));
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <TimePicker
          label="Choose Time"
          value={time}
          onChange={(newValue) => {
            setTime(newValue);
            setDatetime(merge(date, time));
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
