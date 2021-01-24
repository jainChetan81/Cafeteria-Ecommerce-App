import React, { Component } from "react";
import ItemList from "../components/ItemList";
import { storeProducts } from "../Database/Items";
import Form from "../components/Form";
import Spinner from "../components/Spinner/Spinner";
import db from "../Database/IndexDB";
import { Link } from "react-router-dom";
export default class App extends Component {
    state = {
        items: [],
        cart: [],
        loading: true,
        filteredItems: [],
        searchString: "",
        user: {},
    };

    async componentDidMount() {
        this.setState({ loading: true });
        let items = await db.items.toArray();
        let allCart = await db.cart.toArray();
        let user = await db.token.toArray();
        let updatedItems = [...items];
        if (items.length === 0)
            storeProducts.forEach((item) =>
                updatedItems.push({ ...item, inCart: false, count: 0 })
            );
        // else {
        //     if (items !== storeProducts) {
        //         items = [];
        //         updatedItems = [];
        //     }
        //     storeProducts.forEach((item) =>
        //         updatedItems.push({ ...item, inCart: false, count: 0 })
        //     );
        // }
        this.setState({
            items: updatedItems,
            cart: allCart,
            loading: false,
            user: user[0],
        });
        if (items.length === 0) this.addToIndexDB(updatedItems, "items");
    }

    addToIndexDB(items, key) {
        items.forEach((item) => {
            db[key]
                .add(item)
                .then()
                .catch((err) => console.log("err in storing items", err));
        });
    }

    onLogout = () => {
        db.token
            .delete(this.state.user.token)
            .then(() => {
                this.setState({ user: {} });
                console.log("user has benn logged out");
                window.location.reload();
            })
            .catch((err) => console.error("err in logout", err));
    };

    getItems = (e) => {
        this.setState({ loading: true });
        e.preventDefault();
        const itemName = e.target.elements.items.value;
        const filteredItems = this.state.items.filter((e) => {
            return e.title
                .trim()
                .replace(/\s+/g, "")
                .toLowerCase()
                .includes(
                    itemName
                        .toLowerCase()
                        .trim()
                        .replace(/\s+/g, "")
                        .toLowerCase()
                );
        });
        const filteredArray = [...filteredItems];
        this.setState({
            loading: false,
            filteredItems: [...filteredArray],
            searchString: itemName,
        });
    };

    addToCart = (id) => {
        let updatedCart = [...this.state.cart];
        let updatedItems = [...this.state.items];
        const index = updatedItems.findIndex((e) => e.id === id);
        updatedItems[index].inCart = true;
        updatedItems[index].count = 1;
        let sliced = updatedItems.slice(index, index + 1);
        updatedCart.push(sliced[0]);
        this.setState({
            cart: updatedCart,
            items: updatedItems,
        });
        db.items
            .update(id, { inCart: true, count: 1 })
            .catch((err) => console.error("err1", err));
        db.cart.add(sliced[0]).catch((err) => console.error("err3", err));
    };

    removeFromCart = (id) => {
        let updatedCart = [...this.state.cart];
        let updatedItems = [...this.state.items];
        const index = updatedCart.findIndex((e) => e.id === id);
        const indexItems = updatedItems.findIndex((e) => e.id === id);
        updatedCart.splice(index, 1);
        updatedItems[indexItems].inCart = false;
        updatedItems[indexItems].count = 0;
        this.setState({
            items: updatedItems,
            cart: updatedCart,
        });

        db.cart.delete(id).catch((err) => console.error("err4", err));

        db.items
            .update(id, { inCart: false, count: 0 })
            .catch((err) => console.error("err5", err));
    };

    sortByRatings = () => {
        const items = [...this.state.items];
        for (let i = 0; i < items.length; i++) {
            for (let j = 0; j < i; j++) {
                if (items[i].ratings > items[j].ratings) {
                    let swap = items[j];
                    items[j] = items[i];
                    items[i] = swap;
                }
            }
        }
        items.forEach((e) => {
            console.log(e.ratings);
        });
        this.setState({ items });
    };

    render() {
        const { items, cart, user } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Chetan Store!</h1>
                    {user ? (
                        <button
                            onClick={this.onLogout}
                            className="cart_button videoSidebar__button">
                            Logout
                        </button>
                    ) : (
                        <Link
                            to="/signup"
                            className="cart_button videoSidebar__button">
                            Signup
                        </Link>
                    )}
                    <Link
                        to={`${user ? "/checkout" : "/login"}`}
                        className="cart_button videoSidebar__button">
                        {user ? `Cart : ${cart.length}` : "Login"}
                    </Link>
                </header>
                <Form
                    getItems={this.getItems}
                    sortByRatings={this.sortByRatings}
                />
                {this.state.loading ? (
                    <Spinner />
                ) : items.length < 1 ? (
                    <p>Items can't be loaded</p>
                ) : (
                    <ItemList
                        filteredItems={this.state.filteredItems}
                        items={items}
                        cart={cart}
                        searchString={this.state.searchString}
                        history={this.props.history}
                        addToCart={this.addToCart}
                        removeFromCart={this.removeFromCart}
                    />
                )}
            </div>
        );
    }
}
