import {all} from 'redux-saga/effects';

import getPlotterDataSaga from './plotter_data_saga'
import getDimensionsMeasuresData from './dimensions_measures_saga'

export default function* rootSaga() {
  yield all([getPlotterDataSaga(),getDimensionsMeasuresData()]);
}
