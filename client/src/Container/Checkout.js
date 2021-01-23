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
        books: [],
        loading: true,
        totalPrice: 0,
        payed: false,
    };
    paymentDone = () => {
        this.setState({ payed: true });
    };
    async componentDidMount() {
        this.setState({ loading: true });
        let allCart = await db.cart.toArray();
        let books = await db.books.toArray();
        this.totalPrice(allCart);

        return this.setState({
            cart: allCart,
            loading: false,
            books,
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
        let updatedBooks = [...this.state.books];
        const index = updatedCart.findIndex((e) => e.bookID === id);
        const indexBooks = updatedBooks.findIndex((e) => e.bookID === id);
        if (updatedCart[index].count === 1) return this.removeItem(id);
        updatedCart[index].count -= 1;
        updatedBooks[indexBooks].count -= 1;
        this.totalPrice(updatedCart);
        this.setState({
            books: updatedBooks,
            cart: updatedCart,
        });

        db.cart
            .update(id, { count: updatedCart[index].count })
            .catch((err) => console.error("err4", err));
        db.books
            .update(id, { count: updatedBooks[indexBooks].count })
            .catch((err) => console.error("err5", err));
    };
    removeAllItems = () => {
        let cart = [...this.state.cart];
        console.log("cart", cart);
        cart.forEach((item) => {
            this.removeItem(item.bookID);
        });
        this.props.history.push("/");
    };
    incrementItem = (id) => {
        let updatedCart = [...this.state.cart];
        let updatedBooks = [...this.state.books];
        const index = updatedCart.findIndex((e) => e.bookID === id);
        const indexBooks = updatedBooks.findIndex((e) => e.bookID === id);
        updatedCart[index].count += 1;
        updatedBooks[indexBooks].count += 1;
        this.setState({
            books: updatedBooks,
            cart: updatedCart,
        });
        this.totalPrice(updatedCart);

        db.cart
            .update(id, { count: updatedCart[index].count })
            .catch((err) => console.error("err4", err));
        db.books
            .update(id, { count: updatedBooks[indexBooks].count })
            .catch((err) => console.error("err5", err));
    };
    removeItem = (id) => {
        let updatedCart = [...this.state.cart];
        let updatedBooks = [...this.state.books];
        const index = updatedCart.findIndex((e) => e.bookID === id);
        const indexBooks = updatedBooks.findIndex((e) => e.bookID === id);
        console.log(updatedCart);
        updatedCart.splice(index, 1);
        updatedBooks[indexBooks].inCart = false;
        updatedBooks[indexBooks].count = 0;
        this.totalPrice(updatedCart);
        this.setState({
            books: updatedBooks,
            cart: updatedCart,
        });

        db.cart.delete(id).catch((err) => console.error("err7", err));
        db.books
            .update(id, { inCart: false, count: 0 })
            .catch((err) => console.error("err8", err));
    };
    render() {
        const { cart, payed } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Chetan Book Store!</h1>
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
                        removeAllItems={this.removeAllItems}
                        totalPrice={this.state.totalPrice}
                        payed={payed}
                        paymentDone={this.paymentDone}
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
