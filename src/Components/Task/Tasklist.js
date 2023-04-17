import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import service from "../../services/API";
import "../styles/create.css";

export const Tasklist = ({ setTask }) => {
  useEffect(() => {
    loadData();
  }, []);

  const [userdata, setUserdata] = useState([]);

  const navigate = useNavigate();
  const sessionuser = sessionStorage.getItem("useremail");

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
      <h1>List Of Tasks</h1>

      <table id="customers">
        <tr>
          <th>Task Name</th>
          <th>Description</th>
          <th>Priority</th>
          <th>Duedate</th>
          <th>Remaining Days </th>
          <th>Status</th>
          <th>Action</th>
          <th>Action</th>
        </tr>
        {userdata
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
              <td> {e.priority}</td>
              <td>{e.duedate} </td>
              <td>{e.remaining}</td>
              <td>{e.status}</td>
              <td>
                <button
                  id="edit"
                  className="editbutton material-symbols-outlined"
                  onClick={() => {
                    setTask(e);
                    navigate("/create");
                  }}
                >
                  Edit
                </button>
              </td>
              <td className="tdata">
                <button
                  id="edit"
                  className="editbutton  material-symbols-outlined"
                  onClick={() => {
                    Delete(e.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </table>
    </>
  );
};
