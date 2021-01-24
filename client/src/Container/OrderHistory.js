import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import Spinner from "../components/Spinner/Spinner";
import db from "../Database/IndexDB";

class OrderHistory extends Component {
    state = { loading: true, orders: [], user: {} };

    componentDidMount() {
        db.token.toArray().then((user) => {
            this.setState({ user: user[0] });
            if (user.length > 0)
                axios
                    .get("http://localhost:5000/api/order", {
                        params: { userID: user[0].userID },
                    })
                    .then((res) => {
                        console.log(res.data);
                        console.log(
                            moment(res.data.orders[0].createdAt),
                            moment(res.data.orders[0].createdAt).add(20, "m"),
                            moment(res.data.orders[0].createdAt)
                                .add(14, "h")
                                .add(20, "m")
                                .fromNow()
                        );

                        if (res.data.orders.length > 0) {
                            this.setState({
                                orders: res.data.orders,
                                loading: false,
                            });
                        }
                    })
                    .catch((err) => console.log("err", err));
        });
    }

    timeRemaining = (createdAt) => {
        const time = moment(createdAt).add(20, "m").fromNow();
        console.log("time", time);
        if (time[0] === "i") {
            return (
                <p className="text-left ">
                    <i>
                        You Order Will be delivered in :{" "}
                        <strong className="text-primary">{time}</strong>
                    </i>
                </p>
            );
        } else {
            return (
                <p className="text-left ">
                    <i>
                        You Order was delivered :{" "}
                        <strong className="text-success">{time}</strong>
                    </i>
                </p>
            );
        }
    };

    onLogout = () => {
        db.token
            .delete(this.state.user.token)
            .then(() => {
                this.setState({ user: {} });
                console.log("user has been logged out");
                window.location.reload();
            })
            .catch((err) => console.error("err in logout", err));
    };

    render() {
        const { loading, orders } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Chetan Store!</h1>
                    <Link to="/" className="cart_button videoSidebar__button">
                        Products
                    </Link>
                    <button
                        onClick={this.onLogout}
                        className="cart_button videoSidebar__button">
                        Logout
                    </button>
                </header>
                {loading ? (
                    <Spinner />
                ) : (
                    orders.map((order) => (
                        <div
                            key={order._id}
                            style={{
                                width: "100%",
                                border: "1px solid #eee",
                                boxShadow: "0 2px 3px #ccc",
                                padding: "10px",
                                margin: "10px auto",
                                boxSizing: "border-box",
                            }}>
                            <h5 className="text-left">Emp Info</h5>
                            <div className="row">
                                <div className="col-2">
                                    <i>Email Id: </i>{" "}
                                    <strong>{order.email}</strong>
                                </div>
                                <div className="col-2">
                                    <i> Employee Id: </i>{" "}
                                    <strong> {order.empId}</strong>
                                </div>
                                <div className="col-2">
                                    <i>Mobile No.: </i>{" "}
                                    <strong>{order.mobile} </strong>
                                </div>
                                <div className="col-2">
                                    <i>Name: </i> <strong>{order.name}</strong>
                                </div>
                                <div className="col-2">
                                    <i>Organization Name: </i>{" "}
                                    <strong>{order.orgName}</strong>
                                </div>
                                <div className="col-2">
                                    <i>Price: </i>{" "}
                                    <strong>INR {order.totalAmount}</strong>
                                </div>
                            </div>
                            {this.timeRemaining(order.RegistrationDate)}
                        </div>
                    ))
                )}
            </div>
        );
    }
}
export default OrderHistory;
