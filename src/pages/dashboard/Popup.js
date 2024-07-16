import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';
import { useDispatch } from 'react-redux';
import DrawerLayout from "component/Drawer";
import CustomTextField from "component/TextField";
import BottomNavbar from "component/BottomNavbar";
import useDrawer from "hooks/useDrawer";
import {fetchPlan,createPlan} from 'store/planSlice';
import './Card.css';

const Text = styled.h5``;
const ResponsiveDialog = () => {
  const { anchor, toggleDrawer } = useDrawer();

  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState({
    planName: "", desc: ""
  });
  const [err, setErr] = useState("");
  const dispatch = useDispatch();


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleInput = (e) => {
    // const name = e.target.name;
    // const value = e.target.value;
    const {name , value} = e.target;
    console.log("Name : ",name , "Value : ",value);
    setPlan({ ...plan, [name]: value })
  }
  const { planName, desc } = plan;
  const payload = {
    "plan_name": planName,
    "desc": desc
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createPlan(payload));
      setPlan({ plan: "", desc: "" });
      handleClose();
      await dispatch(fetchPlan());
    }
    catch (err) {
      setErr(err);
    }
  }

  const DrawerBody = () => {
    return (
      <Box className="taskDrawerContainer">
        <Box className="drawerbodycontainer">
          <Box>
            <CustomTextField
              fullWidth
              label="Plan Name"
              placeholder="Plan Name"
              name='planName'
              value={plan.plan} 
              onChange={handleInput}
              required
            />
          </Box>
          <Box>
            <CustomTextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              placeholder="Description"
              name='desc' 
              value={plan.desc}
              onChange={handleInput}
            />
          </Box>
        </Box>
      </Box>
    );
  };
  const DrawerBottom = () => {
    return (
      <Stack spacing={2} direction="row" sx={{ paddingLeft: "10px" }}>
        <Button variant="contained" onClick={()=>console.log("Newly Added Plan : " , plan)} >Add Plan</Button>
        <Button variant="outlined" onClick={toggleDrawer(false)}>
          Cancel
        </Button>
      </Stack>
    );
  };
  return (
    <div>
      <button className="addPlan" onClick={toggleDrawer("right", true)}>Add Plan</button>
      {/* <Dialog open={open} onClose={handleClose}>
        {err && <div className="err">{err}</div>}
        <DialogTitle >{"Planning"}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit}
            sx={{
              '& > :not(style)': { m: 1, width: '40ch', },
            }}>
            <Text>Plan Name</Text>
            <TextField name='planName' id="outlined-basic" variant="outlined" value={plan.plan} onChange={handleInput}
              placeholder='Plan Name' required />
            <Text>Description</Text>
            <TextField name='desc' id="outlined-basic" variant="outlined" value={plan.desc}
              onChange={handleInput}
              placeholder='Description' />
            <Stack spacing={2} direction="row">
              <Button style={{ padding: "12px 79px", margin: '15px 0px' }} variant="contained">Add Task Inside Your Plan</Button>
            </Stack>
            <DialogActions type='submit'>
              <Button autoFocus onClick={handleClose}>
                Cancel
              </Button>
              <Button type='submit' autoFocus>
                Save
              </Button>
            </DialogActions>
          </Box  >
        </DialogContent>
      </Dialog> */}
      <DrawerLayout
        Title="Planning"
        direction={"right"}
        anchor={anchor}
        toggleDrawer={toggleDrawer}
        Body={<DrawerBody nextBtnText={"Add Task"} />}
        Bottom={<BottomNavbar Bottom={<DrawerBottom />} />}
      />
    </div>
  );
}
export default ResponsiveDialog