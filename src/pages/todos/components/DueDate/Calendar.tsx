import React from 'react';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {StaticDatePicker} from "@mui/x-date-pickers/StaticDatePicker";
import {TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers";

import './calendar.css'

const Calendar = () => {
    const [value, setValue] = React.useState(Date);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker orientation="portrait"
                              showToolbar={false}
                              openTo="day"
                              value={value}
                              onChange={(newValue: string | null) => {
                                  setValue(newValue!);
                              }}
                              renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
};

export default Calendar;
