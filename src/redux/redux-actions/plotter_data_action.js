import Axios from 'axios';
import { api } from '../../constants/apis.js';



export const _GetPlotterData = () => (dispatch, measuresData, dimensionData) => {
    console.log(measuresData);
    Axios.post(api.postPlotterData_api, {
        
            "measures": [measuresData],
            "dimension": dimensionData
            // "measures": ["Cost"],
            // "dimension": "Year"
        
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