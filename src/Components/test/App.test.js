import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";

test("test app", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
});
