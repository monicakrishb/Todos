import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TaskTableHeader from "../Task/TaskTableHeader";

test("Register", async () => {
  render(
    <MemoryRouter>
      <TaskTableHeader />
    </MemoryRouter>
  );
});
