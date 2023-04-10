import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/create.css";
import service from "../../services/API";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Create = () => {
  const navigate = useNavigate();

  const [taskname, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const useremail = sessionStorage.getItem("useremail");
  console.log(useremail);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      taskname: taskname,
      description: description,
      priority: priority,
      duedate: startDate.toDateString(),
      status: status,
      taskcolour: status,
      useremail: useremail,
      currentDate: new Date(),
    };
    console.log(obj);
    try {
      await service.createpost(obj);
      navigate("/tasklist");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="wholedate">
      <div>
        <div id="form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="lab">Task Name</label>
              <input
                type="text"
                value={taskname}
                onChange={(e) => setTaskName(e.target.value)}
                name="taskName"
                id="task"
              />
            </div>
            <div>
              <label className="des">Description</label>
              <textarea
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                id="text"
              ></textarea>
            </div>
            <div className="form-group">
              <label className="priority">Priority</label>
              <select
                value={priority}
                name="priority"
                onChange={(e) => setPriority(e.target.value)}
                id="pinput"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="form-control">
              <label className="status">Status</label>
              <select
                disabled
                id="select"
                name="taskName"
                onClick={(e) => setStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="inprogress">Inprogress</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="form-control">
              <label className="duedate">
                <h4>Duedate</h4>
              </label>
              <DatePicker
                id="datepic"
                placeholderText="due date"
                minDate={startDate}
                dateFormat="MMMM d, yyyy"
                selected={startDate}
                selectsStart
                startDate={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <input type="submit" data-testid={"addme"} id="fsubmit" />
          </form>
        </div>
      </div>
    </div>
  );
};
