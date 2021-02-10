import React, { Suspense, Component } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Dashboard from "../Container/Dashboard";
import Checkout from "../Container/Checkout";
import NotFound from "../Container/NotFound";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import db from "../Database/IndexDB.js";
import OrderHistory from "../Container/OrderHistory";

class ReactRouter extends Component {
    state = { token: "" };
    componentDidMount() {
        db.token.toArray().then((user) => {
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
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    {token !== "" ? (
                        <>
                            <Route
                                exact
                                path="/checkout"
                                component={Checkout}
                            />
                            <Route
                                exact
                                path="/orderhistory"
                                component={OrderHistory}
                            />
                        </>
                    ) : (
                        <>
                            <Route path="/login" component={Login} />
                            <Route path="/signup" component={Signup} />
                        </>
                    )}
                    <Route component={NotFound} />
                </Switch>
                <Redirect to="/" />
            </Suspense>
        );
    }
}

export default withRouter(ReactRouter);
