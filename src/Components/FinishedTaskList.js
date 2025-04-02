import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocalStorage } from "@uidotdev/usehooks";

const FinishedTaskList = ({ onClose }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useLocalStorage('user', {});

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

    const finishedTasks = tasks.filter(task => task.isCompleted === true);
    const filteredFinishedTasks = finishedTasks.filter(task => task.userId == user.id);

    return (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px", width: "400px", textAlign: "center", boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" }}>
                <h2>Finished Task List</h2>
                <button style={{ position: "absolute", right: "20px", top: "20px", background: "red", color: "white", border: "none", cursor: "pointer", padding: "5px 10px", borderRadius: "5px" }} onClick={onClose}>✖</button>
                {loading ? (
                    <p>Loading tasks...</p>
                ) : filteredFinishedTasks.length === 0 ? (
                    <p>No finished tasks</p>
                ) : (
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {filteredFinishedTasks.map((task) => (
                            <li key={task.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ddd", padding: "10px 0" }}>
                                <div style={{ textAlign: "left" }}>
                                    <strong>{task.Title}</strong>
                                    <p>{task.Description}</p>
                                    <span>Due: {task.DueDate}</span>
                                    <span style={{ marginLeft: "10px", fontWeight: "bold", color: "green" }}>Status: Finished</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default FinishedTaskList;
