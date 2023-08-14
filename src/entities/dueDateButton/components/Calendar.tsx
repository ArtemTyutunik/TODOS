import {useState} from 'react';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {Dayjs} from 'dayjs';
import * as dayjsModule from 'dayjs';
import {StaticDatePicker} from '@mui/x-date-pickers/StaticDatePicker';
import {TextField} from '@mui/material';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

import '@entities/dueDateButton/components/calendar.css';
import {IDate} from '@shared/interfacesAndTypes';
import {dateFormat} from '@shared/constants';
import dayJsDefault from 'dayjs';

interface Props {
    onSetDate: (date: IDate) => void,
    initialDate: IDate
}

const Calendar = ({onSetDate, initialDate}: Props) => {
  const dayjs = process.env.NODE_ENV === 'production' ? dayJsDefault : dayjsModule
  const currentYear = dayjs().year();
  const correctDate = initialDate && currentYear + initialDate;
  const [value, setValue] = useState<Dayjs | null>(dayjs(correctDate));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker orientation="portrait"
        showToolbar={false}
        disablePast
        openTo="day"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          onSetDate(newValue!.format(dateFormat));
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default Calendar;
