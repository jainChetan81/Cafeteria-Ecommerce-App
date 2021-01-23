import React, { Component } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import NotFound from "../Container/NotFound.js";
import db from "../Database/IndexDB.js";
import { routes, authRoutes } from "./routes.js";

class ReactRouter extends Component {
    state = { token: "" };
    async componentDidMount() {
        let user = await db.token.toArray();
        console.log("user[0].token", user);
        if (user.length > 0) this.setState({ token: user[0].token });
    }
    getRoutes = () => {
        let allRoutes = [...authRoutes];
        if (this.state.token) allRoutes = [...routes];

        return allRoutes.map((prop, index) => {
            if (prop.layout === "/")
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={index}
                    />
                );
        });
    };

    render() {
        return (
            <Switch>
                {this.getRoutes()}
                <Redirect to="/" />
                <Route component={NotFound} />
            </Switch>
        );
    }
}

export default withRouter(ReactRouter);
