import React, { Suspense, Component } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Dashboard from "../Container/Dashboard";
import Checkout from "../Container/Checkout";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import db from "../Database/IndexDB.js";
import OrderHistory from "../Container/OrderHistory";
// import { routes, authRoutes } from "./routes.js";

class ReactRouter extends Component {
    state = { token: "" };
    componentDidMount() {
        db.token.toArray().then((user) => {
            console.log("user[0].token", user);
            if (user.length > 0) this.setState({ token: user[0].token });
            else this.checkForToken();
        });
    }
    checkForToken = () => {
        setInterval(() => {
            db.token.toArray().then((user) => {
                if (user.length > 0) this.setState({ token: user[0].token });
            });
        }, 3000);
    };
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.token !== this.state.token;
    }
    // getRoutes = () => {
    //     let allRoutes = [...authRoutes];
    //     if (this.state.token) allRoutes = [...routes];

    //     return allRoutes.map((prop, index) => {
    //         if (prop.layout === "/")
    //             return (
    //                 <Route
    //                     path={prop.layout + prop.path}
    //                     component={prop.component}
    //                     key={index}
    //                 />
    //             );
    //     });
    // };

    render() {
        const { token } = this.state;
        return (
            <Suspense
                fallback={
                    <div className="text-center m-5 text-uppercase">
                        Loading...
                    </div>
                }>
                {/* <Switch> */}
                <Route exact path="/" component={Dashboard} />
                {token !== "" ? (
                    <Switch>
                        <Route exact path="/checkout" component={Checkout} />
                        <Route
                            exact
                            path="/orderhistory"
                            component={OrderHistory}
                        />
                    </Switch>
                ) : (
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={Signup} />
                    </Switch>
                )}
                <Redirect to="/" />
                {/* </Switch> */}
            </Suspense>
        );
    }
}

export default withRouter(ReactRouter);
