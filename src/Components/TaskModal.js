import React, { useState } from "react";
import axios from "axios";
import { useLocalStorage } from "@uidotdev/usehooks";

const TaskModal = ({ onClose }) => {
    const [user, setUser] = useLocalStorage('user',{})

    const handleSubmit = (e) => {
        e.preventDefault()

        const elements = e.target.elements
        const Title = elements.title.value
        const Description = elements.description.value
        const DueDate = elements.dueDate.value 
        const userId = user.id
        const isCompleted = false

        axios.post('https://67e46a692ae442db76d45b31.mockapi.io/tasks',{Title,Description,DueDate,isCompleted,userId})
        .then(resp => {
            if(resp.status === 201){
                alert('Task added successfully')
                onClose()
            }
            else{
                alert('Something went wrong while trying to add the task')
                onClose()   
            }
        })
        .catch(error => console.log(error))
    }

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <form onSubmit={handleSubmit} style={{
        background: "white", padding: "20px", borderRadius: "8px", width: "400px",
        display: "flex", flexDirection: "column", gap: "10px"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0 }}>Add New Task</h2>
          <button style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer" }} onClick={onClose}>✖</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input type="text" name="title" placeholder="Task Title" required style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}/>
          <textarea name="description" placeholder="Task Description" required style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", minHeight: "80px" }}></textarea>
          <input type="date" name="dueDate" required style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}/>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button type="button" style={{ padding: "8px 12px", borderRadius: "4px", background: "#ccc", border: "none", cursor: "pointer" }} onClick={onClose}>Cancel</button>
          <button type="submit" style={{ padding: "8px 12px", borderRadius: "4px", background: "#007bff", color: "white", border: "none", cursor: "pointer" }}>Add Task</button>
        </div>
      </form>
    </div>
  );
};

export default TaskModal;
