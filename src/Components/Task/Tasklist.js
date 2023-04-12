import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/create.css";
import { useNavigate } from "react-router-dom";
import service from "../../services/API";

export const Tasklist = ({ setTask }) => {
  useEffect(() => {
    loadData();
    colorChanger();
    dueStatus();
  }, []);

  const [userdata, setUserdata] = useState([]);
  const [taskcolour, setTaskColour] = useState("");

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
              <td className="tdata">{e.description}</td>
              <td className="tdata"> {e.priority}</td>
              <td className="tdata">{e.duedate} </td>
              <td className="tdata">{e.remaining}</td>
              <td className="tdata">{e.status}</td>
              <td className="tdata">
                <button
                  id="edit"
                  className="editbutton material-symbols-outlined"
                  onClick={() => {
                    setTask(e);
                    navigate("/edit");
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
