import { handleActions } from 'redux-actions';
import update from 'immutability-helper';
import * as constants from './constants';

const initialState = {
    listMovieShow: {
        data: [],
        status: 'idle',
        message: {},
        payload: {}
    },
};

/* List Movie Show reducer */
const listMovieShowRequest = (state, action) => update(state, {
    listMovieShow: {
        status: { $set: 'loading' },
        payload: { $set: action.payload }
    }
});

const listMovieShowSuccess = (state, action) => update(state, {
    listMovieShow: {
        message: { $set: action.payload.data.message },
        data: { $set: action.payload.data },
        status: { $set: 'success' },
    }
});

const listMovieShowFailure = (state, action) => update(state, {
    listMovieShow: {
        message: { $set: action.payload.message },
        status: { $set: 'failure' },
    }
});

const listMovieShowIdle = state => update(state, {
    listMovieShow: {
        data: { $set: initialState.listMovieShow.data },
        status: { $set: 'idle' },
    }
});

export default handleActions({
    [constants.LIST_MOVIESHOW_REQUEST]: listMovieShowRequest,
    [constants.LIST_MOVIESHOW_SUCCESS]: listMovieShowSuccess,
    [constants.LIST_MOVIESHOW_FAILURE]: listMovieShowFailure,
    [constants.LIST_MOVIESHOW_IDLE]: listMovieShowIdle,
}, initialState);

