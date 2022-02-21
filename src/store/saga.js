import { all } from 'redux-saga/effects';
import movies from './ducks/Movies/saga';

export default function* rootSaga() {
    yield all([]
        .concat(movies())
    );
};

