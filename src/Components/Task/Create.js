import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/create.css";
import "../styles/create.css";

export const Create = () => {
  const navigate = useNavigate();

  const [taskname, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");


  const [duedate, setDuedate] = useState("");
  

  const handleSubmit = () => {
 
    const obj = {
      taskname: taskname,
      description: description,
      priority: priority,
      duedate: duedate,
      status: status,
      taskcolour:status
    };

    axios.post("http://localhost:8000/task/", obj);
    navigate("/");
  };

  return (
    <div>
      <div className="container">
        <div className="" id="form">
          <form className="create-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="lab">Task Name</label>
              <input
                type="text"
                className="form-control"
                value={taskname}
                onChange={(e) => setTaskName(e.target.value)}
                name="taskName"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                rows="5"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
              ></textarea>
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select
                className="form-control"
                name="taskName"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>set task priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="form-control">
              <label>Status</label>
              <select
                id="select"
                className="form-control"
                name="taskName"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="completed">Completed</option>
                <option value="inprogress">Inprogress</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="form-group">
              <label>Duedate</label>
              <input
                type="date"
                className="form-control"
                value={duedate}
                onChange={(e) => setDuedate(e.target.value)}
                name="taskName"
              />
            </div>
            <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};
