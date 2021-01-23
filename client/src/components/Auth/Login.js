import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import db from "../../Database/IndexDB";
const route = "http://localhost:5000";

class Login extends Component {
    state = {
        isLoading: false,
        Error: "",
        Name: "",
        Password: "",
        token: "",
    };

    onLogIn = (e) => {
        e.preventDefault();
        const { Name, Password } = this.state;
        if (!Name || !Password) {
            alert("Please fill out the form");
            return;
        }
        axios
            .post(`${route}/api/account/login`, {
                name: Name,
                password: Password,
            })
            // .then((res) => res.json())
            .then((res) => {
                console.log("json in login.jsx", res);
                if (res.data.success) {
                    this.setState({
                        logInError: res.data.message,
                        isLoading: false,
                        token: res.data.user.token,
                    });

                    db.token
                        .add(res.data.user)
                        .catch((err) => console.error("err in token", err));
                } else
                    this.setState({
                        logInError: res.data.message,
                        isLoading: true,
                    });
            });
    };
    render() {
        const { isLoading, Name, Password, token } = this.state;
        if (isLoading) {
            return <p>Loading...</p>;
        }
        if (token) {
            return <div className="bg-dark text-white">Logged in</div>;
        }
        return (
            <div className="container">
                <h2 className="form-title">Log in</h2>
                {/* <p className="m-auto text-danger">
                                {Error ? { Error } : null}
                            </p> */}
                <form
                    className="register-form"
                    id="register-form"
                    onSubmit={this.onLogIn}>
                    <div className="form-group">
                        <input
                            type="text"
                            value={Name}
                            onChange={(e) =>
                                this.setState({
                                    Name: e.target.value,
                                })
                            }
                            name="name"
                            id="name"
                            placeholder="Your Name"
                            className="px-4 input-auth"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            value={Password}
                            onChange={(e) =>
                                this.setState({
                                    Password: e.target.value,
                                })
                            }
                            type="password"
                            name="password"
                            id="pass"
                            placeholder="Password"
                            className="px-4 input-auth"
                        />
                    </div>
                    <div className="form-group form-button">
                        <button
                            type="submit"
                            name="login"
                            id="login"
                            className="form-submit button-auth">
                            Log In
                        </button>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                </form>
            </div>
        );
    }
}
export default Login;
