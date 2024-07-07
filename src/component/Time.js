import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { Box } from '@mui/material';


const ParamTime = ({ label="", value=null, onChange,customStyle,inputRef=null,error,helperText,name })=>{


  // ======== Convert value to a valid Date object using dayjs ==========
  const selectedDate = value ? dayjs(value): null;


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} sx={{paddingTop:"0px"}}>
      <Box sx={customStyle}>
        <TimePicker
          label={label}
          value={selectedDate}
          onChange={onChange}
          sx={{width:"100%"}}
          format="hh:mm A"
          slotProps={{ textField: { variant: 'outlined',name:name, inputRef: inputRef, error:error, helperText:helperText} }}
        />
      </Box>
    </LocalizationProvider>
  );
}


export default ParamTime;