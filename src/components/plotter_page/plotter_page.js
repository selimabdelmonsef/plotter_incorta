import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import styles from './plotter_page.module.css'
import { connect } from "react-redux";
import { _GetDimensionsMeasuresData } from "../../redux/redux-actions/dimensions_measures_action";


class PlotterPage extends React.Component {
    async componentDidMount() {
        await this.props.GetDimensionsMeasuresData();
        console.log(this.props.data)
    }
    render() {
        return (
            <div>
                <Table striped bordered hover>
                    <caption>
                        Plotter
                        </caption>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td colSpan="2">Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
                <div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.DimensionsMeasureReducer.data
        // data: state.RepoReducer.data,
        // loading: state.RepoReducer.loading,
        // trial: state.RepoReducer.trial,
        // allData: state.RepoReducer.AllData
    };
};

const mapDisaptchToProps = (dispatch) => {
    return {
        GetDimensionsMeasuresData: (data, onSucess) => {
            dispatch(_GetDimensionsMeasuresData(data, onSucess));
        },
    };
};

export default connect(mapStateToProps, mapDisaptchToProps)(PlotterPage);