import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/404";
import AboutPage from "./pages/about";
import Game from "./pages/game";
import HomePage from "./pages/home";
import Lobby from "./pages/lobby";

function App() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/lobby/:id" element={<Lobby />} />
        <Route path="/lobby/:id/game" element={<Game />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
}

export default App;
