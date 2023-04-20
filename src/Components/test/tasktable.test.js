import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TaskTable from "../Task/TaskTable";

test("test app", () => {
  render(
    <MemoryRouter>
      <TaskTable />
    </MemoryRouter>
  );
}); 
