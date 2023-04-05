import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/create.css";
import { useNavigate } from "react-router-dom";
import service from "../../services/API";

export const Tasklist = () => {
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
      console.log(filtered);
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
      <div className="partsec">
        <div className="container">
          <div className="listoftasks">
            {userdata
              .filter((e) => {
                if (e.useremail == sessionuser) {
                  return e;
                }
              })
              .map((e) => (
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
                    <span className="taskname">Task Name :{e.taskname}</span>
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
                      <button
                        id="edit"
                        className="editbutton material-symbols-outlined"
                        onClick={() => {
                          navigate("/task/edit/" + e.id);
                        }}
                      >
                        Edit
                      </button>
                    </span>
                    <span>
                      <button
                        id="edit"
                        className="editbutton  material-symbols-outlined"
                        onClick={() => {
                          Delete(e.id);
                        }}
                      >
                        {" "}
                        Delete
                      </button>
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
