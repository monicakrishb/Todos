import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Task } from "./Components/Task/Home";
import { Edit } from "./Components/Task/Edit";
import { Register } from "./Components/form/Register";
import { Login } from "./Components/form/Login";
import Nav from "./Components/form/Navbar";
import { Create } from "./Components/Task/Create";
import { Tasklist } from "./Components/Task/Tasklist";
import ProtectAdmin from "./Components/ProtectedRoute.js/Protect";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Nav />
      <ToastContainer theme="colored"></ToastContainer>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectAdmin />}>
          <Route path="/tasklist" element={<Tasklist />} />
          <Route path="/task" element={<Task />} />
          <Route path="/task/edit/:id" element={<Edit />} />
          <Route path="/create" element={<Create />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
