import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Tasklist } from "../Task/Tasklist";

test("Login", async () => {
  render(
    <MemoryRouter>
      <Tasklist />
    </MemoryRouter>
  );
});
