import "./index.css"

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/home";
import Signup from "./components/signup";
import Login from "./components/login";
import Navbar from "./components/navbar";


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
