import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/API";
import "../styles/create.css";

export const Tasklist = ({ setTask }) => {
  const [userdata, setUserdata] = useState([]);
  const navigate = useNavigate();
  const sessionuser = sessionStorage.getItem("useremail");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await service.homeget();
    const filtered = response.data.map((val) => {
      const duedate = new Date(val.duedate);
      const currentDate = new Date();
      const dueDateTime = duedate.getTime();
      const diff = dueDateTime - currentDate.getTime();
      val.remaining = Math.round(diff / (1000 * 60 * 60 * 24));
      return val;
    });
    setUserdata(filtered);
  };

  const headerNames = [
    "Task Name",
    "Description",
    "Priority",
    "Duedate",
    "Remaining Days",
    "Status",
    "Action",
    "Action",
  ];

  function Delete(id) {
    service.delete(id);
    loadData();
  }

  return (
    <>
      <div className="routes">
        <div className="center cTask"></div>
        <h2 id="tasklist">List Of Tasks</h2>

        <table id="task">
          <thead>
            <tr>
              {headerNames.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userdata
              .filter((e) => {
                if (e.useremail === sessionuser) {
                  return e;
                }
              })
              .map((e, index) => (
                <tr key={index}>
                  <td
                    id="taskname"
                    className="allTask"
                    style={{
                      background:
                        e.status === "inprogress"
                          ? "orange"
                          : e.status === "completed"
                          ? "green"
                          : e.status==="pending"? "white":"grey"
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
          </tbody>
        </table>
      </div>
    </>
  );
};
