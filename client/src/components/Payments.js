import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";

class Payments extends Component {
    onToken = (token) => {
        this.props.finishCheckout(token);
    };
    render() {
        return (
            <StripeCheckout
                stripeKey={`pk_test_51Gwo8zFD9wPnB6pJHuxKtGDmoy5txxWlJTy3u9t1Gbval5VwMj6L3W7JpejaBd5LvCNX5jMVhv19EPM4GDWb4c2C00RdfkkhTc`}
                name="CJEcommerce"
                description={`You Total Payment is ${Math.round(
                    this.props.totalPrice * 1.1
                )}`}
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
