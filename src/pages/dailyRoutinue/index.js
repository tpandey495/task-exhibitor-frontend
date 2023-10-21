import React,{useState,useEffect} from 'react';
import {useSelector,useDispatch} from "react-redux";
import TaskCard from 'component/Task';
import {gettaskbyfilter} from 'store/taskSlice';

const Today=()=>{
  const{tasksfilter}=useSelector((state)=>state.task);
  const dispatch=useDispatch();
  const fetchTask=async()=>{
      try{
       await dispatch(gettaskbyfilter("daily"));
      }
      catch(err){
        console.log(err);
      }
    }
  
   useEffect(()=>{
        fetchTask();
    },[]);

  return (
    <div className="daily" style={{marginTop:"150px",width:"100%",marginBottom:"100px"}}>
      <h1 style={{textAlign:'center',marginBottom:"50px"}}>Daily Routine</h1>
        {
      tasksfilter?.daily&& tasksfilter?.daily.map((task)=>{
        const date=`${task?.date?.day}-${task?.date?.month}-${task?.date?.year}`;
     return  <TaskCard key={task._id} id={task._id} name={task.task_name} due={task.timinng} duedate={date} />
        })
      }
    </div>
  )
}

export default Today;