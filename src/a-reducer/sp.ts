/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2018-05-31 15:52:30
 * @LastEditTime: 2019-09-25 15:04:58
 * @LastEditors: Please set LastEditors
 */
/**
 * @fileOverview single page reducer
 * @author Max
 */

import { createReducer } from 'razy/dist/lib/reducer-utils';
import ACTION_TYPE from '../const/action-type';
import * as Immutable from 'immutable';

export interface DataStructure {
    id: number,
    serial: string,
    comment: string,
    name: string,
    prizes: string[]
}

const sp = createReducer(Immutable.fromJS({
    data: []
}), {
        [ACTION_TYPE.SP_GET_CHUNK]: (state: Immutable.Map<string, any>, action: any) => {
            console.log(action.payload, 'action.payload')
            return state.set('data', Immutable.fromJS(action.payload));
        }
    });

export default sp;