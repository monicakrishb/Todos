import "./App.css";
import { Routes, Route } from "react-router-dom";
import {  Home } from "./Components/Task/Home";
import { Edit } from "./Components/Task/Edit";
import { Register } from "./Components/form/Register";
import { Login } from "./Components/form/Login";
import Nav from "./Components/form/Navbar";
import { Create } from "./Components/Task/Create";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />

        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
