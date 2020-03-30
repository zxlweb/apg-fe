/**
 * @fileOverview page routes
 * @author Max
 **/

import * as React from 'react';
import { Route, IndexRoute, Redirect, IndexRedirect } from 'react-router';
import Root = require('./pages/root');

const server = (input: any) => {
    return typeof window === 'undefined' ? input : <Route path="somethingelsethatisneverreachable" />;
};

if (typeof require.ensure !== 'function') {
    require.ensure = (dep, callback) => {
        callback(require);
    };
}

export const ROUTE_PATH = {
    SINGLE_PAGE: 'sp'
};

const Routes = (
    <Route path="/" component={Root}>
        <Route path={`${ROUTE_PATH.SINGLE_PAGE}`} getComponent={(nextState, callback) => {
            require.ensure([], function (require) {
                callback(null, require('./pages/single-page'));
            });
        }}>
        </Route>
    </Route>
);

export default Routes;
