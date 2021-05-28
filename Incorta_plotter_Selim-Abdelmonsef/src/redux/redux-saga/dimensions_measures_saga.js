import Axios from 'axios';
import { api } from '../../constants/apis.js';
import {all, put, call, takeLatest} from 'redux-saga/effects';
import {GET_DATA_SUCCESS, GET_DATA_FAIL, GET_DIMENSION_MEASURE_DATA} from '../../constants/actions_constants'

async function getDimensionsMeasuresData() {
   return Axios.get(api.dimensionsMesaures_api);
}
function* getDimensionsMeasuresDataSaga(action) {
    try{
        const DimensionsMeasuresDataSaga= yield call(
            getDimensionsMeasuresData
          );
        // console.log("KOLO",DimensionsMeasuresDataSaga);
        if(DimensionsMeasuresDataSaga.status === 200){ 
            yield put({
                      type: GET_DATA_SUCCESS,
                      payload: DimensionsMeasuresDataSaga.data,
                    });
        }
        else{
            yield put({
                type: GET_DATA_FAIL,
                payload: "An Error Occured",
              });
        }
    }
    catch(err){
        console.log(err);
        yield put({
            type: GET_DATA_FAIL,
            payload: "An Error Occured",
          });
    }
      }
export default function* rootSaga() {
    yield all([takeLatest(GET_DIMENSION_MEASURE_DATA, getDimensionsMeasuresDataSaga)]);
}