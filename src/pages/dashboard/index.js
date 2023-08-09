import React,{useEffect,useState} from 'react';
import Card from './Cards';
import ResponsiveDialog from './Popup';
import {useSelector} from 'react-redux';
import API from '../../utils/api';
import {Link,Navigate } from 'react-router-dom';
import Heatmap from 'component/Heatmap';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';

const Dashboard = () => {
  const[plans,setPlans]=useState([]);
  const[userinfo,setUserinfo]=useState({});
  const{isLoggedIn,user}=useSelector((state)=>state.auth);
  
  const fetchPlan=async()=>{
    try{
      await API.getPlan((flag,res)=>setPlans(res));
      await API.getUserInfo((flag,res)=>setUserinfo(res));
     }
    catch(err){
     console.log(err)
    }
  }


  useEffect(() => {
     fetchPlan();
   }, []);


  if(!isLoggedIn){;
    return <Navigate to="/login"/>
  }

  return (
    <div className="dashboard">
    <div className="user-welcome">
      <p className="welcome-text">Hello<span className="user-name">{capitalizeFirstLetter(userinfo?.fName)}</span></p>
      <ResponsiveDialog />
    </div>
    <div className="card-par">
      {
       plans&&plans.map((plan,index)=>
        <Link key={plan._id} to={"/dashboard/task?t=" + plan._id}>
         <Card key={plan._id} number={index+1} name={plan.plan_name} desc={plan.desc} total={plan?.total} completed={plan?.completed}/>
        </Link>
       )
      } 
    </div>
   </div>
  )
}

export default Dashboard;
