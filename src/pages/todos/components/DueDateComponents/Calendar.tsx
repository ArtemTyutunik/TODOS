import React from 'react';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, {Dayjs} from "dayjs";
import {StaticDatePicker} from "@mui/x-date-pickers/StaticDatePicker";
import {TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers";

import './calendar.css'
import {IDate} from "../../../../shared/interfaces";
import {dateFormat} from "../../../../shared/constants";

interface Props {
    onSetDate: (date: IDate) => void,
    initialDate: IDate
}

const Calendar = ({onSetDate,initialDate = null}: Props) => {
    const currentYear = dayjs().year();
    const correctDate = initialDate && currentYear + initialDate
    const [value, setValue] = React.useState<Dayjs | null>(dayjs(correctDate));

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker orientation="portrait"
                              showToolbar={false}
                              disablePast
                              openTo="day"
                              value={value}
                              onChange={(newValue) => {
                                  setValue(newValue);
                                  onSetDate(newValue!.format(dateFormat))
                              }}
                              renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
};

export default Calendar;
