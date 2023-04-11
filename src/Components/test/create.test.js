import { act, render, screen } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter } from "react-router-dom";
import { Create } from "../Task/Create";
import axios from "axios";
import * as Router from "react-router-dom";
import userEvent from "@testing-library/user-event";

test("create", async () => {
  render(
    <MemoryRouter>
      <Create />
    </MemoryRouter>
  );
});
const task = [
  {
    taskname: "python",
    description: "dictionary",
    priority: "high",
    duedate: "2023-04-12",
    status: "cancelled",
    taskcolour: "cancelled",
    useremail: "sindhu@gmail.com",
    currentDate: "2023-04-06T04:48:47.867Z",
    id: 2,
  },
  {
    taskname: "Mongo",
    description: "crud operation",
    priority: "high",
    duedate: "2023-04-05",
    status: "completed",
    taskcolour: "completed",
    useremail: "krishna@gmail.com",
    currentDate: "2023-04-01T11:00:11.017Z",
    id: 3,
  },
  {
    taskname: "Java",
    description: "microservices",
    priority: "high",
    duedate: "2023-04-12",
    status: "completed",
    taskcolour: "completed",
    useremail: "dillibai@gmail.com",
    currentDate: "2023-04-02T14:31:51.548Z",
    id: 9,
  },
  {
    taskname: "css",
    description: "Grid and Flex",
    priority: "high",
    duedate: "Fri Apr 14 2023",
    status: "inprogress",
    taskcolour: "inprogress",
    useremail: "monica@gmail.com",
    currentDate: "2023-04-06T09:42:02.191Z",
    id: 11,
  },
  {
    taskname: "Python",
    description: "dictionary",
    priority: "high",
    duedate: "2023-04-01",
    status: "cancelled",
    taskcolour: "cancelled",
    useremail: "saindhavi@gmail.com",
    currentDate: "2023-04-03T11:39:05.428Z",
    id: 12,
  },
  {
    taskname: "Html",
    description: "tags!",
    priority: "low",
    duedate: "Sat Apr 08 2023",
    status: "completed",
    taskcolour: "completed",
    useremail: "monica@gmail.com",
    currentDate: "2023-04-08T06:14:51.829Z",
    id: 13,
  },
  {
    taskname: "Dotnet",
    description: "csharp",
    priority: "medium",
    duedate: "Fri Apr 07 2023",
    status: "inprogress",
    taskcolour: "inprogress",
    useremail: "sindhu@gmail.com",
    currentDate: "2023-04-06T04:55:14.660Z",
    id: 26,
  },
  {
    taskname: "Css",
    description: "Borderbox!",
    priority: "medium",
    duedate: "Fri Apr 07 2023",
    status: "completed",
    taskcolour: "completed",
    useremail: null,
    currentDate: "2023-04-06T05:30:17.137Z",
    id: 27,
  }, 
];
test("async check create", async () => {
  const mock = new MockAdapter(axios);
  mock.onPost("http://localhost:8000/task/").reply(200, [{}]);
  render(
    <Router.MemoryRouter>
      <Create />
    </Router.MemoryRouter>
  );
  await act(() => {});
  screen.getAllByTestId("addme")[0].click();
  await act(() => {});
});
it("should allow user to change country", () => {
  render(
    <Router.MemoryRouter>
      <Create />
    </Router.MemoryRouter>
  );
  expect(screen.getByRole("option", { name: "High" }).selected).toBe(true);
});
it("should display the correct number of options", () => {
  render(
    <Router.MemoryRouter>
      <Create />
    </Router.MemoryRouter>
  );
  expect(screen.getAllByRole("option").length).toBe(7);
});
it('should correctly set default option', () => {
  render(
    <Router.MemoryRouter>
      <Create />
    </Router.MemoryRouter>
  );
  expect(screen.getByRole('option', { name: 'Pending' }).selected).toBe(true)
})
