import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Logout from "../form/Logout";

test("Logout", async () => {
  render(
    <MemoryRouter>
      <Logout />
    </MemoryRouter>
  );
}); 
 