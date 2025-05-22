import React, { useEffect, useState } from "react";
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

function Deadline({ deadline, onDeadlineChange, editValue }) {
  const [dateValue, setDateValue] = useState(null);
  const [weekValue, setWeekValue] = useState('');
  const [timeValue, setTimeValue] = useState(null);

  console.log('deadline - ', editValue)
  // date change 
  const handleDateChange = (newValue) => {
    const formattedTime = newValue.format('DD-MM-YYYY')
    console.log('datechange = ', formattedTime);
    onDeadlineChange(formattedTime);
  };

  // week day change 
  const handleWeekDayChange = (event) => {
    onDeadlineChange(event.target.value);
  };

  // time change 
  const handleTimeChange = (newValue) => {
    const formattedTime = newValue.format('hh:mm A')
    onDeadlineChange(formattedTime);
  };


  // getting the edit value in respective fiels based on deadline 
  useEffect(() => {
    if (deadline === 'montly' && editValue) {
      setDateValue(dayjs(editValue, 'DD-MM-YYYY'));
    } else if (deadline === 'weekly') {
      setWeekValue(editValue || '');
    } else if (deadline === 'daily' && editValue) {
      setTimeValue(dayjs(editValue, 'hh:mm A'));
    }
  }, [editValue, deadline]);

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
                value={dateValue}
                format="DD-MM-YYYY"
                slotProps={{
                  textField: {
                    inputFormat: "DD-MM-YYYY"
                  }
                }}
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
              value={weekValue}
            >
              <MenuItem value="">
                <em>Select Week Day</em>
              </MenuItem>
              <MenuItem value={"Monday"}>Monday</MenuItem>
              <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
              <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
              <MenuItem value={"Thursday"}>Thursday</MenuItem>
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
                value={timeValue}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      }
    </div>
  );
}

export default Deadline;
