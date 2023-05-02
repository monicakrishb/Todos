import React, { useState } from "react";
import * as d3 from "d3";
import { pie } from "d3";
import { useRef } from "react";
import { useEffect } from "react";
import service from "../../services/API";

export default function Dropdown() {
  const [userdata, setUserdata] = useState([]);
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

  const [selectedYear, setSelectedYear] = useState(2023);
  const [selectedWeek, setSelectedWeek] = useState(1);

  useEffect(() => {
    const completedCount = userdata.filter((a) => {
      if (
        a.status === "completed" &&
        selectedYear === Number(a.duedate.slice(0, 4)) &&
        a.useremail == sessionStorage.getItem("useremail")
      ) {
        return (
          a.status === "completed" &&
          a.useremail == sessionStorage.getItem("useremail")
        );
      }
    }).length;
    console.log(completedCount);
    const inProgressCount = userdata.filter((a) => {
      if (
        a.status === "inprogress" &&
        selectedYear === Number(a.duedate.slice(0, 4)) &&
        a.useremail == sessionStorage.getItem("useremail")
      ) {
        return (
          a.status === "inprogress" &&
          a.useremail == sessionStorage.getItem("useremail")
        );
      }
    }).length;
    const cancelledCount = userdata.filter((a) => {
      if (
        a.status === "cancelled" &&
        selectedYear === Number(a.duedate.slice(0, 4)) &&
        a.useremail == sessionStorage.getItem("useremail")
      ) {
        return (
          a.status === "cancelled" &&
          a.useremail == sessionStorage.getItem("useremail")
        );
      }
    }).length;
    const pendingCount = userdata.filter((a) => {
      if (
        a.status === "pending" &&
        selectedYear === Number(a.duedate.slice(0, 4)) &&
        a.useremail == sessionStorage.getItem("useremail")
      ) {
        return (
          a.status === "pending" &&
          a.useremail == sessionStorage.getItem("useremail")
        );
      }
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
  }, [selectedYear]);
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


  const getWeekDates = (year, week) => {
    const date = new Date(year, 0, 1 + (week - 1) * 7);
    const startDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const endDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 6
    );

    return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
  };

  const weekOptions = [];
  for (let i = 1; i <= 52; i++) {
    weekOptions.push(
      <option key={i} value={i}>
        Week {i} ({getWeekDates(selectedYear, i)})
      </option>
    );
  }

  const yearOptions = [];
  for (let i = 2020; i <= 2030; i++) {
    yearOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const handleWeekChange = (event) => {
    setSelectedWeek(parseInt(event.target.value));
  };

  return (
    <div>
      <div className="routes">
        <label htmlFor="year-select">Year:</label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={handleYearChange}
        >
          <br />
          <br />
          <br />
          <br />
          <br />
          {console.log("year", yearOptions)}
          {console.log(selectedYear)}

          {yearOptions}
          {selectedYear}
        </select>
        <div>
          <label htmlFor="week-select">Week:</label>
          <select
            id="week-select"
            value={selectedWeek}
            onChange={handleWeekChange}
          >
            <br />
            <br />
            <br />
            <br />
            <br />

            {weekOptions}
          </select>
        </div>
        <div id="pie">
          <svg ref={svgRef} id="ref"></svg>
        </div>
      </div>
    </div>
  );
}
