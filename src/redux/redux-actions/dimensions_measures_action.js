import Axios from 'axios';
import { api} from '../../constants/apis.js';


// var currentPage = 0;
export const _GetDimensionsMeasuresData = () => (dispatch, data) => {
    // console.log(today)
    // currentPage += 1;
    // dispatch({
    //     type: "LOADING",
    //     data: true
    // });


    Axios.get(api.dimensionsMesaures_api).then(response => {
            // console.log(curr)
            console.log(response)

            let data = [];
            data = response.data;
            // response.data.items.forEach((element, index) => {

            //     data = [
            //         ...data,
            //         {
            //             name: element.name,
            //             username: element.owner.login,
            //             description: element.description,
            //             stargazers_count: element.stargazers_count,
            //             open_issues_count: element.open_issues_count,
            //             avatar_url: element.owner.avatar_url
            //         }
            //     ];
console.log(data);

                dispatch({
                    type: "GET_DATA",
                    data: data,
                });
            //     dispatch({
            //         type: "LOADING",
            //         data: false
            //     });

            // });
        }).catch(error => {
            console.log(error);
        });



}