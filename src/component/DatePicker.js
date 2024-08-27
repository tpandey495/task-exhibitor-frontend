import React from 'react';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

const  DateComponent=({label, name="",value, onChange,className="",customStyle={},id="", inputRef = null, disabled,error,helperText})=>{
  const handleChange=(newDate)=>{
    onChange({target:{name:name,value:newDate}})
  }
  const selectedDate = value ? dayjs(value) : null;
    return (
        <>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              id={id}
              label={label}
              format="DD-MM-YYYY"
              value={selectedDate}
              disabled={disabled}
              sx={customStyle}
              onChange={handleChange}
              className={className}
              slotProps={{ textField: { variant: 'outlined',name:name, inputRef: inputRef, error:error, helperText:helperText} }}
            />
          </LocalizationProvider>
        </>
  );
}


export default DateComponent;