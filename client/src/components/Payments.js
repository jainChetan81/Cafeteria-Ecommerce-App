import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";

class Payments extends Component {
    onToken = (token) => {
        console.log("token of stripe is :", token);
        this.props.paymentDone();
        toast("Payment Done");
    };
    render() {
        return (
            <StripeCheckout
                stripeKey={`pk_test_51Gwo8zFD9wPnB6pJHuxKtGDmoy5txxWlJTy3u9t1Gbval5VwMj6L3W7JpejaBd5LvCNX5jMVhv19EPM4GDWb4c2C00RdfkkhTc`}
                name="CJEcommerce"
                description={`You Total Payment is ${
                    this.props.totalPrice * 1.1
                }`}
                amount={Math.round(this.props.totalPrice * 110)}
                currency="INR"
                token={this.onToken} //a callback function from stripe
            >
                <button className="btn btn-outline-success text-uppercase mb-3 mx-3 px-5">
                    Pay Amount
                </button>
            </StripeCheckout>
        );
    }
}
export default Payments;
