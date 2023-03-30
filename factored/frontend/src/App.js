import React from 'react';
import './App.css';
import "react-bootstrap/dist/react-bootstrap.min.js";
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";

function App() {
  let routes = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/home", element: <Home /> },
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
      <Router>
        <App />
      </Router>
  );
};

export default AppWrapper;

