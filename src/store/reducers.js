import { combineReducers } from 'redux';
import movies from './ducks/Movies/reducer';

export default combineReducers({
    movies,
});
