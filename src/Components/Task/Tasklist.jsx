import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/API";
import "../styles/create.css";
import * as d3 from "d3";
import { pie } from "d3";

export const Tasklist = ({ setTask }) => {
  const [userdata, setUserdata] = useState([]);
  const navigate = useNavigate();
  const sessionuser = sessionStorage.getItem("useremail");
  const [data, setData] = useState([
    {
      property: "Completed",
      value: 0,
    },

    { property: "In Progress", value: 0 },
    { property: "Cancelled", value: 0 },
    { property: "Pending", value: 0 },
  ]);
  const svgRef = useRef();

  useEffect(() => {
    const completedCount = userdata.filter((a) => {
      if (
        a.status === "completed" &&
        a.useremail == sessionStorage.getItem("useremail")
      ) {
        console.log(a.duedate);
      }
      return (
        a.status === "completed" &&
        a.useremail == sessionStorage.getItem("useremail")
      );
    }).length;
    console.log(completedCount);
    const inProgressCount = userdata.filter((a) => {
      if (
        a.status === "cancelled" &&
        a.useremail == sessionStorage.getItem("useremail")
      ) {
        console.log(a.duedate);
      }
      return (
        a.status === "inprogress" &&
        a.useremail == sessionStorage.getItem("useremail")
      );
    }).length;
    const cancelledCount = userdata.filter((a) => {
      if (
        a.status === "cancelled" &&
        a.useremail == sessionStorage.getItem("useremail")
      ) {
        console.log(a.duedate);
      }
      return (
        a.status === "cancelled" &&
        a.useremail == sessionStorage.getItem("useremail")
      );
    }).length;
    const pendingCount = userdata.filter((a) => {
      if (
        a.status === "pending" &&
        a.useremail === sessionStorage.getItem("useremail")
      ) {
        console.log(a.duedate);
        return true;
      }
      return false;
    }).length;

    setData([
      {
        property: completedCount == 0 ? "" : `Completed ${completedCount}%`,
        value: completedCount,
      },
      {
        property: inProgressCount == 0 ? "" : `In Progress ${inProgressCount}%`,
        value: inProgressCount,
      },
      {
        property: cancelledCount == 0 ? "" : `Cancelled ${cancelledCount}%`,
        value: cancelledCount,
      },
      {
        property: pendingCount == 0 ? "" : `Pending ${pendingCount}%`,
        value: pendingCount,
      },
    ]);
  }, [userdata]);

  useEffect(() => {
    const w = 500;
    const h = 500;
    const radius = w / 3;
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
  ];

  async function Delete(id) {
    try {
      await service.delete(id);
      loadData();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="routes">
        <div id="pie">
          <svg ref={svgRef} id="ref"></svg>
        </div>
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
                          : e.status === "pending"
                          ? "white"
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
                  <td className="actionBtns">
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
                  {/* <td className="tdata">
                    <button
                      id="edit"
                      className="editbutton  material-symbols-outlined"
                      onClick={() => {
                        Delete(e.id);
                      }}
                    >
                      Delete
                    </button>
                  </td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
