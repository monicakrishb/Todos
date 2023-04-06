import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Login } from "../form/Login";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { act } from "@testing-library/react";
import { screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";


test("Login", async () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
});
const user = "user"[
    (   {
        "name": "Kuralanban",
        "email": "kural@gmail.com",
        "pass": "Kural",
        "mobile": "9003759065",
        "id": 3
      },
      {
        "name": "Monica",
        "email": "monica@gmail.com",
        "pass": "Moni@13",
        "mobile": "9003759065",
        "id": 4
      })
  ];
test("login check", async () => {
    const mock = new MockAdapter(axios);
    mock.onGet("http://localhost:8000/user?email=${username}").reply(200, user);
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    await act(() => {});
  
    // screen.debug()
  });
  test("log check", async () => {
    const mock = new MockAdapter(axios);
    mock.onGet("http://localhost:8000/user?email=${username}").networkError();
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    await act(() => {});
  });

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));
test("email input field should accept email", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  
    // ... your tests here
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
    // userEvent.type(email, "dhanush");
    expect(email.value).not.toMatch("dhanush@gmail.com");
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