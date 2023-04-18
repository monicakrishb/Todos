import React, { useState, useEffect } from "react";
import TaskTable from "./TaskTable";
import service from "../../services/API";

function Home() {
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

  const completedTask = userdata.filter((a) => {
    return a.status == "completed";
  });

  const highPriorityTasks = userdata.filter((a) => {
    return a.priority == "high";
  });

  const sessionuser = sessionStorage.getItem("useremail");

  return (
    <div className="routes">
      <div className="center cTask"></div>
      <h3>High Priority Task</h3>

      <TaskTable
        tasks={highPriorityTasks}
        sessionuser={sessionuser}
        priority="high"
        headers={["Task Name", "Description", "Due Date", "Remaining Days", "Status"]}
      />
      <h3>Completed Task</h3>

      <div>
        <TaskTable
          tasks={completedTask}
          sessionuser={sessionuser}
          status="completed"
          headers={["Task Name", "Description", "Due Date", "Remaining Days", "Status"]}
        />
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

      <TaskTable
        tasks={userdata}
        sessionuser={sessionuser}
        priority={priority}
        headers={["Task Name", "Description", "Due Date", "Remaining Days", "Status"]}
      />
    </div>
  );
}

export default Home;
