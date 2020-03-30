/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2018-05-31 15:52:30
 * @LastEditTime: 2019-09-26 14:42:57
 * @LastEditors: Please set LastEditors
 */
/**
 * @fileOverview single page actions
 * @author Max
 */

import { createAction } from 'razy/dist/lib/action-utils';
import ACTION_TYPE from '../const/action-type';
import REQUEST from '../const/request';

export const getChunk = createAction(ACTION_TYPE.SP_GET_CHUNK, null, null, ({ teamName }) => _http.get(`${REQUEST.SP_GET_CHUNK}?teamName=${teamName}`));