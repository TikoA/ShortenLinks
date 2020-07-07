import React from "react";
import {Switch,Route, Redirect} from "react-router-dom";
import {LinksPage} from "./Pages/LinksPage";
import {CreatePage} from "./Pages/CreatePage";
import {DetailPage} from "./Pages/DetailPage";
import {AuthPage} from "./Pages/AuthPage";

export const useroutes = isAuth => {
    if (isAuth) {
        return (
            <Switch>
                <Route exact path="/links">
                    <LinksPage />
                </Route>
                <Route exact path="/create">
                    <CreatePage/>
                </Route>
                <Route exact path="/detail/:id">
                    <DetailPage />
                </Route>
                <Redirect to ="/create" />
            </Switch>
        )
    }
    return (
        <Switch>
        <Route path="/" exact >
            <AuthPage />
        </Route>
            <CreatePage />
        </Switch>
    )
}