import React from "react";

function TaskTableHeader() {
  return (
    <tr>
      <th>Task Name</th>
      <th>Description</th>
      <th>Duedate</th>
      <th>Remaining Days</th>
      <th>Status</th> 
    </tr>
  );
} 

export default TaskTableHeader;
