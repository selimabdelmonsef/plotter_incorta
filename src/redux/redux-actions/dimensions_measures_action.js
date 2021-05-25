import Axios from 'axios';
import { api } from '../../constants/apis.js';



export const _GetDimensionsMeasuresData = () => (dispatch, data) => {
    Axios.get(api.dimensionsMesaures_api).then(response => {
        dispatch({
            type: "GET_DATA",
            data: response.data,
        });
    }).catch(error => {
        console.log(error);
    });
} 