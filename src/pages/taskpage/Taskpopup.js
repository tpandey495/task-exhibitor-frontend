import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Stack, Typography } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./task.css";

function ResponsiveDialog() {
  // ======== drawer logic ==========
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Button variant="contained" onClick={toggleDrawer(true)}>Add Task</Button>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor={"right"}>
        <Box className="taskDrawerContainer">
          <Box className="drawerheader">
            <Box className="drawerheadername">Add Task</Box>
            <Box className="drawerclosebutton" onClick={toggleDrawer(false)}>Close</Box>
          </Box>
          <Box className="drawerbodycontainer">
            <Box>
              <Typography variant="body1">Add Task</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Make a cup of coffee"
              />
            </Box>
            <Box>
              <Typography variant="body1">Description</Typography>
              <TextField
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                placeholder="Add sugar and coffee in cup"
              />
            </Box>
            <Box sx={{display:'flex', justifyContent: 'space-between', gap:'30px'}}>
              <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Typography variant="body1">Start Date</Typography>
                  <DatePicker />
                </LocalizationProvider>
              </Box>  
              <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Typography variant="body1">Start Time</Typography>
                  <TimePicker label="00:00"/>
                </LocalizationProvider>
              </Box>  
            </Box>
            <Box sx={{display:'flex', justifyContent: 'space-between', gap:'30px'}}>
              <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Typography variant="body1">End Date</Typography>
                  <DatePicker />
                </LocalizationProvider>
              </Box>  
              <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Typography variant="body1">End Time</Typography>
                  <TimePicker label="00:00"/>
                </LocalizationProvider>
              </Box>  
            </Box>
            <Box>
              <Typography variant="body1">Select Priority</Typography>
              <FormControl fullWidth>
                <Select>
                  <MenuItem>Most Urgent</MenuItem>
                  <MenuItem>Urgent</MenuItem>
                  <MenuItem>Less Urgent</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Stack spacing={2} direction="row" sx={{padding: '20px'}}>
            <Button variant="contained">Add Task</Button>
            <Button variant="outlined" onClick={toggleDrawer(false)}>Cancel</Button>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}

export default ResponsiveDialog;
