import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { gettaskbyfilter, getTaskByPlan, createTask } from "store/taskSlice";
import { fetchPlan } from "store/planSlice";
import useDrawer from "hooks/useDrawer";
import DrawerLayout from "component/Drawer";
import BottomNavbar from "component/BottomNavbar";
import CustomTextField from "component/TextField";
import DateComponent from "component/DatePicker";
import ParamTime from "component/Time";
import "./task.css";

const DrawerBottom = ({handleSave,toggleDrawer}) => {
  return (
    <Stack spacing={2} direction="row" sx={{ paddingLeft: "10px" }}>
      <Button variant="contained" onClick={handleSave}>
        Add Task
      </Button>
      <Button variant="outlined" onClick={toggleDrawer(false)}>
        Cancel
      </Button>
    </Stack>
  );
};


const DrawerBody = ({setTask,task, handleChange }) => {
  return (
    <Box className="taskDrawerContainer">
      <Box className="drawerbodycontainer">
        <Box>
          <CustomTextField
            fullWidth
            label="Add Task"
            placeholder="Make a cup of coffee"
            name="task_name"
            value={task.task_name}
            onChange={handleChange}
          />
        </Box>
        <Box>
          <CustomTextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            placeholder="Add sugar and coffee in cup"
            name="description"
            value={task.description}
            onChange={handleChange}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "30px",
          }}
        >
          <Box>
            <DateComponent
              label="Start Date"
              name="start_date"
              value={task.start_date}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <DateComponent
              label="End Date"
              name="end_date"
              value={task.end_date}
              onChange={(newDate) => setTask({ ...task, end_date: newDate })}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "30px",
          }}
        >
          <Box>
            <ParamTime
              label="Start Time"
              name="start_time"
              value={task.start_time}
              onChange={(newTime) => setTask({ ...task, start_time: newTime })}
            />
          </Box>
          <Box>
            <ParamTime
              label="End Time"
              name="end_time"
              value={task.end_time}
              onChange={(newTime) => setTask({ ...task, end_time: newTime })}
            />
          </Box>
        </Box>
        <Box>
          <Typography variant="body1">Select Priority</Typography>
          <FormControl fullWidth>
            <Select
              name="priority"
              value={task.priority}
              onChange={handleChange}
            >
              <MenuItem value="Most Urgent">Most Urgent</MenuItem>
              <MenuItem value="Urgent">Urgent</MenuItem>
              <MenuItem value="Less Urgent">Less Urgent</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

const AddTask = () => {
  const [params] = useSearchParams();
  const dispatch = useDispatch();
  const id = params.get("t");
  const { anchor, toggleDrawer } = useDrawer();

  const [task, setTask] = useState({
    plan_id: id,
    task_name: "",
    description: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    priority: "",
    is_daily_task: false,
});


  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value);
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        taskNaplan_idme: id,
      };
      await dispatch(createTask(task));
      await dispatch(getTaskByPlan(payload));
      await dispatch(gettaskbyfilter("today"));
      await dispatch(gettaskbyfilter("upcoming"));
      await dispatch(fetchPlan());
      if (task?.is_daily_task) await dispatch(gettaskbyfilter("daily"));
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <>
      <Button variant="contained" onClick={toggleDrawer("right", true)}>
        Add Task
      </Button>
      <DrawerLayout
        Title="Add Task"
        direction={"right"}
        anchor={anchor}
        toggleDrawer={toggleDrawer}
        Body={<DrawerBody task={task} handleChange={handleChange} setTask={setTask} />}
        Bottom={<BottomNavbar Bottom={<DrawerBottom handleSave={handleSave} setTask={setTask} toggleDrawer={toggleDrawer} nextBtnText={"Add Task"} />} />}
      />
    </>
  );
};

export default AddTask;