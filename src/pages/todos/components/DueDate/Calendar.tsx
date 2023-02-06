import React from 'react';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";
import {StaticDatePicker} from "@mui/x-date-pickers/StaticDatePicker";
import {TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers";

import './calendar.css'

interface Props {
    onSetDate: (date: string) => void
}

const Calendar = ({onSetDate}: Props) => {
    const [value, setValue] = React.useState<Dayjs | null>(null);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker orientation="portrait"
                              showToolbar={false}
                              disablePast
                              openTo="day"
                              value={value}
                              onChange={(newValue) => {
                                  setValue(newValue);
                                  onSetDate(newValue!.format('MMM D'))
                              }}
                              renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
};

export default Calendar;
