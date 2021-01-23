import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="text-center mt-5 ">
            Error:404 Page not found
            <button className="btn btn-lg border ml-5 btn-dark">
                <Link to="/">Go To Home</Link>
            </button>
        </div>
    );
}
