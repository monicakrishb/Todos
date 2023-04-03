import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/create.css";
import service from "../../services/API";

export const Create = () => {
  const navigate = useNavigate();

  const [taskname, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  const [duedate, setDuedate] = useState("");
  const useremail = sessionStorage.getItem("useremail");
  console.log(useremail);

  const handleSubmit = async () => {
    const obj = {
      taskname: taskname,
      description: description,
      priority: priority,
      duedate: duedate,
      status: status,
      taskcolour: status,
      useremail: useremail,
      currentDate: new Date(),
    };
    console.log(obj);
    await service.createpost(obj);
    navigate("/tasklist");
    // await axios.post("http://localhost:8000/task/", obj);
  };

  return (
    <div>
      <div className="container form">
        <div className="" id="form">
          <form className="create-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="lab" >
                Task Name
              </label>
              <input
                type="text"
                className="form-control task"
                value={taskname}
                onChange={(e) => setTaskName(e.target.value)}
                name="taskName"
                id="task"
              />
            </div>
            <div className="form-group">
              <label  className="des">
                Description
              </label>
              <textarea
                rows="5"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                id="text"
              ></textarea>
            </div>
            <div className="form-group">
              <label className="priority" >
                Priority
              </label>
              <select
                value={priority}
                className="form-control"
                name="priority"
                onChange={(e) => setPriority(e.target.value)}
                id="pinput"
              >
                <option>Pending</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="form-control">
              <label className="status">
                Status
              </label>
              <select
                id="select"
                className="form-control"
                name="taskName"
                onClick={(e) => setStatus(e.target.value)}
              >
                <option>Pending</option>
                <option value="completed">Completed</option>
                <option value="inprogress">Inprogress</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="form-group">
              <label className="lab" id="due">
                Duedate
              </label>
              <input
                type="date"
                className="form-control"
                value={duedate}
                onChange={(e) => setDuedate(e.target.value)}
                name="taskName"
                id="date"
              />
            </div>
            <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};
