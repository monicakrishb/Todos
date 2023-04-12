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
        const currentDate = new Date();
        const dueDateTime = duedate.getTime();
        const diff = dueDateTime - currentDate.getTime();
        val.remaining = Math.round(diff / (1000 * 60 * 60 * 24));
        return val;
      });
      setUserdata(filtered);
    });
  };

  const completedTask = userdata.filter((e) => {
    return e.status == "completed";
  });
  const colorChanger = () => {
    if (userdata.status == "completed") {
      setTaskColour("red");
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
          <button
            class="material-symbols-outlined"
            id="add"
            onClick={() => {
              navigate("/create");
            }}
          >
            add
          </button>
          <br />
          <h4 id="add">Add a task</h4>
        </div>
      </div>

      <h3>High Priority Task</h3>

      <table id="customers">
        <tr>
          <th>Task Name</th>
          <th>Description</th>
          <th>Duedate</th>
          <th>Remaining Days</th>
          <th>Status</th>
        </tr>
        {highPriorityTasks
          .filter((e) => {
            if (e.useremail == sessionuser) {
              return e;
            }
          })
          .map((e) => (
            <tr>
              <td
                id="taskname"
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
                {e.taskname}
              </td>
              <td>{e.description}</td>
              <td>{e.duedate} </td>
              <td>{e.remaining}</td>
              <td>{e.status}</td>
            </tr>
          ))}
      </table>

      <h3>Completed Task</h3>

      <div className="listoftasks">
        <table id="customers">
          <tr>
            <th>Task Name</th>
            <th>Description</th>
            <th>Duedate</th>
            <th>Remaining Days</th>
            <th>Status</th>
          </tr>

          {completedTask
            .filter((e) => {
              if (e.useremail === sessionuser) {
                return e;
              }
            })
            .map((e) => {
              console.log(e);
              return (
                <tr>
                  <td
                    id="taskname"
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
                    {e.taskname}
                  </td>
                  <td>{e.description}</td>
                  <td>{e.duedate} </td>
                  <td>{e.remaining}</td>
                  <td>{e.status}</td>
                </tr>
              );
            })}
        </table>
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
      <table id="customers">
        <tr>
          <th>Task Name</th>
          <th>Description</th>
          <th>Duedate</th>
          <th>Remaining Days</th>
          <th>Status</th>
        </tr>
        {userdata &&
          userdata
            .filter((e) => {
              if (e.useremail == sessionuser && e.priority == priority) {
                return e;
              }
            })
            .map((e) => (
              <tr>
                <td
                  id="taskname"
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
                  {e.taskname}
                </td>
                <td id="taskDesc">{e.description}</td>
                <td id="taskDate">{e.duedate} </td>
                <td id="taskRemain">{e.remaining}</td>
                <td id="taskStatus">{e.status}</td>
              </tr>
            ))}
      </table>
    </>
  );
};
