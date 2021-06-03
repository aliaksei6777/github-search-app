import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import ErrorPage from "../../features/Error404Page/ErrorPage";
import {Profile} from "../../features/ProfilePage/Profile";
import {Main} from "../../features/MainPage/Main";


export const PATH = {
    MAIN: '/main',
    PROFILE: '/profile'
}

function Routes() {
    return (
        <div>
            <Switch>
                <Route path={'/'} exact render={() => <Main/>}/>
                <Route path={PATH.MAIN} exact render={() => <Main/>}/>
                <Route path={PATH.PROFILE} exact render={() => <Profile/>}/>
                <Route path={'/404'} render={() => <ErrorPage/>}/>
                <Redirect from={'*'} to={'/404'}/>
            </Switch>
        </div>
    );
}

export default Routes;