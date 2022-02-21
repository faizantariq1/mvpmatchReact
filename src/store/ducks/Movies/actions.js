import { createAction } from 'redux-actions';
import * as constants from './constants';

export const listMovieShowIdle = createAction(constants.LIST_MOVIESHOW_IDLE);
export const listMovieShowRequest = createAction(constants.LIST_MOVIESHOW_REQUEST);
export const listMovieShowSuccess = createAction(constants.LIST_MOVIESHOW_SUCCESS);
export const listMovieShowFailure = createAction(constants.LIST_MOVIESHOW_FAILURE);
