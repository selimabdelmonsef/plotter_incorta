import { combineReducers } from 'redux';
import DimensionsMeasureReducer from './dimensions_measures_reducer'

const rootReducer = combineReducers({
    DimensionsMeasureReducer,
});

export const MainReducerActionType = {
    Clear: "ClearMainReducer"
}

export default function MainReducers(state, action) {
    switch (action.type) {
        case MainReducerActionType.Clear:
            state = undefined;
            break;
        default: return rootReducer(state, action);
    }
}