import React, { useState, useEffect, useRef } from "react";
import TaskTable from "./TaskTable";
import service from "../../services/API";

function Home() {
  const [userdata, setUserdata] = useState([]);
  const [priority, setPriority] = useState("");

  const loadData = async () => {
    const response = await service.homeget();
    const filtered = response.data.map((val) => {
      const duedate = new Date(val.duedate);
      const currentDate = new Date();
      const dueDateTime = duedate.getTime();
      const diff = dueDateTime - currentDate.getTime();

      val.remaining = Math.max(Math.round(diff / (1000 * 60 * 60 * 24)), 1);
      return val;
    });

    setUserdata(filtered);
  };

  useEffect(() => {
    loadData();
  }, []);

  const completedTask = userdata.filter((a) => {
    return a.status === "completed";
  });

  const highPriorityTasks = userdata.filter((a) => {
    return a.priority === "high";
  });

  const sessionuser = sessionStorage.getItem("useremail");

  return (
    <>
      <div className="routes">
        <div className="center cTask"></div>
        <h2 id="high-priority-tasks">High Priority Task</h2>

        <TaskTable
          tasks={highPriorityTasks}
          sessionuser={sessionuser}
          priority="high"
          headers={[
            "Task Name",
            "Description",
            "Due Date",
            "Remaining Days",
            "Status",
          ]}
        />
        <h2 id="completed-tasks">Completed Task</h2>

        <div>
          <TaskTable
            tasks={completedTask}
            sessionuser={sessionuser}
            status="completed"
            headers={[
              "Task Name",
              "Description",
              "Due Date",
              "Remaining Days",
              "Status",
            ]}
          />
        </div>

        <div>
          <h2 style={{ color: "black" }} id="categorize-tasks">
            Categorize Your Tasks Here!
          </h2>

          <select
            className="form-control category"
            id="category"
            name="taskName"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Pending</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <TaskTable
          tasks={userdata}
          sessionuser={sessionuser}
          priority={priority}
          headers={[
            "Task Name",
            "Description",
            "Due Date",
            "Remaining Days",
            "Status",
          ]}
        />
      </div>
    </>
  );
}

export default Home;
