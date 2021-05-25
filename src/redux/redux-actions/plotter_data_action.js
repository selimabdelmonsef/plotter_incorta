import Axios from 'axios';
import { api } from '../../constants/apis.js';



export const _GetPlotterData = () => (dispatch, data) => {
    Axios.post(api.postPlotterData_api, {
        
            "measures": ["Cost"],
            "dimension": "Year"
        
    }).then(response => {
    // console.log(response.data);
    dispatch({
        type: "GET_PLOTTER_DATA",
        data: response.data,
    });
    }).catch(error => {
        console.log(error);
    });
}