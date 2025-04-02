import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocalStorage } from "@uidotdev/usehooks";

const UnfinishedTaskList = ({ onClose }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user] = useLocalStorage('user', {});
    const [selectedTask, setSelectedTask] = useState(null);
    const [newDueDate, setNewDueDate] = useState("");

    useEffect(() => {
        axios.get('https://67e46a692ae442db76d45b31.mockapi.io/tasks')
            .then(resp => {
                setTasks(resp.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const moveToTaskList = async () => {
        const currentDate = new Date();
        if (!newDueDate || !selectedTask || new Date(newDueDate) < currentDate) {
            alert('Failed to update newDueDate. Hint: newDueDate should be greater than dueDate')
            return;
        }

        try {
            await axios.put(`https://67e46a692ae442db76d45b31.mockapi.io/tasks/${selectedTask.id}`, {
                isCompleted: false,
                DueDate: newDueDate,
            });

            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === selectedTask.id ? { ...task, isCompleted: false, DueDate: newDueDate } : task
                )
            );

            setSelectedTask(null);
            setNewDueDate("");
            alert("Task moved to task list with new due date.");
        } catch (error) {
            console.error("Error updating task:", error);
            alert("Failed to update task. Please try again.");
        }
    };

    const currentDate = new Date();
    const unfinishedTasks = tasks.filter(task => new Date(task.DueDate) < currentDate && !task.isCompleted);
    const filteredUnfinishedTasks = unfinishedTasks.filter(task => task.userId == user.id);

    return (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px", width: "400px", textAlign: "center", boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" }}>
                <h2>Unfinished Task List</h2>
                <button style={{ position: "absolute", right: "20px", top: "20px", background: "red", color: "white", border: "none", cursor: "pointer", padding: "5px 10px", borderRadius: "5px" }} onClick={onClose}>✖</button>

                {loading ? (
                    <p>Loading tasks...</p>
                ) : filteredUnfinishedTasks.length === 0 ? (
                    <p>No unfinished tasks</p>
                ) : (
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {filteredUnfinishedTasks.map((task) => (
                            <li key={task.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ddd", padding: "10px 0" }}>
                                <div style={{ textAlign: "left" }}>
                                    <strong>{task.Title}</strong>
                                    <p>{task.Description}</p>
                                    <span>Due: {task.DueDate}</span>
                                    <span style={{ marginLeft: "10px", fontWeight: "bold", color: "red" }}>Status: Unfinished</span>
                                    <button style={{ marginLeft: "10px", padding: "5px 10px", borderRadius: "5px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer" }} onClick={() => setSelectedTask(task)}>Move to task list</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {selectedTask && (
                    <div style={{ marginTop: "20px", padding: "10px", borderRadius: "5px", backgroundColor: "#f9f9f9" }}>
                        <h3>Select a new due date</h3>
                        <input
                            type="date"
                            value={newDueDate}
                            onChange={(e) => setNewDueDate(e.target.value)}
                            style={{ padding: "5px", marginRight: "10px" }}
                        />
                        <button style={{ padding: "5px 10px", marginRight: "5px", borderRadius: "5px", backgroundColor: "green", color: "white", border: "none", cursor: "pointer" }} onClick={moveToTaskList}>Update</button>
                        <button style={{ padding: "5px 10px", borderRadius: "5px", backgroundColor: "gray", color: "white", border: "none", cursor: "pointer" }} onClick={() => setSelectedTask(null)}>Cancel</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UnfinishedTaskList;
