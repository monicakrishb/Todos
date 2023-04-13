import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Task } from "./Components/Task/Home";
import { Register } from "./Components/form/Register";
import { Login } from "./Components/form/Login";
import Nav from "./Components/form/Navbar";
import { Create } from "./Components/Task/Create";
import { Tasklist } from "./Components/Task/Tasklist";
import ProtectUser from "./Components/ProtectedRoute/Protect";
import { ToastContainer } from "react-toastify";
import { createContext, useState } from "react";

export const EditContext = createContext({});

function App() {
  const [task, setTask] = useState();
  return (
    <div className="App">
      <Nav />
      <ToastContainer theme="colored"></ToastContainer>
      <Routes >
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectUser />}>
          <Route path="/tasklist" element={<Tasklist setTask={setTask} />} />
          <Route path="/task" element={<Task />} />
          <Route path="/create" element={<Create data={task} />} />
          <Route path="/create" element={<Create />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
