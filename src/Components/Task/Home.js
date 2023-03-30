import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/create.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
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
    const response = await axios.get("http://localhost:8000/task").then((response) => {
      setUserdata(response.data);
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let currentDate = `${day}-${month}-${year}`;
      const userdata = response.data;
      var today = new Date();

console.log("userdata is ",userdata);
console.log("today is ", today);

      var duedate = new Date(userdata[0].duedate);
      console.log(userdata[0].duedate);
      var diff = today.getTime() - duedate.getTime();
      console.log("diff is "+diff);
      var daydiff = diff / (1000 * 60 * 60 * 24);
      console.log("day diff is ",daydiff);
      const dateCheck = Math.round(daydiff);
      console.log("date check is ",dateCheck)
      if (dateCheck==0) {
        setDuestatus("today");
      } else if (dateCheck>0) {
        setDuestatus(`overdued by ${dateCheck}`);
      } else {
        setDuestatus(`Due by ${duedate}`);
      }
      console.log("due status is ",duestatus);

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



const date=new Date();

  
  const dueStatus = () => {
    loadData();
    // const date = new Date();

    // let day = date.getDate();
    // let month = date.getMonth() + 1;
    // let year = date.getFullYear();
    // let currentDate = `${day}-${month}-${year}`;
    // console.log(userdata);
    // var today = new Date();
    // var duedate = new Date(userdata.duedate);
    // console.log(today);
    // console.log(userdata.duedate);
    // var diff = today.getTime() - duedate.getTime();
    // console.log(diff);
    // var daydiff = diff / (1000 * 60 * 60 * 24);
    // console.log(daydiff);
    // var dateCheck = Math.round(daydiff);
    // console.log(dateCheck);
    // if (userdata.duedate == currentDate) {
    //   setDuestatus("today");
    //   console.log(duestatus);
    // } else if (userdata.status == currentDate) {
    //   setDuestatus("");
    // } else {
    //   setDuestatus("grey");
    // }
    // console.log(userdata.duedate);
    // console.log(duedate);
  };
  // const loadData = async () => {
  //   const response = await axios.get("http://localhost:8000/task");
  //   console.log(response.data);
  //   setUserdata(response.data);
  //   console.log(userdata);
  //   console.log(response.data);

  // };
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
        <div className="task-container high" id="High">
          <h1>High Priority Task</h1>
          {highPriorityTasks.map((e) => (
            <div className="box">
              <h4>
                {/* <tr id="date" key={e.taskname}>
                  <div className="tabrow">
                    <td className="com">{e.taskname}</td>

                    <td className="row">{e.description}</td>
                    <td className="row">{e.priority}</td>
                    <td className="row">{e.duedate}</td>
                    <td className="row">{e.status}</td>
                  </div>
                </tr> */}
                <span>{e.taskname}</span> <br />
                <span>{e.description}</span> <br />
                <span>{e.duedate}</span>
                <br />
              </h4>
            </div>
          ))}
        </div>

        <div className="task-container high">
          <h2>Completed Task</h2>
          {completedTask.map((e) => (
            <div className="box">
              <h4>
                {/* <tr key={e.taskname}>
                  <td className="com">{e.taskname}</td>
                  <td className="com">{e.description}</td>
                  <td className="com">{e.priority}</td>
                  <td className="com">{e.duedate}</td>
                  <td className="com">{e.id}</td>
                  <td className="com">{e.status}</td>
                </tr> */}
                <span>{e.taskname}</span> <br />
                <span>{e.description}</span> <br />
                <span>{e.priority}</span> <br />
                <span>{e.duedate}</span> <br />
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

          <div className="task-container">
            {userdata &&
              userdata
                .filter((e) => e.priority == priority)
                .map((e) => (
                  // <tr key={e.taskname}>
                  //   <td>{e.taskname}</td>
                  //   <td>{e.description}</td>
                  //   <td>{e.priority}</td>
                  //   <td>{e.duedate}</td>
                  //   <td>{e.status}</td>
                  // </tr>
                  <div className="box">
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
      <div>
        <div className="high" id="create">
          <h1>Create New Tasks Here!</h1>
          <button
            id="add"
            onClick={() => {
              navigate("/create");
            }}
          >
            <h3> Add a task</h3>
          </button>
        </div>

        <div className="container">
          <div>
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Duedate</th>

              <th>Status</th>
              <th>Action</th>
              <th>Action</th>
              {/* <th>Status</th> */}
            </tr>

            {userdata.map((e) => (
              <tr key={e.taskname}>
                <td
                  style={{
                    backgroundColor:
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
                <td>{ e.duedate} </td>
                <td>{e.status}</td>
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
              </tr>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
