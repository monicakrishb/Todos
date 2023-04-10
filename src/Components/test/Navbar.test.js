import { render } from "@testing-library/react";
import Navbar from "../form/Navbar";
import { MemoryRouter } from "react-router-dom";

test("Register", async () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
});
