import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
    <Router basename="">
        <Suspense
            fallback={
                <div className="text-center m-5 text-uppercase">Loading...</div>
            }>
            <App />
        </Suspense>
    </Router>,
    document.getElementById("root")
);
