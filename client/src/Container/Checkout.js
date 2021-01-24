import React, { Component } from "react";
import { Link } from "react-router-dom";
import CartColumns from "../components/Cart/CartColumns";
import CartTotals from "../components/Cart/CartTotals";
import CartItems from "../components/Cart/CartItems";
import EmptyCart from "../components/Cart/EmptyCart";
import db from "../Database/IndexDB";
import { ToastContainer } from "react-toastify";

class Checkout extends Component {
    state = {
        cart: [],
        items: [],
        loading: true,
        totalPrice: 0,
        form: false,
        formData: {},
        userID: "",
    };
    formSubmit = (e, imageURI) => {
        e.preventDefault();
        const formData = {
            email: e.target.email.value,
            name: e.target.name.value,
            orgName: e.target.orgName.value,
            empId: e.target.empId.value,
            mobile: e.target.mobile.value,
            payment: e.target.payment.value,
            image: imageURI,
        };
        console.log("formData", formData);
        this.setState({ form: true, formData });
    };
    async componentDidMount() {
        this.setState({ loading: true });
        let allCart = await db.cart.toArray();
        let items = await db.items.toArray();
        let user = await db.token.toArray();
        this.totalPrice(allCart);

        return this.setState({
            cart: allCart,
            loading: false,
            items,
            userID: user[0].userID,
        });
    }

    totalPrice = (updatedCart) => {
        const cart = [...updatedCart];
        let price = 0;
        cart.forEach((item) => {
            price += item.count * item.price;
        });
        this.setState({ totalPrice: price });
    };

    decrementItem = (id) => {
        let updatedCart = [...this.state.cart];
        let updatedItems = [...this.state.items];
        const index = updatedCart.findIndex((e) => e.id === id);
        const indexItems = updatedItems.findIndex((e) => e.id === id);
        if (updatedCart[index].count === 1) return this.removeItem(id);
        updatedCart[index].count -= 1;
        updatedItems[indexItems].count -= 1;
        this.totalPrice(updatedCart);
        this.setState({
            items: updatedItems,
            cart: updatedCart,
        });

        db.cart
            .update(id, { count: updatedCart[index].count })
            .catch((err) => console.error("err4", err));
        db.items
            .update(id, { count: updatedItems[indexItems].count })
            .catch((err) => console.error("err5", err));
    };

    removeAllItems = () => {
        let cart = [...this.state.cart];
        cart.forEach((item) => {
            this.removeItem(item.id);
        });
        this.props.history.push("/");
    };

    incrementItem = (id) => {
        let updatedCart = [...this.state.cart];
        let updatedItems = [...this.state.items];
        const index = updatedCart.findIndex((e) => e.id === id);
        const indexItems = updatedItems.findIndex((e) => e.id === id);
        updatedCart[index].count += 1;
        updatedItems[indexItems].count += 1;
        this.setState({
            items: updatedItems,
            cart: updatedCart,
        });
        this.totalPrice(updatedCart);

        db.cart
            .update(id, { count: updatedCart[index].count })
            .catch((err) => console.error("err4", err));
        db.items
            .update(id, { count: updatedItems[indexItems].count })
            .catch((err) => console.error("err5", err));
    };
    removeItem = (id) => {
        let updatedCart = [...this.state.cart];
        let updatedItems = [...this.state.items];
        const index = updatedCart.findIndex((e) => e.id === id);
        const indexItems = updatedItems.findIndex((e) => e.id === id);
        updatedCart.splice(index, 1);
        updatedItems[indexItems].inCart = false;
        updatedItems[indexItems].count = 0;
        this.totalPrice(updatedCart);
        this.setState({
            items: updatedItems,
            cart: updatedCart,
        });

        db.cart.delete(id).catch((err) => console.error("err7", err));
        db.items
            .update(id, { inCart: false, count: 0 })
            .catch((err) => console.error("err8", err));
    };
    render() {
        const { cart, form, formData, userID } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Chetan Cafeteria Store!</h1>
                    <Link to="/" className="cart_button videoSidebar__button">
                        Products
                    </Link>
                </header>
                <React.Fragment>
                    <div className="row">
                        <div className="col-10 mx-auto text-title text-center my-2">
                            <div className="text-capitalize font-weight-bold">
                                Your
                                <strong className="text-blue">Cart</strong>
                            </div>
                        </div>
                    </div>
                    <CartColumns />
                    {cart.length > 0 ? (
                        <CartItems
                            cart={cart}
                            decrementItem={this.decrementItem}
                            incrementItem={this.incrementItem}
                            removeItem={this.removeItem}
                        />
                    ) : (
                        <EmptyCart />
                    )}
                    <CartTotals
                        formData={formData}
                        userID={userID}
                        removeAllItems={this.removeAllItems}
                        totalPrice={this.state.totalPrice}
                        form={form}
                        formSubmit={this.formSubmit}
                    />
                    <ToastContainer
                        position="bottom-left"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick={false}
                        rtl={false}
                        pauseOnFocusLoss={false}
                        draggable={false}
                        pauseOnHover={false}
                    />
                </React.Fragment>
            </div>
        );
    }
}
export default Checkout;
