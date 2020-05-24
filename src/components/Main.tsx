import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";
import {Home} from "./Home";

export const Main = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </Router>
    );
}

