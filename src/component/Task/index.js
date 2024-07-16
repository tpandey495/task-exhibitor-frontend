import react,{useState} from 'react';
import {AiOutlineEdit} from 'react-icons/ai';
import {SlOptionsVertical} from 'react-icons/sl';
import {useDispatch} from 'react-redux';
import {updateTask,getTaskByPlan,gettaskbyfilter} from 'store/taskSlice';
import { fetchConsistency } from 'store/progressSlice';
import './taskcard.css';


const TaskCard=(props)=>{
    const[show,setShow]=useState(-1);
    const{name,due,duedate,id,dailytask,plan_id}=props;
    const[isEditable,setIsEditable]=useState(false);
    const[edittask,setEdittask]=useState({"task_id" :id,
                      "task_name" : name,
                      "date" : duedate,
                      "timing" :due,
                      "is_daily_task" : dailytask,
                      "deleted_flag" : false,
                      "is_completed" : false
                    });
    
    const handleInput=(e)=>{
      e.preventDefault();
      const name = e.target.name;
      const value = e.target.value; 
      setEdittask({...edittask, [name]:value })
    }
    

    const compareDates = () => {
        const date1=new Date().getTime();
        let date2 = new Date(`${duedate}T${due}:00+05:30`).getTime();
        if (date1 < date2) {
           return  false;
        }else if (date1 > date2) {
           return true;
        } else {
           return false;
        }
    };

    const dispatch=useDispatch();
    const handleSubmit=async(e)=>{
      try{
        await  dispatch(updateTask(edittask));
          await dispatch(getTaskByPlan(plan_id));
          await dispatch(gettaskbyfilter("upcoming"));
          await dispatch(gettaskbyfilter("today"));
          await dispatch(gettaskbyfilter("daily"));
          await dispatch(fetchConsistency())
        }
      catch(err){
         console.log(err);
      }
      setIsEditable(false);
    }

  
    const handleComplete=async()=>{
      const updateObj = edittask;
      updateObj.is_completed = true;
      setEdittask(updateObj);
      handleSubmit({});
    }

    return(
        <div className="task"  onMouseEnter={()=>setShow(id)} onMouseLeave={()=>setShow(-1)}>
          <div className="task-row1">
           <div className="task-name">
            <button className="complete" onClick={handleComplete}></button>
            {isEditable?<input type="text" name="task_name" value={edittask.task_name} onChange={handleInput} />:<span>{name}</span>}
           </div>
            {show===id&&  <div className="task-icons">
              <AiOutlineEdit size="20px" onClick={()=>setIsEditable(true)}/>
              <span><SlOptionsVertical/></span>
            </div>}
          </div>
          <div className="task-row2">
            <div className="task-deadline">
              <p>{isEditable?(<input type="time" name="timing" value={edittask.timing} onChange={handleInput}/>):due}</p>
              <p>{isEditable?<input type="date" name="date" value={edittask.date} onChange={handleInput} />:duedate}</p>
            </div>
            <div className="task-edit">
              {isEditable&&<button className="save" onClick={handleSubmit}>Save</button>}
              {isEditable&&<button className="save" onClick={()=>setIsEditable(false)}>Cancel</button>}
            </div>
           {compareDates()&&<button className="due-button">Due</button>}
          </div>     
        </div>
    )
}

export default TaskCard;