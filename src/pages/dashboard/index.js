import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate,Link } from 'react-router-dom';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';
import { UserInfo } from 'store/authSlice';
import { fetchPlan } from 'store/planSlice';
import Card from './Cards';
import ResponsiveDialog from './Popup';


const Dashboard = () => {
  const { isLoggedin, users } = useSelector((state) => state.auth);
  const {plans}=useSelector((state)=>state.plan)
  const dispatch = useDispatch();
  // Fetch user info
  const fetchUserInfo = async () => {
    try {
      if (users.length <= 0) {
        await dispatch(UserInfo());
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Fetch plans
 const getPlan=async()=>{
  try{
     if(!plans||plans.length<=0)
       await dispatch(fetchPlan());
  }
  catch(err){
     console.log(err);
  }
 }

  useEffect(() => {
    fetchUserInfo(); // Fetch user info
    getPlan(); // Fetch plans
  }, []);

  if (!isLoggedin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="dashboard">
      <div className="user-welcome">
        <p className="welcome-text">
          Hello<span className="user-name">{capitalizeFirstLetter(users[0]?.fName)}</span>
        </p>
        <ResponsiveDialog/>
      </div>
      {console.log(plans)}
      <div className="card-par">
        {plans &&
          plans.map((plan, index) => (
            <Link key={plan._id} to={`/dashboard/task?t=${plan._id}`}>
              <Card
                key={plan._id}
                number={index + 1}
                name={plan.plan_name}
                desc={plan.desc}
                total={plan?.total}
                completed={plan?.completed}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
