import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import { useSearchParams } from 'react-router-dom';
import {useDispatch } from 'react-redux';
import {gettaskbyfilter,getTaskByPlan,createTask} from 'store/taskSlice';
import {fetchPlan} from 'store/planSlice';
import './task.css'

const Text = styled.h5`

`;

const ResponsiveDialog = () => {
  const [params] = useSearchParams();
  const id = params.get("t");
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState({
    "plan_id": id,
    "task_name": "",
    "date": "",
    "timing": "",
    "is_daily_task": false
  });
  const dispatch=useDispatch();
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTask({ ...task, [name]: value })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload={
        "plan_id":id
      }
       await dispatch(createTask(task));
       await dispatch(getTaskByPlan(payload));
       await dispatch(gettaskbyfilter("today"));
       await dispatch(gettaskbyfilter("upcoming"));
       await dispatch(fetchPlan());
      if(task?.is_daily_task)
       await dispatch(gettaskbyfilter("daily"));
       handleClose();
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <button className="addTask" onClick={handleClickOpen}>
        Add Task
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle >{"Add Task Inside Your Plan"}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '40ch', }, }}>
            <Text>Task Name</Text>
            <TextField id="outlined-basic" name='task_name' value={task.task_name}
              onChange={handleInput} variant="outlined" placeholder='Task Name' />

            <Text>Due Date</Text>
            <TextField type="date" id="outlined-basic" value={task.date}
              onChange={handleInput} name='date' variant="outlined" placeholder='Due Date' />

            <Text>Due Time</Text>
            <TextField type="time" id="outlined-basic" value={task.timing}
              onChange={handleInput} name='timing' variant="outlined" placeholder='timing' />
            <Text>Is Daily Routine <input type="checkbox" checked={task.is_daily_task} onChange={() => setTask(pre => ({ ...pre, is_daily_task: !task.is_daily_task }))} /></Text>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onSubmit={handleSave} onClick={handleSave} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ResponsiveDialog


