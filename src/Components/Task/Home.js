import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/create.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  useEffect(() => {
    loadData();
    colorChanger();
  }, []);

  const [userdata, setUserdata] = useState([]);
  const [priority, setPriority] = useState("");
  const [taskcolour, setTaskColour] = useState("");
  const navigate = useNavigate();

  const completedTask = userdata.filter((e) => {
    return e.status == "completed";
  });
  const colorChanger = () => {
     
    if (userdata.status == "completed") {
      setTaskColour("green");
      console.log(taskcolour);
    } else if (userdata.status == "inprogress") {
      setTaskColour("orange");
    } else {
      setTaskColour("grey");
    }
    console.log(taskcolour);
  };
  const loadData = async () => {
    const response = await axios.get("http://localhost:8000/task");
    setUserdata(response.data);
    console.log(userdata);
    console.log(response.data);
  };
  const highPriorityTasks = userdata.filter((a) => {
    return a.priority == "high";
  });
  console.log(highPriorityTasks);
  function Delete(e) {
    axios.delete("http://localhost:8000/task/" + e);
    loadData();
  }

 
  return (
    <>
      <div>
        <div className="task-container high" >
        <h1>High Priority Task</h1>
          {highPriorityTasks.map((e) => (
            <div>
              <h4>
                <tr key={e.taskname}> 
                  <td>{e.description}</td>
                  <td>{e.priority}</td>
                  <td>{e.duedate}</td>
                  <td>{e.id}</td>
                  <td>{e.status}</td>
                </tr>
              </h4>
            </div>
          ))}
        </div>

        <div className="task-container high">
        <h1>Completed Task</h1>
          {completedTask.map((e) => (
            <div>
              <h4>
                <tr key={e.taskname}>
                  <td>{e.description}</td>
                  <td>{e.priority}</td>
                  <td>{e.duedate}</td>
                  <td>{e.id}</td>
                  <td>{e.status}</td>
                </tr>
              </h4>
            </div>
          ))}
        </div>
        <div className="high">
          <h3 style={{ color: "black" }}>Categorize Your Tasks Here!</h3>
          <select
            className="form-control category"
            id="category"
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

        <div className="task-container">
          {userdata &&
            userdata
              .filter((e) => e.priority == priority)
              .map((e) => (
                <tr key={e.taskname}>
                  <td>{e.description}</td>
                  <td>{e.priority}</td>
                  <td>{e.duedate}</td>
                  <td>{e.id}</td>
                  <td>{e.status}</td>
                </tr>
              ))}
        </div>
      </div>
      <div>

<div className='high' id="create">
  <h1>Create New Tasks Here!</h1>
 <button
            onClick={() => {
              navigate("/create");
            }}
            
            
          >
            create
          </button>

</div>
     

        <div className="container">
        

          <div >
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Duedate</th>
              <th>Id</th>
              <th>Status</th>
              <th>Action</th>
              <th>Action</th>
              {/* <th>Status</th> */}
            </tr>

            {userdata.map((e) => (
              <tr key={e.taskname}>
                <td style={{backgroundColor:e.status=="inprogress"?"orange":e.status==="completed"?"green":"grey"}} >{e.taskname}</td>
                <td>{e.description}</td>
                <td >{e.priority}</td>
                <td>{e.duedate}</td>
                <td>{e.id}</td>
                <td>{e.status }</td>
                <td>
                  <button
                    className="editbutton"
                    onClick={() => {
                      navigate("edit/" + e.id);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="editbutton"
                    onClick={() => {
                      Delete(e.id);
                    }}
                  >
                    {" "}
                    Delete
                  </button>
                </td>
                {/* <td>
                  <select
                    id="select"
                    className="form-control"
                    name="taskName"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option>set status</option>

                    <option value="completed">Completed</option>

                    <option value="inprogress">Inprogress</option>
                    <option value="cancelled">cancelled</option>
                  </select>
                </td> */}
              </tr>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
