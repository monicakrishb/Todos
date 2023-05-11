import { act, fireEvent, render, screen} from "@testing-library/react";

import MockAdapter from "axios-mock-adapter";
import { MemoryRouter } from "react-router-dom";
import { Create } from "../Task/Create";
import axios from "axios";
import * as Router from "react-router-dom";

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
    taskname: "Javascript",
    description: "Hoisting",
    priority: "high",
    duedate: "Thu Apr 13 2023",
    status: "cancelled",
    taskcolour: "cancelled",
    useremail: "monica@gmail.com",
    currentDate: "2023-04-13T09:14:20.231Z",
    id: 55,
  },
  {
    taskname: "Javascript",
    description: "Hoisting",
    priority: "high",
    duedate: "Thu Apr 20 2023",
    status: "cancelled",
    taskcolour: "cancelled",
    useremail: "monica@gmail.com",
    currentDate: "2023-04-12T06:55:24.303Z",
    id: 57,
  },
  {
    taskname: "Javascript",
    description: "Hoisting",
    priority: "medium",
    duedate: "Sat May 06 2023",
    status: "inprogress",
    taskcolour: "inprogress",
    useremail: "monica@gmail.com",
    currentDate: "2023-04-13T03:52:45.695Z",
    id: 58,
  },
  {
    taskname: "Javascript",
    description: "Symbol",
    priority: "high",
    duedate: "Mon Apr 24 2023",
    status: "inprogress",
    taskcolour: "inprogress",
    useremail: "monica@gmail.com",
    currentDate: "2023-04-12T06:56:15.873Z",
    id: 59,
  },
  {
    taskname: "htmll",
    description: "script",
    priority: "high",
    duedate: "Thu Apr 27 2023",
    status: "cancelled",
    taskcolour: "cancelled",
    useremail: "monica@gmail.com",
    currentDate: "2023-04-12T11:02:38.128Z",
    id: 63,
  },
  {
    taskname: "jsbnm",
    description: "script",
    priority: "medium",
    duedate: "Sun Apr 23 2023",
    status: "completed",
    taskcolour: "completed",
    useremail: "monica@gmail.com",
    currentDate: "2023-04-12T11:03:03.282Z",
    id: 64,
  },
  {
    taskname: "Javascript",
    description: "Hoisting",
    priority: "medium",
    duedate: "Wed Apr 26 2023",
    status: "cancelled",
    taskcolour: "cancelled",
    useremail: "monica@gmail.com",
    currentDate: "2023-04-12T11:22:32.928Z",
    id: 66,
  },
  {
    taskname: "jsbnm",
    description: "script",
    priority: "high",
    duedate: "Fri Apr 28 2023",
    status: "inprogress",
    taskcolour: "inprogress",
    useremail: "monica@gmail.com",
    currentDate: "2023-04-12T12:06:16.192Z",
    id: 70,
  },
  {
    taskname: "Javascript",
    description: "Map",
    priority: "medium",
    duedate: "Wed Apr 19 2023",
    status: "completed",
    taskcolour: "completed",
    useremail: "monica@gmail.com",
    currentDate: "2023-04-12T12:06:51.416Z",
    id: 72,
  },
  {
    taskname: "Javascript",
    description: "Hoisting",
    priority: "medium",
    duedate: "Thu Apr 13 2023",
    status: "inprogress",
    taskcolour: "inprogress",
    useremail: "monica@gmail.com",
    currentDate: "2023-04-12T12:07:27.237Z",
    id: 73,
  },
  {
    taskname: "Javascript",
    description: "Hoisting",
    priority: "medium",
    duedate: "Wed Apr 26 2023",
    status: "inprogress",
    taskcolour: "inprogress",
    useremail: "monica@gmail.com",
    currentDate: "2023-04-12T12:07:42.859Z",
    id: 74,
  },
  {
    taskname: "Python",
    description: "Tuples!",
    priority: "medium",
    duedate: "Sat Apr 15 2023",
    status: "completed",
    taskcolour: "completed",
    useremail: "monica@gmail.com",
    currentDate: "2023-04-13T03:54:21.626Z",
    id: 75,
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
  expect(screen.getByRole("option", { name: "High" }).selected).toBe(false);
});
it("should display the correct number of options", () => {
  render(
    <Router.MemoryRouter>
      <Create />
    </Router.MemoryRouter>
  );
  expect(screen.getAllByRole("option").length).toBe(8);
});


