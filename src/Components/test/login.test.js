import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Login } from "../form/Login";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { act } from "@testing-library/react";
import { screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

test("Login", async () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
});

test("email input field should accept password", async () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  const password = screen.getByPlaceholderText("Enter Password");
  expect(password).toHaveAttribute("type", "password");
});

test("renders two buttons", async () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  const items = await screen.findAllByRole("button");
  expect(items).toHaveLength(2);
});
test("email input field should accept email", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  const email = screen.getByPlaceholderText("Enter email");
  expect(email.value).not.toMatch("monicaa@gmail.com");
});
test("password input should have type password", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  const password = screen.getByPlaceholderText("Enter Password");
  expect(password).toHaveAttribute("type", "password");
});
test("test username input is valid", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  const inputElement = screen.getByTestId("username-test");
  fireEvent.change(inputElement, { target: { value: "Dhanush" } });
  expect(screen.getByTestId("username-test")).toHaveValue("Dhanush");
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
  {
    name: "Shankari",
    email: "shankari@gmail.com",
    pass: "Shankari@13",
    mobile: "9003759065",
    id: 5,
  },
];
test("login check", async () => {
  const mock = new MockAdapter(axios);
  mock.onGet("http://localhost:8000/user?email=${email}").reply(200, user);
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  act(() => { });
});
test("log check", async () => {
  const mock = new MockAdapter(axios);
  mock.onGet("http://localhost:8000/user?email=Dhanush").reply(200, user);
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  const inputElement = screen.getByTestId("username-test");
  fireEvent.change(inputElement, { target: { value: "Dhanush" } });
  const password = screen.getByPlaceholderText("Enter Password");
  fireEvent.change(password, { target: { value: "Dhanush" } });

  act(() => { });
  await act(() => {});
  screen.getAllByTestId("submitme")[0].click();
  await act(() => {});
});
