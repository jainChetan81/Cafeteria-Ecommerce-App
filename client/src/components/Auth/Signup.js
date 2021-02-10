import React, { Component } from "react";
import axios from "axios";
import db from "../../Database/IndexDB";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

class Signup extends Component {
    state = {
        isLoading: false,
        error: "",
        Name: "",
        Password: "",
        Password2: "",
    };

    onSignUp = (event) => {
        event.preventDefault();
        const { Name, Password, Password2 } = this.state;
        this.setState({ isLoading: true });
        if (!Name || !Password || !Password2 || Password2 !== Password) {
            this.setState({
                error: "Please fill out the form properly",
                isLoading: false,
            });
            return;
        }
        axios
            .post(`/api/account/signup`, {
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
                } else {
                    this.setState({
                        error: "Error in Signing Up",
                        isLoading: false,
                    });
                }
            })
            .catch((err) =>
                this.setState({
                    error: "Error in Signing U",
                    isLoading: false,
                })
            );
    };
    render() {
        const { isLoading, Name, Password, Password2, error } = this.state;
        if (isLoading) {
            return <Spinner />;
        }
        return (
            <div className="container" style={{ marginTop: 70 }}>
                <h2 className="form-title text-center my-5">Sign up</h2>
                <p className="lead text-center my-5 text-danger">
                    {error !== "" ? error : null}
                </p>
                <form className="register-form" onSubmit={this.onSignUp}>
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
                            placeholder="Password"
                            className="px-4 input-auth"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            value={Password2}
                            onChange={(e) =>
                                this.setState({
                                    Password2: e.target.value,
                                })
                            }
                            type="password"
                            name="password2"
                            id="pass2"
                            placeholder="Confirm Password"
                            className="px-4 input-auth"
                        />
                    </div>
                    <div className="form-group form-button">
                        <button
                            type="submit"
                            name="signup"
                            id="signup"
                            className="btn btn-inline button-auth">
                            Sign Up
                        </button>
                        <Link
                            className="form-submit button-auth ml-1"
                            to="/login">
                            Go To Log In
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}
export default Signup;
