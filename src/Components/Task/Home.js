import React, { useEffect, useState } from "react";
import "../styles/create.css";
import { useNavigate } from "react-router-dom";
import service from "../../services/API";

export const Task = () => {
  useEffect(() => {
    loadData();
    colorChanger();
    dueStatus();
  }, []);

  const [userdata, setUserdata] = useState([]);
  const [priority, setPriority] = useState("");
  const [taskcolour, setTaskColour] = useState("");
  const navigate = useNavigate();

  const loadData = async () => {
    const response = await service.homeget().then((response) => {
      const filtered = response.data.map((val) => {
        const duedate = new Date(val.duedate);

        return val;
      });
      setUserdata(filtered);
      console.log(filtered);
    });
  };

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

  const dueStatus = () => {
    loadData();
  };

  const highPriorityTasks = userdata.filter((a) => {
    return a.priority == "high";
  });
  console.log(highPriorityTasks);

  const sessionuser = sessionStorage.getItem("useremail");

  return (
    <>
      <div className="center cTask">
        <h3>Create Your Task Here</h3>
        <div className="box addTask">
          <span
            class="material-symbols-outlined" id="add"
            onClick={() => {
              navigate("/create");
            }}
          >
            add
          </span>{" "}
          <br />
          <h4 id="add">Add a task</h4>
        </div>
      </div>
      <div className="highandcomplete">
        <div className="task-container high" id="High">
          <h3>High Priority Task</h3>

          <div className="whole">
            {highPriorityTasks
              .filter((e) => {
                if (e.useremail == sessionuser) {
                  return e;
                }
              })
              .map((e) => (
                <div
                  className="box"
                  style={{
                    background:
                      e.status == "inprogress"
                        ? "orange"
                        : e.status === "completed"
                        ? "green"
                        : "grey",
                  }}
                >
                  <h4>
                    <span>{e.taskname}</span> <br />
                    <span>{e.description}</span> <br />
                    <span>{e.duedate}</span>
                    <br />
                  </h4>
                </div>
              ))}
          </div>
        </div>

        <div className="task-container high" id="complete">
          <h3>Completed Task</h3>
          <div className="whole">
            {completedTask
              .filter((e) => {
                if (e.useremail === sessionuser) {
                  return e;
                }
              })
              .map((e) =>{ 
                console.log(e);
                return(
                <div
                  className="box"
                  style={{
                    background:
                      e.status == "inprogress"
                        ? "orange"
                        : e.status === "completed"
                        ? "green"
                        : "grey",
                  }}
                >
                  <h4>
                    <span>{e.taskname}</span> <br />
                    <span>{e.description}</span> <br />
                    <span>{e.priority}</span> <br />
                    <span>{e.duedate}</span> <br />
                  </h4>
                </div>
              )})}
          </div>
        </div>
      </div>
      <div>
        <h3 style={{ color: "black" }}>Categorize Your Tasks Here!</h3>
        <select
          className="form-control category"
          id="category"
          name="taskName"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Pending</option>

          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div className="high">
        <div className="task-container">
          {userdata &&
            userdata
              .filter((e) => {
                if (e.useremail == sessionuser && e.priority == priority) {
                  return e;
                }
              })
              .map((e) => (
                <div className="whole">
                  <div
                    className="box"
                    style={{
                      background:
                        e.status == "inprogress"
                          ? "orange"
                          : e.status === "completed"
                          ? "green"
                          : "grey",
                    }}
                  >
                    
                    <h4>
                      <span>{e.taskname}</span> <br />
                      <span>{e.description}</span> <br />
                      <span>{e.priority}</span> <br />
                      <span>{e.duedate}</span> <br />
                    </h4>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};
