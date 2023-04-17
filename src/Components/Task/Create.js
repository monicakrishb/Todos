import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/API";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/create.css";

export const Create = ({ data }) => {
  const navigate = useNavigate();

  const [taskname, setTaskName] = useState(data && data.taskname);
  const [description, setDescription] = useState(data && data.description);
  const [priority, setPriority] = useState(data && data.priority);
  const [status, setStatus] = useState(data && data.status);
  const [startDate, setStartDate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState("");

  const useremail = sessionStorage.getItem("useremail");
  console.log(useremail);
  console.log(data);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data) {
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
      const validate = (taskname) => {
        if (!taskname) {
          return "Taskname is required.";
        }
        if (taskname.length < 5) {
          return "Taskname must be atleast 5 characters long.";
        }
        return "";
      };
      const errorMessage = validate(taskname);
      if (errorMessage) {
        setErrorMessage(errorMessage);
        return;
      }
      console.log(obj);
      try {
        await service.createpost(obj);
        navigate("/tasklist");
      } catch (err) {
        console.log(err);
      }
    } else {
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
        await service.editput(data.id, obj);
        loadData();
        navigate("/tasklist");
      } catch (err) {
        console.log(err);
      }
    }
  };
  const loadData = async () => {
    if (data) {
      try {
        const response = await service.editget(data.id);
        console.log(response.data);
        setTaskName(response.data.taskname);
        setDescription(response.data.description);
        setPriority(response.data.priority);
        setStartDate(response.data.toDateString());
        setStatus(response.data.status);
      } catch (err) {
        console.log(err);
      }
    }
  };
  {
    const handleChange = (event) => {
      setTaskName(event.target.value);
      setErrorMessage("");
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
                  onChange={(e) =>
                    setTaskName(e.target.value) & handleChange(e)
                  }
                  name="taskName"
                  id="task"
                />
              </div>
              {errorMessage && <div className="error">{errorMessage}</div>}
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
                  <option value="pending">Pending</option>

                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              {data ? (
                <div className="form-control">
                  <label className="status">Status</label>

                  <select
                    defaultValue={data && data.status}
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
              ) : (
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
              )}

              <div className="form-control">
                <label className="duedate">
                  <h4>Duedate</h4>
                </label>
                <DatePicker
                  id="datepic"
                  placeholderText="due date"
                  minDate={data ? new Date(data.duedate) : startDate}
                  defaultValue={data && data.duedate}
                  dateFormat="MMMM d, yyyy"
                  selected={data ? new Date(data.duedate) : startDate}
                  selectsStart
                  startDate={data ? new Date(data.duedate) : startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
              <input type="submit" data-testid={"addme"} id="fsubmit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
};
