import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import db from "../../Database/IndexDB";
import Spinner from "../Spinner/Spinner";

class Login extends Component {
    state = {
        isLoading: false,
        error: "",
        Name: "",
        Password: "",
        token: "",
    };

    onLogIn = (e) => {
        e.preventDefault();
        const { Name, Password } = this.state;
        this.setState({ isLoading: true });
        if (Name.length === 0 || !Password.length === 0) {
            this.setState({
                error: "Please fill out the form",
                isLoading: false,
            });
            return;
        }

        axios
            .post("/api/account/login", {
                name: Name,
                password: Password,
            })
            // .then((res) => res.json())
            .then((res) => {
                if (res.data.success) {
                    this.setState({
                        error: "",
                        isLoading: false,
                        token: res.data.user.token,
                    });

                    db.token
                        .add(res.data.user)
                        .then(() => {
                            this.props.history.push("/");
                            window.location.reload();
                        })
                        .catch((err) => console.error("err in token", err));
                } else
                    this.setState({
                        error: "Error in Logging in",
                        isLoading: false,
                    });
            })
            .catch((err) =>
                this.setState({
                    error: "Error in Logging in",
                    isLoading: false,
                })
            );
    };
    render() {
        const { isLoading, Name, Password, error } = this.state;
        if (isLoading) {
            return <Spinner />;
        }
        return (
            <div className="container" style={{ marginTop: 100 }}>
                <h2 className="form-title text-center my-5">Log in</h2>
                <p className="lead text-center my-5 text-danger">
                    {error !== "" ? error : null}
                </p>
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
                        <Link
                            className="form-submit button-auth ml-1"
                            to="/signup">
                            Go To Sign Up
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}
export default Login;
