import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/create.css";
import { useNavigate } from "react-router-dom";

export const Task = () => {
  useEffect(() => {
    loadData();
    colorChanger();
    dueStatus();
  }, []);

  const [userdata, setUserdata] = useState([]);
  const [priority, setPriority] = useState("");
  const [taskcolour, setTaskColour] = useState("");
  const [duestatus, setDuestatus] = useState("");
  const navigate = useNavigate();

  const loadData = async () => {
    const response = await axios
      .get("http://localhost:8000/task")
      .then((response) => {
        const filtered = response.data.map((val) => {
          const duedate = new Date(val.duedate);
          const currentDate = new Date();
          const dueDateTime = duedate.getTime();
          const diff = dueDateTime - currentDate.getTime();
          val.remaining = Math.round(diff / (1000 * 60 * 60 * 24));
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

  const date = new Date();

  const dueStatus = () => {
    loadData();
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
      {/* <div className="highandcomplete"> */}
      <div className="center cTask">
        <h3>Create Your Task Here</h3>
        <div className="box addTask">
          <span
            class="material-symbols-outlined"
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
            {highPriorityTasks.map((e) => (
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
            {completedTask.map((e) => (
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
            ))}
          </div>
        </div>
      </div>

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
      <div className="high">
        <div className="task-container">
          {userdata &&
            userdata
              .filter((e) => e.priority == priority)
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

      <h1>List Of Tasks</h1>
      <div className="partsec">
        {/* <div className="center">

        
        <h1>Create Your Task Here</h1>
        <div className="box addTask">
          <span
            class="material-symbols-outlined"
            onClick={() => {
              navigate("/create");
            }}
          >
            add
          </span>{" "}
          <h4 id="add">Add a task</h4>
        </div>
</div> */}
        <div className="container">
          {/* <div
          
          >
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Duedate</th>
              <th>Remaining Days</th>
              <th>Status</th>
              <th>Action</th>
              <th>Action</th>
            </tr>

            {userdata.map((e) => (
              <tr key={e.taskname}>
                <td
                  className="taskname"
                  style={{
                    color:
                      e.status == "inprogress"
                        ? "orange"
                        : e.status === "completed"
                        ? "green"
                        : "grey",
                  }}
                >
                  {e.taskname}
                </td>
                <td>{e.description}</td>
                <td>{e.priority}</td>
                <td>{e.duedate} </td>
                <td>{e.remaining}</td>
                <td>{e.status}</td>
                <td>
                  <button
                    id="edit"
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
                    id="edit"
                    className="editbutton"
                    onClick={() => {
                      Delete(e.id);
                    }}
                  >
                    {" "}
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </div> */}
          <div className="listoftasks">
            {userdata.map((e) => (
              <div
                className="allTask"
                style={{
                  background:
                    e.status == "inprogress"
                      ? "orange"
                      : e.status === "completed"
                      ? "green"
                      : "grey",
                }}
              >
                <span key={e.taskname}>
                  {" "}
                  <br />
                  <span
                    className="taskname"
                    // style={{
                    //   color:
                    //     e.status == "inprogress"
                    //       ? "orange"
                    //       : e.status === "completed"
                    //       ? "green"
                    //       : "grey",
                    // }}
                  >
                    Task Name :{e.taskname}
                  </span>
                  <br />
                  <span>Description :{e.description}</span>
                  <br />
                  <span> Priority :{e.priority}</span>
                  <br />
                  <span>Duedate :{e.duedate} </span>
                  <br />
                  <span>Remaining Days :{e.remaining}</span>
                  <br />
                  <span>Status :{e.status}</span>
                  <br />
                  <span>
                    <span
                      id="edit"
                      className="editbutton material-symbols-outlined"
                      onClick={() => {
                        navigate("edit/" + e.id);
                      }}
                    >
                      Edit
                    </span>
                  </span>
                  <span>
                    <span
                      id="edit"
                      className="editbutton  material-symbols-outlined"
                      onClick={() => {
                        Delete(e.id);
                      }}
                    >
                      {" "}
                      Delete
                    </span>
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
