import { act, render, screen } from "@testing-library/react";
import { Register } from "../form/Register";
import { MemoryRouter } from "react-router-dom";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { fireEvent } from "@testing-library/react";


const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));
test("Register", async () => {
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );
});
const user = [
  {
    name: "Kuralanban",
    email: "kural@gmail.com",
    pass: "Kural",
    mobile: "9003759065",
    id: 3,
  },
  {
    name: "Monica",
    email: "monica@gmail.com",
    pass: "Moni@13",
    mobile: "9003759065",
    id: 4,
  },
];
test("async check registerpost", async () => {
  const mock = new MockAdapter(axios);
  mock.onPost("http://localhost:8000/user").reply(200, [{}]);
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );
  await act(() => {});
  screen.getAllByTestId("clickme")[0].click();
  await act(() => {});
});
test("renders one button", async () => {
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );
  const items = await screen.findAllByRole("button");
  expect(items).toHaveLength(2);
});
test("test username input is valid", () => {
  render(
    <MemoryRouter>
      <Register />

    </MemoryRouter>
  );
  const inputElement = screen.getByTestId("username-test");
  fireEvent.change(inputElement, { target: { value: "Monica" } });
  expect(screen.getByTestId("username-test")).toHaveValue("Monica");
});
