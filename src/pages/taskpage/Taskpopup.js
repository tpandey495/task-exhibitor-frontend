// import React, { useState } from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import styled from 'styled-components';
// import 'react-datepicker/dist/react-datepicker.css';
// import { useSearchParams } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { gettaskbyfilter, getTaskByPlan, createTask } from 'store/taskSlice';
// import { fetchPlan } from 'store/planSlice';
// import './task.css';

// const Text = styled.h5``;

// const ResponsiveDialog = () => {
//   const [params] = useSearchParams();
//   const id = params.get('t');
//   const [open, setOpen] = useState(false);
//   const [task, setTask] = useState({
//     plan_id: id,
//     task_name: '',
//     date: '',
//     timing: '',
//     is_daily_task: false
//   });
//   const dispatch = useDispatch();

//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setTask({ ...task, [name]: value });
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         plan_id: id,
//       };
//       await dispatch(createTask(task));
//       await dispatch(getTaskByPlan(payload));
//       await dispatch(gettaskbyfilter('today'));
//       await dispatch(gettaskbyfilter('upcoming'));
//       await dispatch(fetchPlan());
//       if (task?.is_daily_task) await dispatch(gettaskbyfilter('daily'));
//       handleClose();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className='taskDrawerContainer'>
//       <button type="button" className="addTask" onClick={handleClickOpen}>
//         Add Task
//       </button>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>{"Add Task Inside Your Plan"}</DialogTitle>
//         <DialogContent>
//           <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '40ch' } }}>
//             <Text>Task Name</Text>
//             <TextField
//               id="outlined-basic"
//               name="task_name"
//               value={task.task_name}
//               onChange={handleInput}
//               variant="outlined"
//               placeholder="Task Name"
//             />
//             <Text>Due Date</Text>
//             <TextField
//               type="date"
//               id="outlined-basic"
//               value={task.date}
//               onChange={handleInput}
//               name="date"
//               variant="outlined"
//               placeholder="Due Date"
//             />
//             <Text>Due Time</Text>
//             <TextField
//               type="time"
//               id="outlined-basic"
//               value={task.timing}
//               onChange={handleInput}
//               name="timing"
//               variant="outlined"
//               placeholder="timing"
//             />
//             <Text>
//               Is Daily Routine
//               <input
//                 type="checkbox"
//                 checked={task.is_daily_task}
//                 onChange={() => setTask((prev) => ({ ...prev, is_daily_task: !task.is_daily_task }))}
//               />
//             </Text>
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button autoFocus onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button type="submit" onClick={handleSave} autoFocus>
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default ResponsiveDialog;

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
