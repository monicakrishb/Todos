import React, { useEffect, useState } from "react";
import service from "../../services/API";
import TaskTableHeader from "./TaskTableHeader";
import "../styles/create.css";

export const Task = () => {
  useEffect(() => {
    loadData();
  }, []);

  const [userdata, setUserdata] = useState([]);
  const [priority, setPriority] = useState("");

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

  const highPriorityTasks = userdata.filter((a) => {
    return a.priority == "high";
  });

  const sessionuser = sessionStorage.getItem("useremail");

  return (
    <>
      <div className="routes">
        <div className="center cTask"></div>

        <h3>High Priority Task</h3>

        <table id="customers">
          <TaskTableHeader />

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

        <div>
          <table id="customers">
            <TaskTableHeader />

            {completedTask
              .filter((e) => {
                if (e.useremail === sessionuser) {
                  return e;
                }
              })
              .map((e) => {
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
          <TaskTableHeader />

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
                  <td>{e.description}</td>
                  <td>{e.duedate} </td>
                  <td>{e.remaining}</td>
                  <td>{e.status}</td>
                </tr>
              ))}
        </table>
      </div>
    </>
  );
};
