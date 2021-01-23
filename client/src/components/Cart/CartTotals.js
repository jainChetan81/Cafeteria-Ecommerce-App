import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import CartModal from "./CartModal";
import InfoTable from "../InfoTable";
import { makeStyles } from "@material-ui/core/styles";
import Payments from "../Payments";
import { toast } from "react-toastify";
import axios from "axios";
import db from "../../Database/IndexDB";

function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        backgroundColor: "white",
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const CartTotals = ({
    removeAllItems,
    totalPrice,
    form,
    formSubmit,
    formData,
}) => {
    const [modalStyle] = React.useState(getModalStyle);
    const [show, showModal] = useState(false);
    const classes = useStyles();

    const closeModal = () => {
        showModal(false);
    };
    const openModal = (e) => {
        e.preventDefault();
        showModal(true);
    };

    const finishCheckout = (token) => {
        console.log("token", token);
        let user = {};
        db.token.toArray().then((currentUser) => {
            console.log("user[0].token", user);
            if (currentUser.length > 0) user = currentUser[0];
            formData.image = "";
            axios
                .post("http://localhost:5000/api/order", {
                    formData,
                    userID: user.userID,
                    totalPrice,
                })
                .then((res) => {
                    console.log(res.data);
                    if (res.data.success) {
                        axios
                            .post("http://localhost:5000/api/stripe", {
                                token,
                                orderID: res.data.paymentId,
                                userID: user.userID,
                                name: user.name,
                                totalPrice,
                            })
                            .then((res) => {
                                console.log(res.data);
                                toast(`order will be delivered in 20 mins`);
                                setTimeout(() => {
                                    removeAllItems();
                                }, 3000);
                            })
                            .catch((err) => console.log("err", err));
                    }
                });
        });
    };
    return (
        <div className="container">
            {" "}
            <Modal open={show}>
                <div style={modalStyle} className={classes.paper}>
                    <CartModal
                        totalPrice={totalPrice}
                        formSubmit={formSubmit}
                        removeAllItems={removeAllItems}
                        onClose={closeModal}
                    />
                </div>
            </Modal>
            {formData.name !== undefined && <InfoTable formData={formData} />}
            {totalPrice > 0 && (
                <div className="row">
                    <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                        <Link to="/">
                            <button
                                onClick={removeAllItems}
                                className="btn btn-outline-danger text-uppercase mb-3 px-5"
                                type="button">
                                clear cart
                            </button>
                        </Link>
                        {form ? (
                            formData.payment === "Online" ? (
                                <Payments finishCheckout={finishCheckout} />
                            ) : (
                                <button
                                    onClick={() => finishCheckout(null)}
                                    className="btn btn-outline-success text-uppercase mb-3 mx-3 px-5"
                                    type="button">
                                    Finish
                                </button>
                            )
                        ) : (
                            <button
                                onClick={openModal}
                                className="btn btn-outline-success text-uppercase mb-3 mx-3 px-5"
                                type="button">
                                Checkout
                            </button>
                        )}

                        <h5>
                            <span className="text-title">subtotal: </span>
                            <strong>$ {totalPrice}</strong>
                        </h5>
                        <h5>
                            <span className="text-title">tax: </span>
                            <strong>$ {totalPrice / 10}</strong>
                        </h5>
                        <h5>
                            <span className="text-title">total: </span>
                            <strong>$ {Math.round(totalPrice * 1.1)}</strong>
                        </h5>
                    </div>
                </div>
            )}
        </div>
    );
};
export default CartTotals;
