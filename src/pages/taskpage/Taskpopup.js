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
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
import TextField from "@mui/material/TextField";
import "./task.css";
import { Typography } from "@mui/material";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // const DrawerList = (
  //   <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
  //     <List>
  //       {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
  //         <ListItem key={text} disablePadding>
  //           <ListItemButton>
  //             <ListItemIcon>
  //               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //             </ListItemIcon>
  //             <ListItemText primary={text} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //     <Divider />
  //     <List>
  //       {['All mail', 'Trash', 'Spam'].map((text, index) => (
  //         <ListItem key={text} disablePadding>
  //           <ListItemButton>
  //             <ListItemIcon>
  //               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //             </ListItemIcon>
  //             <ListItemText primary={text} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //   </Box>
  // );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Add Task</Button>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor={"right"}>
        <div className="taskDrawerContainer">
          <Box className="drawerheader">
            <p className="drawerheadername">Add Task</p>
            <p className="drawerclosebutton" onClick={toggleDrawer(false)}>
              Close
            </p>
          </Box>
          <Box className="drawerbodycontainer">
            <Box>
              <Typography variant="body1">Add Task</Typography>
              <TextField
                variant="outlined"
                placeholder="Make a cup of coffee"
              />
            </Box>
            <Box>
              <Typography variant="body1">Description</Typography>
              <TextField
                variant="outlined"
                multiline
                rows={4}
                placeholder="Add sugar and coffee in cup"
              />
            </Box>
            <Box>
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker label="Start Date" />
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker label="End Date" />
                </DemoContainer>
              </LocalizationProvider> */}
            </Box>
          </Box>
        </div>
      </Drawer>
    </div>
  );
}

export default ResponsiveDialog;
