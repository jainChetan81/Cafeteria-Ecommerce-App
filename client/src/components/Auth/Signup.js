import React, { Component } from "react";
import axios from "axios";
import db from "../../Database/IndexDB";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
const route = "http://localhost:5000";

class Signup extends Component {
    state = {
        isLoading: false,
        Error: "",
        Name: "",
        Password: "",
        Password2: "",
    };

    onSignUp = (event) => {
        event.preventDefault();
        const { Name, Password, Password2 } = this.state;
        if (!Name || !Password || !Password2 || Password2 !== Password) {
            console.warn(" all the forms are not filled");
            return;
        }
        console.log(Name, Password, Password2);
        axios
            .post(`${route}/api/account/signup`, {
                name: Name,
                password: Password,
            })
            // .then((res) => res.json())
            .then((res) => {
                console.log("json", res); //json is the object that is returned
                if (res.data.success) {
                    this.setState({
                        Error: res.data.message,
                        isLoading: false,
                        token: res.data.user.token,
                    });

                    db.token
                        .add(res.data.user)
                        .catch((err) => console.error("err in token", err));
                } else {
                    this.setState({
                        Error: res.data.message,
                        isLoading: true,
                    });
                }
            });
    };
    render() {
        const { isLoading, Name, Password, Password2, Error } = this.state;
        if (isLoading) {
            return <Spinner />;
        }
        return (
            <div className="container">
                <h3 className="form-title">Sign up</h3>
                <p className="m-auto text-danger">{Error ? { Error } : null}</p>
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
                            className="form-submit button-auth mx-3"
                            to="/login">
                            Sign Up
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}
export default Signup;
