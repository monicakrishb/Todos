import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Create } from "../Task/Create";

test("create", async () => {
  render(
    <MemoryRouter>
      <Create />
    </MemoryRouter>
  );
});
