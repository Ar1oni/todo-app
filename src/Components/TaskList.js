import { useLocalStorage } from "@uidotdev/usehooks";
import axios from "axios";
import React, { useState, useEffect } from "react";

const TaskList = ({ onClose }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useLocalStorage('user', {})

  useEffect(() => {
    axios
      .get("https://67e46a692ae442db76d45b31.mockapi.io/tasks")
      .then((resp) => {
        setTasks(resp.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const currentDate = new Date();
  const filteredTasks = tasks.filter(
    (task) => task.userId == user.id && task.isCompleted == false && new Date(task.DueDate) > currentDate
  );

  const handleCheckboxChange = async (task) => {
    try {
      const updatedTask = { ...task, isCompleted: !task.isCompleted };
      await axios.put(`https://67e46a692ae442db76d45b31.mockapi.io/tasks/${task.id}`, updatedTask);
      
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
      );
      alert('Task Completed and moved to finished tasks');
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    const isConfirmed = window.confirm("Are you sure?");
    if (!isConfirmed) return;
    try {
      await axios.delete(`https://67e46a692ae442db76d45b31.mockapi.io/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      alert("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px", width: "400px", textAlign: "center", boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" }}>
        <h2>Task List</h2>
        <button style={{ position: "absolute", right: "20px", top: "20px", background: "red", color: "white", border: "none", cursor: "pointer", padding: "5px 10px", borderRadius: "5px" }} onClick={onClose}>✖</button>
        {loading ? (
          <p>Loading tasks...</p>
        ) : filteredTasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {filteredTasks.map((task) => (
              <li key={task.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ddd", padding: "10px 0" }}>
                <div style={{ textAlign: "left" }}>
                  <strong>{task.Title}</strong>
                  <p>{task.Description}</p>
                  <span>Due: {task.DueDate}</span>
                  <button style={{ marginTop: "5px", background: "red", color: "white", border: "none", cursor: "pointer", padding: "5px 10px", borderRadius: "5px" }} onClick={() => handleDeleteTask(task.id)}>Delete Task</button>
                </div>
                <input 
                  type="checkbox" 
                  checked={task.isCompleted || false} 
                  onChange={() => handleCheckboxChange(task)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskList;