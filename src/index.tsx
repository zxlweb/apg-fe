/**
 * @fileOverview server entrance
 * @author Max
 */

import { start as startServer } from 'razy';
import APP from './a-reducer/app';
import ROUTES from './routes';
import { compose, createStore, applyMiddleware } from 'redux';
import promiseMiddleware = require('redux-promise');
import ValidatorMiddleware = require('redux-validator');
import ThunkMiddleware from 'redux-thunk';

const finalCreateStore = compose(
    applyMiddleware(ValidatorMiddleware(), ThunkMiddleware, promiseMiddleware)
)(createStore);

startServer({
    reducerRoot: APP,
    routes: ROUTES,
    createStore: finalCreateStore,
    serverInterceptor: app => {

    },
    dataFlagResolver: (obj: any, resolve: Function, reject: Function) => {
        if (obj.result_code === 0) {
            resolve(obj.content);
        } else {
            reject(obj);
        }
    }
});