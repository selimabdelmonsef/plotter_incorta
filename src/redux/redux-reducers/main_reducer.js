import { combineReducers } from 'redux';
import DimensionsMeasureReducer from './dimensions_measures_reducer'
import PlotterDataReducer from './plotter_data_reducer'


const rootReducer = combineReducers({
    DimensionsMeasureReducer,
    PlotterDataReducer
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