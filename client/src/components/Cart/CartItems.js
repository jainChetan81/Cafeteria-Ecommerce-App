import React from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

export default function CartItems({
    cart,
    decrementItem,
    incrementItem,
    removeItem,
}) {
    return cart.map((item, index) => (
        <div key={item.bookID} className="row my-2 text-capitalize text-center">
            <div className="col-10 mx-auto col-lg-2">{index + 1}</div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">product : </span>
                {item.title}
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">price : </span>
                {item.price}
            </div>
            <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                <div className="d-flex justify-content-center">
                    <span
                        className="btn btn-black mx-1"
                        onClick={() => decrementItem(item.bookID)}>
                        -
                    </span>
                    <span className="btn btn-black mx-1">{item.count}</span>
                    <span
                        className="btn btn-black mx-1"
                        onClick={() => incrementItem(item.bookID)}>
                        +
                    </span>
                </div>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <div
                    className="cart-icon"
                    onClick={() => {
                        removeItem(item.bookID);
                    }}>
                    <DeleteForeverIcon />
                </div>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <strong>item total : $ {item.price * item.count}</strong>
            </div>
        </div>
    ));
}
