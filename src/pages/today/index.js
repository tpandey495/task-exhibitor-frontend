import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskCard from "component/Task";
import { gettaskbyfilter } from "store/taskSlice";
import Quadrent from "./quadrent";

const Today = () => {
  const { tasksfilter } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  const fetchTask = async () => {
    try {
      await dispatch(gettaskbyfilter("today"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <div
      className="today"
      style={{ marginTop: "120px", width: "100%", padding: "1rem" }}
    >
      <h1
        style={{
          marginBottom: "2rem",
          textAlign: 'center',
        }}
      >
        Today Task
      </h1>
      {/* {
      tasksfilter?.today&&tasksfilter?.today.map((task)=>{
        const date=`${task?.date?.day}-${task?.date?.month}-${task?.date?.year}`;
     return  <TaskCard key={task._id} id={task._id} name={task.task_name} due={task.timinng} duedate={date} />
        })
      } */}
      <Quadrent />
    </div>
  );
};

export default Today;
