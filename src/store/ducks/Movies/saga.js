import { takeLatest, put } from "redux-saga/effects";
import * as actions from './actions';
import * as constants from './constants';
import Api from '../../../lib/api';
import {
    SEARCH_MOVIES_SHOWS_REQUEST_URL,
} from '../../../lib/url';

/* fetch Movie Show list */
function* listMovieShowRequest(req) {
    try {
        const payload = req.payload
        const response = yield Api.get(`${SEARCH_MOVIES_SHOWS_REQUEST_URL}query=${payload.query}&page=${payload.page}&include_adult=false`);
        yield put(actions.listMovieShowSuccess({ data: response }));
    } catch (error) {
        yield put(actions.listMovieShowFailure({ message: error.message }));
    }
}

export default () => [
    takeLatest(constants.LIST_MOVIESHOW_REQUEST, listMovieShowRequest),
];
