import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Register } from "./Components/form/Register";
import { Login } from "./Components/form/Login";
import Nav from "./Components/form/Navbar";
import { Create } from "./Components/Task/Create";
import { Tasklist } from "./Components/Task/Tasklist";
import ProtectUser from "./Components/ProtectedRoute/Protect";
import { ToastContainer } from "react-toastify";
import { createContext, useState } from "react";
import TaskTable from "./Components/Task/TaskTable";
import Home from "./Components/Task/Home";

export const EditContext = createContext({});

function App() {
  const [task, setTask] = useState();
  return (
    <div className="App">
      <Nav />
      <ToastContainer></ToastContainer>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectUser />}>
          <Route path="/tasklist" element={<Tasklist setTask={setTask} />} />
          <Route path="/task" element={<Home />} />
          <Route path="/create" element={<Create data={task} />} />
          <Route path="/create" element={<Create />} />
          <Route path="/table" element={<TaskTable />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
