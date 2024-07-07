import React, { useState } from "react";
import { Box, Stack, Typography, Button, TextField, FormControl, Select, MenuItem } from "@mui/material";
import { TimePicker, DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { gettaskbyfilter, getTaskByPlan, createTask } from 'store/taskSlice';
import { fetchPlan } from 'store/planSlice';
import useDrawer from 'hooks/useDrawer';
import DrawerLayout from 'component/Drawer';
import BottomNavbar from 'component/BottomNavbar';
import "./task.css";


const AddTask = () => {
  const [params] = useSearchParams();
  const dispatch = useDispatch();
  const id = params.get('t');
  const { anchor, toggleDrawer } = useDrawer();


  const [task, setTask] = useState({
    plan_id: id,
    task_name: '',
    date: '',
    timing: '',
    is_daily_task: false
  });




  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        plan_id: id,
      };
      await dispatch(createTask(task));
      await dispatch(getTaskByPlan(payload));
      await dispatch(gettaskbyfilter('today'));
      await dispatch(gettaskbyfilter('upcoming'));
      await dispatch(fetchPlan());
      if (task?.is_daily_task)
        await dispatch(gettaskbyfilter('daily'));
    } catch (err) {
      console.error(err);
    }
  };

  const DrawerBody = () => {
    return (
      <Box className="taskDrawerContainer">
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
          </Box>task
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '30px' }}>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Typography variant="body1">Start Date</Typography>
                <DatePicker />
              </LocalizationProvider>
            </Box>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Typography variant="body1">Start Time</Typography>
                <TimePicker label="00:00" />
              </LocalizationProvider>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '30px' }}>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Typography variant="body1">End Date</Typography>
                <DatePicker />
              </LocalizationProvider>
            </Box>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Typography variant="body1">End Time</Typography>
                <TimePicker label="00:00" />
              </LocalizationProvider>
            </Box>
          </Box>
          <Box>
            <Typography variant="body1" >Select Priority</Typography>
            <FormControl fullWidth>
              <Select>
                <MenuItem>Most Urgent</MenuItem>
                <MenuItem>Urgent</MenuItem>
                <MenuItem>Less Urgent</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
    )
  }

  const DrawerBottom=() => {
   return(
    <Stack spacing={2} direction="row" sx={{ paddingLeft: '10px' }}>
      <Button variant="contained">Add Task</Button>
      <Button variant="outlined" onClick={toggleDrawer(false)}>Cancel</Button>
    </Stack>
   )
  }

  return (
    <>
      <Button variant="contained" onClick={toggleDrawer("right", true)}>Add Task</Button>
      <DrawerLayout Title="Add Task" direction={"right"} anchor={anchor}
        toggleDrawer={toggleDrawer} Body={<DrawerBody nextBtnText={"Add Task"} />}
        Bottom={<BottomNavbar Bottom={<DrawerBottom />}/>}
      />
    </>
  );
}

export default AddTask;
