// import React, { useState } from "react";

// function Dropdown() {
//   const [selectedOption, setSelectedOption] = useState("weekly");

//   const handleChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   return (
//     <div>
//       <br />
//       <br />

//       <br />

//       <br />

//       <br />
//       <br />
//       <br />

//       <label htmlFor="dropdown">Select an option: </label>
//       <select id="dropdown" value={selectedOption} onChange={handleChange}>
//         <option value="weekly">Weekly</option>
//         <option value="yearly">Yearly</option>
//       </select>
//       {selectedOption === "weekly" ? (
//         <div>
//           <label htmlFor="week-input">Enter a week number: </label>
//           <input
//             type="week"
//             name="week"
//             id="camp-week"
//             min="2020-W1"
//             max="2025-W52"
//             required
//           />
//         </div>
//       ) : (
//         <div>
//           <label htmlFor="year-input">Enter a year: </label>
//           <input id="year-input" type="number" min="1900" max="2099" />
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dropdown;
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/API";
import "../styles/create.css";
import * as d3 from "d3";
import { pie } from "d3";

export const Dropdown= ({ setTask }) => {
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

  const [selectedOption, setSelectedOption] = useState("weekly");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    if(event.target.value=='yearly'){
      yearly=true
      console.log(yearly);
    }
    else if (event.target.value=="weekly"){
      weekly=true
    }
console.log(WeeklycompletedDate.length,yearlycompletedDate.length);
  };

  // APR28
 

  let weekly;
  let yearly;

  let completedValue;
  let inprogressValue;
  let cancelledValue;
  let pendingValue;

  let yearlyCompletedValue;
  let yearlyInprogressValue;
  let yearlyCancelledValue;
  let yearlyPendingValue;

  const WeeklycompletedDate = [];
  const yearlycompletedDate = [];

  const WeeklyinprogressDate = [];
  const yearlyinprogressDate = [];

  const Weeklycancelled = [];
  const yearlycancelled = [];

  const Weeklypending = [];
  const yearlypending = [];

  const today = new Date();
  const startOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  );
  const endOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + (6 - today.getDay())
  );
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const endOfYear = new Date(today.getFullYear(), 11, 31);

  useEffect(() => {
    const completedCount = userdata.filter((a) => {
      
      if (
        a.status === "completed" &&
        a.useremail == sessionStorage.getItem("useremail")
      ) {
    
        if (
          new Date(a.duedate) >= startOfWeek &&
          new Date(a.duedate) <= endOfWeek
        ) {
          console.log("line 23");
         
          WeeklycompletedDate.push(a.duedate);
          completedValue=WeeklycompletedDate.length
         

          // console.log(WeeklycompletedDate.length,this.weekly);
        } else if (
          new Date(a.duedate) >= startOfYear &&
          new Date(a.duedate) <= endOfYear
        ) {
       
          yearlycompletedDate.push(a.duedate);
          console.log("yearly",yearlycompletedDate.length);
          yearlyCompletedValue=yearlycompletedDate.length;
        }
      }
      return (
        a.status === "completed" &&
        a.useremail == sessionStorage.getItem("useremail")
      );
    }).length;
    console.log(completedCount);
    const inProgressCount = userdata.filter((a) => {
      if (
        a.status === "inprogress" &&
        a.useremail == sessionStorage.getItem("useremail")
      ) {
       
        WeeklyinprogressDate.push(a.duedate);
        console.log(WeeklyinprogressDate);
        
        if (
          new Date(a.duedate) >= startOfWeek &&
          new Date(a.duedate) <= endOfWeek
          ) {
          
            
          WeeklyinprogressDate.push(a.duedate);
          inprogressValue=WeeklyinprogressDate.length
        } else if (
          new Date(a.duedate) >= startOfYear &&
          new Date(a.duedate) <= endOfYear
        ) {
         
          yearlyinprogressDate.push(a.duedate);
          yearlyInprogressValue=yearlyinprogressDate.length
        }
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
        console.log(Weeklycancelled);
        if (
          new Date(a.duedate) >= startOfWeek &&
          new Date(a.duedate) <= endOfWeek
        ) {
      

          Weeklycancelled.push(a.duedate);
          yearlyCancelledValue=Weeklycancelled.length
        } else if (
          new Date(a.duedate) >= startOfYear &&
          new Date(a.duedate) <= endOfYear
        ) {
       
          yearlycancelled.push(a.duedate);
        }
      }
      return (
        a.status === "cancelled" &&
        a.useremail == sessionStorage.getItem("useremail")
      );
    }).length;
    const pendingCount = userdata.filter((a) => {
      if (
        a.status === "cancelled" &&
        a.useremail == sessionStorage.getItem("useremail")
      ) {
        console.log(a.duedate);
        console.log(Weeklypending);
        if (
          new Date(a.duedate) >= startOfWeek &&
          new Date(a.duedate) <= endOfWeek
        ) {
          
          Weeklypending.push(a.duedate);
          pendingValue=Weeklypending.length
        } else if (
          new Date(a.duedate) >= startOfYear &&
          new Date(a.duedate) <= endOfYear
        ) {
    
          yearlypending.push(a.duedate);
          yearlyPendingValue=yearlypending.length
        }
      }
      return (
        a.status === "pending" &&
        a.useremail == sessionStorage.getItem("useremail")
      );
    }).length;

    

    setData([
      {
        property: completedCount == 0 ? "" : `Completed ${completedValue}%`,
        value: weekly?WeeklycompletedDate.length:yearlycompletedDate.length,
      },
      {
        property: inProgressCount == 0 ? "" : `In Progress ${inprogressValue}%`,
        value: weekly?WeeklyinprogressDate.length:yearlyinprogressDate.length,
      },
      {
        property: cancelledCount == 0 ? "" : `Cancelled ${cancelledValue}%`,
        value: weekly?Weeklycancelled.length:yearlycancelled.length,
      },
      {
        property: pendingCount == 0 ? "" : `Pending ${pendingValue}%`,
        value: weekly?Weeklypending.length:Weeklypending.length,
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

    const WeeklycompletedDate = [];
  const monthlycompletedDate = [];

  const WeeklyinprogressDate = [];
  const monthlyinprogressDate = [];

  const Weeklycancelled = [];
  const monthlycancelled = [];

  const Weeklypending = [];
  const monthlypending = [];

  const today = new Date();
  const startOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  );
  const endOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + (6 - today.getDay())
  );
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  }

  return (
    <>
      <div className="routes">
        
       <label htmlFor="dropdown">Select an option: </label>
      <select id="dropdown" value={selectedOption} onChange={handleChange}>
         <option value="weekly">Weekly</option>
         <option value="yearly">Yearly</option>
       </select>

<div>
  {selectedOption=="weekly"?<input type="week" name="week" id="camp-week"
       min="2018-W18" max="2018-W26" required/>:
     
<select id="year" name="year">
  <option value="">--Select a year--</option>
  <option value="2023">2023</option>
  <option value="2022">2022</option>
  <option value="2021">2021</option>
  <option value="2020">2020</option>
  

</select>







       }
</div>

       <div id="pie">
          <svg ref={svgRef} id="ref"></svg>
        </div>


       {/* {selectedOption === "weekly" ? (
        <div>
          <label htmlFor="week-input">Enter a week number: </label>
          <input
            type="week"
            name="week"
            id="camp-week"
            min="2020-W1"
            max="2025-W52"
            required
          />
        </div>
      ) : (
        <div>
          <label htmlFor="year-input">Enter a year: </label>
          <input id="year-input" type="number" min="1900" max="2099" />
        </div>
      )} */}

    </div>
       
       
    </>
  );
};
export default Dropdown;