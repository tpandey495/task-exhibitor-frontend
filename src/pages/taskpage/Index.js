import React, { useState,useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {useSelector,useDispatch } from 'react-redux';
import ResponsiveDialog from './Taskpopup';
import  './task.css';
import TaskCard from 'component/Task';
import {getTaskByPlan} from 'store/taskSlice';

const TaskPage =() => {
    const [params]=useSearchParams();
    const dispatch=useDispatch();
    const {tasks} =useSelector((state)=>state.task)
    const id=params.get("t");
    const payload={
      "plan_id":id
    }
    const fetchTask=async()=>{
      try{
        await dispatch(getTaskByPlan(payload));
      }
      catch(err){
        console.log(err);
      }
   }

   useEffect(()=>{
    fetchTask();
   },[])

  return (
    <div className="task-group">
      <div className="plan-name">
        <p className="plan-text">Data Structure</p>
        <ResponsiveDialog />
      </div>
     {
      tasks&&tasks.map((task)=>{
        const date=task?.date?.month<10?`${task?.date?.year}-0${task?.date?.month}-${task?.date?.day}`:`${task?.date?.year}-${task?.date?.month}-${task?.date?.day}`;
     return  <TaskCard key={task._id} id={task._id} name={task.task_name} due={task.timing} duedate={date} dailytask={task.is_daily_task} plan_id={payload}/>
        })
      }
    </div>
 )}
   
   export default TaskPage;