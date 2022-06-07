import { useEffect, useState, Fragment } from "react";
import { Container, CssBaseline, Box } from "@mui/material";
import Copyright from "components/Copyright";

import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker, DatePicker } from "@mui/x-date-pickers";
import { Typography, Stack, Button, Card } from "@mui/material";
import API from "services/API";
import DateTimePicker from "components/DateTimePicker";
import SleepTable from "components/Sleep/SleepTable";

export default function Sleep({ user }) {
  const [sleeps, setSleeps] = useState(null);

  function Tester() {
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    const [notes, setNotes] = useState("");
    const call = async () => {
      if (!start || !end) {
        return;
      }
      const entry = {
        start,
        end,
        notes: notes,
      };
      const resp = await API.logSleep(entry);
      // console.log(resp);
    };

    const find = async () => {
      const resp = await API.getSleep();
      if (resp?.data?.records) {
        // console.log(resp.data.records);
        setSleeps(resp.data.records);
      }
    };

    return (
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <Card elevation={5} sx={{ p: 3 }} component={Stack} spacing={2}>
            <Typography variant="h6">Sleep Start</Typography>
            <DateTimePicker setDatetime={setStart} />
          </Card>
          <Card elevation={5} sx={{ p: 3 }} component={Stack} spacing={2}>
            <Typography variant="h6">Sleep Sleep End</Typography>
            <DateTimePicker setDatetime={setEnd} />
          </Card>
        </Stack>
        {/* <Typography variant="h6">{JSON.stringify(start)}</Typography>
        <Typography variant="h6">{JSON.stringify(end)}</Typography> */}
        <TextField
          id="outlined-multiline-flexible"
          label="Enter sleep notes here"
          multiline
          maxRows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <Button variant="contained" onClick={call}>
          Record
        </Button>
        <Button variant="contained" onClick={find}>
          Find
        </Button>
      </Stack>
    );
  }
  return (
    <Container component="main">
      <CssBaseline />
      {user ? (
        <Fragment>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Tester />
          </Box>
          <SleepTable sleeps={sleeps} />
        </Fragment>
      ) : (
        <Fragment>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">Unauthorized</Typography>
          </Box>
        </Fragment>
      )}

      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
