import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import styles from './plotter_page.module.css'
import { connect } from "react-redux";
import { _GetDimensionsMeasuresData } from "../../redux/redux-actions/dimensions_measures_action";
import { _GetPlotterData } from "../../redux/redux-actions/plotter_data_action";
import {_GetChartData} from "../../redux/redux-actions/chart_action"
import Chart from '../../sharedpreferences/chart/chart'

export let dimensionValue="";
export let measureValue = "";
class PlotterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handleDrag_1: "",
            handleDrag_2: "",
            handleDragMeasure:"",
            dragError:"",
            chartComplete:false,
        }
    }
    async componentDidMount() {
        await this.props.GetDimensionsMeasuresData();
        
    }
    onDragStart = (event, taskName) => {
        event.dataTransfer.setData("taskName", taskName);
        this.setState({
            handleDrag_1: taskName,
            dragError:"",
            chartComplete:false,
        })
    }
    onDragOver = (event, task) => {
        event.preventDefault();
    }
    onDropDimension = (event, taskName) => {
        if(this.state.handleDrag_1.function === "dimension"){
            this.setState({
                handleDrag_2: this.state.handleDrag_1
            });
            dimensionValue=this.state.handleDrag_2.name;
            // console.log(this.state.handleDrag_2.name);
            // setTimeout(()=>{
            //     dimensionValue=this.state.handleDrag_2.name;
                
            // },2000);
            
            
        }
        else{
            this.setState({
                dragError: "Sorry, should be dropped in Measure"
            })
        }
        if(measureValue!=="" && dimensionValue!== ""){
            this.props.GetPlotterData();
            this.props.GetChartData();
            this.setState({
             chartComplete:true,
            })
        }
        console.log(this.props)
        console.log(this.state.handleDrag_2);
        console.log(this.state.dragError);

    }
    onDropMeasure = (event, taskName) => {
        if(this.state.handleDrag_1.function === "measure"){
            this.setState({
                handleDragMeasure: this.state.handleDrag_1,
                dragError:"",
            })
            measureValue = this.state.handleDragMeasure.name
            // console.log(this.props)
            // setTimeout(()=>{
            //     measureValue = this.state.handleDragMeasure.name
            // },2000);
            
            
        }
      
        else{
            this.setState({
                dragError: "Sorry, Should be dropped in Dimension"
            })
        }
        if(measureValue!=="" && dimensionValue!== ""){
            this.props.GetPlotterData();
                this.props.GetChartData();
            this.setState({
             chartComplete:true,
            })
        }
        console.log(this.state.handleDrag_2);
        console.log(this.state.dragError);

    }

    render() {
        return (
            <div>
                <div>
                    <Table bordered>
                        <caption>
                            Plotter
                        </caption>
                        {this.state.chartComplete===false?<div>No Data Yet</div>:<Chart></Chart>}
                        
                        {this.props.data?.map((element, index) => {
                            return <tr>
                                <th draggable="true" onDragStart={(event) => this.onDragStart(event, element)} style={{ paddingTop: '45px' }}> {element.name}</th>

                                <div className={styles.block_1} onDragOver={(event) => this.onDragOver(event)} onDrop={(event) => this.onDropDimension(event)}>
                                    Dimensions: <span >
                                    {this.state.handleDrag_2.name}</span>
                                </div>
                                <div className={styles.block_2} onDragOver={(event) => this.onDragOver(event)} onDrop={(event) => this.onDropMeasure(event)}>
                                Measure: <span >
                                       {this.state.handleDragMeasure.name}
                                    </span>
                                    
                                </div>
                            </tr>
                        })}
                        <h1 className={styles.errorStyle}>{this.state.dragError}</h1>
                    </Table>
                </div>
                
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.DimensionsMeasureReducer.data,
        plotterData: state.PlotterDataReducer.data,
        dimensions: state.handleDrag_2,

    };
};

const mapDisaptchToProps = (dispatch) => {
    return {
        GetDimensionsMeasuresData: (data, onSucess) => {
            dispatch(_GetDimensionsMeasuresData(data, onSucess));
        },
        GetPlotterData: (data, onSucess) => {
            dispatch(_GetPlotterData(data, onSucess));
        },
        GetChartData: (data, onSucess) => {
            dispatch(_GetChartData(data, onSucess));
        },
    };
};

export default connect(mapStateToProps, mapDisaptchToProps)(PlotterPage);