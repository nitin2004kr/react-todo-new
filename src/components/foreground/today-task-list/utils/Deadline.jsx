import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

// dropdown list for priority, recurring task
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

function Deadline({ deadline, onDeadlineChange }) {
  const handleDateChange = (newValue) => {
    onDeadlineChange(newValue);
  };

  const handleWeekDayChange = (event) => {
    onDeadlineChange(event.target.value);
  };

  const handleTimeChange = (newValue) => {
    onDeadlineChange(newValue);
  };

  return (
    <div>
      {/* -- date picker -- */}
      {deadline === 'montly' &&
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Select Date"
                onChange={handleDateChange}
                sx={{ width: "100%" }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      }

      {/* -- week picker -- */}
      {deadline === 'weekly' &&
        <div>
          <FormControl fullWidth>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              onChange={handleWeekDayChange}
            >
              <MenuItem value="">
                <em>Select Week Day</em>
              </MenuItem>
              <MenuItem value={"Monday"}>Monday</MenuItem>
              <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
              <MenuItem value={"Wednesday"}>Webnesday</MenuItem>
              <MenuItem value={"Thrusday"}>Thrusday</MenuItem>
              <MenuItem value={"Friday"}>Friday</MenuItem>
              <MenuItem value={"Saturday"}>Saturday</MenuItem>
              <MenuItem value={"Sunday"}>Sunday</MenuItem>
            </Select>
          </FormControl>
        </div>
      }

      {/* -- time picker -- */}
      {
        deadline === 'daily' &&
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["TimePicker"]}>
              <TimePicker
                label="Select Time"
                sx={{ width: "100%" }}
                onChange={handleTimeChange}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      }
    </div>
  );
}

export default Deadline;
