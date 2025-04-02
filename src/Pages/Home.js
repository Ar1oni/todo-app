import React, { useState } from "react";
import AddTask from "../Components/AddTask";
import ViewTaskList from "../Components/ViewTaskList";
import FinishedTasks from "../Components/FinishedTasks";
import UnfinishedTasks from "../Components/UnfinishedTasks";
import TaskModal from "../Components/TaskModal";
import TaskList from "../Components/TaskList";
import { useLocalStorage } from "@uidotdev/usehooks";
import FinishedTaskList from "../Components/FinishedTaskList";
import UnfinishedTaskList from "../Components/UnfinishedTaskList";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isTaskListOpen, setIsTaskListOpen] = useState(false);
  const [isFinishedTaskListOpen , setIsFinishedTaskListOpen] = useState(false)
  const [isUnfinishedTaskListOpen , setIsUnfinishedTaskListOpen] = useState(false)
  const [user, setUser] = useLocalStorage('user',{})
  return (
    <>
      {
        (user && user.email) ?
        (<div className="home-container">
        <div className="tasks-row">
          <div className="task-box" onClick={() => setIsModalOpen(true)}>
            <AddTask />
          </div>
          <div className="task-box" onClick={() => setIsTaskListOpen(true)}>
            <ViewTaskList/>
          </div>
          <div className="task-box" onClick={() => setIsFinishedTaskListOpen(true)}>
            <FinishedTasks />
          </div>
          <div className="task-box" onClick={() => setIsUnfinishedTaskListOpen(true)}>
            <UnfinishedTasks />
          </div>
        </div>
  
        {isModalOpen && <TaskModal onClose={() => setIsModalOpen(false)}  />}
        {isTaskListOpen && <TaskList onClose={() => setIsTaskListOpen(false)}/>}
        {isFinishedTaskListOpen && <FinishedTaskList onClose={() => setIsFinishedTaskListOpen(false)}/>}
        {isUnfinishedTaskListOpen && <UnfinishedTaskList onClose={() => setIsUnfinishedTaskListOpen(false)}/>}
      </div>)
        :(
          <div>
            <h1>Welcome to todo-app</h1>
            <h2>Register so you can start adding your tasks</h2>
          </div>
        )
      }
    </>  
  );
};

export default Home;
