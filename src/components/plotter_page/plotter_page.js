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
                <div>
                    <Table bordered>
                        {/* <Table className="table-borderless"> */}
                        <caption>
                            Plotter
                        </caption>
                        {this.props.data?.map((element) => {
                            return <tr>
                                <th Style="
    padding-top: 35px;"> {element.name}</th>

                            </tr>
                        })}
                    </Table>
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.DimensionsMeasureReducer.data
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