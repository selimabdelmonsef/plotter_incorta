import { combineReducers } from 'redux';
import DimensionsMeasureReducer from './dimensions_measures_reducer'
import PlotterDataReducer from './plotter_data_reducer'


 const rootReducer = combineReducers({
    DimensionsMeasureReducer,
    PlotterDataReducer,
});
export default rootReducer;