import React,{useEffect} from 'react';
import {useSelector,useDispatch} from "react-redux";
import TaskCard from 'component/Task';
import {gettaskbyfilter} from 'store/taskSlice';
import Quadrent from './quadrent';

const Today=()=>{
  const{tasksfilter}=useSelector((state)=>state.task);
  const dispatch=useDispatch();
  
  const fetchTask=async()=>{
      try{
        await dispatch(gettaskbyfilter("today"));
      }
      catch(err){
        console.log(err);
      }
    }
  
   useEffect(()=>{
        fetchTask();
    },[]);

  return (
    <div className="today" style={{marginTop:"90px", width:"100%", padding: '1rem'}}>
      <p style={{padding: '1rem 2rem', fontSize: '2rem', fontWeight: '500', fontFamily: 'cursive', marginBottom: '1rem', backgroundColor: '#d8f9ff', borderRadius: '5px'}}>Today Task</p>
     {/* {
      tasksfilter?.today&&tasksfilter?.today.map((task)=>{
        const date=`${task?.date?.day}-${task?.date?.month}-${task?.date?.year}`;
     return  <TaskCard key={task._id} id={task._id} name={task.task_name} due={task.timinng} duedate={date} />
        })
      } */}
      <Quadrent/>
    </div>
  )
}

export default Today;