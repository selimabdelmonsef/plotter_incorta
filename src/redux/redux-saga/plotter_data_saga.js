import Axios from 'axios';
import { api } from '../../constants/apis.js';
import {all, put, call, takeLatest} from 'redux-saga/effects';

async function getPlotterData(payload) {
    return Axios.post(api.postPlotterData_api, {
        "measures": [payload.measures],
        "dimension": payload.dimension
    });

}
function* getPlotterDataSaga(action) {
    try{
        const plotterDataResponse= yield call(
            getPlotterData,
            action.payload,
          );
        console.log(plotterDataResponse);
        if(plotterDataResponse.status >=200 && plotterDataResponse.status<300){
            yield put({
                      type: 'GET_PLOTTER_DATA_SUCCESS',
                      payload: plotterDataResponse.data,
                    });
        }
        else{
            yield put({
                type: 'GET_PLOTTER_DATA_FAIL',
                payload: "An Error Occured",
              });
        }
    }
    catch(err){
        // console.log(err);
        yield put({
            type: 'GET_PLOTTER_DATA_FAIL',
            payload: "An Error Occured",
          });
    }
      }
export default function* rootSaga() {
    yield all([takeLatest('GET_PLOTTER_DATA', getPlotterDataSaga)]);
}