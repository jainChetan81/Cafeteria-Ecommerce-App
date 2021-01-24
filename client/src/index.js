import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ReactRouter from "./Router/ReactRouter";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
    <BrowserRouter basename="/">
        <ReactRouter />
    </BrowserRouter>,
    document.getElementById("root")
);
