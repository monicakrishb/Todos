import React, { useState, useEffect, useRef } from "react";
import TaskTable from "./TaskTable";
import service from "../../services/API";
import * as d3 from "d3";
import { pie } from "d3";

function Home() {
  const [userdata, setUserdata] = useState([]);
  const [priority, setPriority] = useState("");
  const [data, setData] = useState([
    { property: "Completed", value: 0 },
    { property: "In Progress", value: 0 },
    { property: "Cancelled", value: 0 },
    { property: "Pending", value: 0 },
  ]);
  const svgRef = useRef();
  useEffect(() => {
    const completedCount = userdata.filter((a) => {
      return (
        a.status === "completed" &&
        a.useremail == sessionStorage.getItem("useremail")
      );
    }).length;
    console.log(completedCount);
    const inProgressCount = userdata.filter((a) => {
      console.log(
        a.status === "inprogress" &&
          a.useremail == sessionStorage.getItem("useremail")
      );
      return (
        a.status === "inprogress" &&
        a.useremail == sessionStorage.getItem("useremail")
      );
    }).length;
    const cancelledCount = userdata.filter((a) => {
      return (
        a.status === "cancelled" &&
        a.useremail == sessionStorage.getItem("useremail")
      );
    }).length;
    const pendingCount = userdata.filter((a) => {
      return (
        a.status === "pending" &&
        a.useremail == sessionStorage.getItem("useremail")
      );
    }).length;

    setData([
      { property: `Completed ${completedCount}%`, value: completedCount },
      { property: `In Progress ${inProgressCount}%`, value: inProgressCount },
      { property: `Cancelled ${cancelledCount}%`, value: cancelledCount },
      { property: `Pending ${pendingCount}%`, value: pendingCount },
    ]);
  }, [userdata]);

  useEffect(() => {
    const w = 500;
    const h = 500;
    const radius = w / 2;
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("overflow", "visible");
    const formattedData = pie().value((d) => d.value)(data);
    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);
    const color = d3.scaleOrdinal().range(d3.schemeSet2);


    svg
      .selectAll()
      .data(formattedData)
      .join("path")
      .attr("d", arcGenerator)
      .attr("fill", (d) => color(d.data.property))
      .style("opacity", 1);

    svg
      .selectAll()
      .data(formattedData)
      .join("text")
      .text((d) => d.data.property)
      .attr("transform", (d) => `translate(${arcGenerator.centroid(d)})`)
      .style("text-anchor", "middle")
      .style("font-size", "16px")
      .style("fill", "white");
  }, [data]);

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
        <div id="pie">
          <svg ref={svgRef}></svg>
        </div>
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
