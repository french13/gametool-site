import React, { useState } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Todolist from "../pages/Todolist";
import Timeitem from "../pages/Timeitem";
import Illust from "../pages/Illust";
import { Routes, Route } from "react-router-dom";
import { Container } from "reactstrap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RoutesContainer = () => {
  const [onMenu, setOnMenu] = useState(false);

  return (
    <Container style={{ position: "relative", padding: 0 }}>
      {onMenu === true ? <Navbar setOnMenu={setOnMenu} /> : null}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todolist" element={<Todolist />} />
        <Route path="/timeitem" element={<Timeitem />} />
        <Route path="/illust" element={<Illust />} />
      </Routes>
      <Footer onMenu={onMenu} setOnMenu={setOnMenu} />
    </Container>
  );
};

export default RoutesContainer;
