import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const Edit = () => {
  const params = useParams();
  const v = params.id;

  useEffect(() => {
    loadData();
  }, []);

  const [userdata, setUserdata] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:8000/task/" + v);
    console.log(response.data);
    setUserdata(response.data);
    setTaskName(response.data.taskname);
    setDescription(response.data.description);
    setPriority(response.data.priority);
    setDuedate(response.data.duedate);
    status(response.data.setStatus);

    console.log(userdata);
  };

  const [taskname, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [duedate, setDuedate] = useState("");
  const [status, setStatus] = useState("");
const navigate=useNavigate();

  const handleSubmit = () => {
    const obj = {
      taskname: taskname,
      description: description,
      priority: priority,
      duedate: duedate,
      status: status,
    };

    axios.put("http://localhost:8000/task/" + v, obj);
    loadData();
    navigate("/");
  };

  return (
    <div>
      hello
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Task Name</label>
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
            onChange={(e) =>setStatus(e.target.value)}
          >
            <option>pending</option>

            <option value="completed">Completed</option>

            <option value="inprogress">Inprogress</option>
            <option value="cancelled">cancelled</option>
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
  );
};
