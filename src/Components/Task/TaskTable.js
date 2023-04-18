import React from "react";
import "../styles/create.css";

function TaskTable({ tasks, sessionuser, priority, status, headers }) {
  return (
    <table id="task">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tasks

          .filter((e) => {
            if (e.useremail == sessionuser && e.priority == priority) {
              return e;
            }
          })
          .map((e) => (
            <tr key={e.id}>
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
        {tasks

          .filter((e) => {
            if (e.useremail == sessionuser && e.status == status) {
              return e;
            }
          })
          .map((e) => (
            <tr key={e.id}>
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
      </tbody>
    </table>
  );
}

export default TaskTable;
