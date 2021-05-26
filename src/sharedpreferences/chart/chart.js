import React, { Component } from 'react';
import { connect } from "react-redux";
import { _GetPlotterData } from "../../redux/redux-actions/plotter_data_action";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import styles from './chart.module.css'
class Chart extends React.Component {
    constructor(props){
    super(props);
    this.state = {
        dataLine: {
            labels: [],
            datasets: 
            [
                {
                    label: "Measures vs Dimensions",
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: "rgba(184, 185, 210, .3)",
                    borderColor: "rgb(35, 26, 136)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgb(35, 26, 136)",
                    pointBackgroundColor: "rgb(255, 255, 255)",
                    pointBorderWidth: 10,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgb(0, 0, 0)",
                    pointHoverBorderColor: "rgba(220, 220, 220, 1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data:[]
                }
            ]
        }
    }
  }
       async getDimensionsData (){
            this.props.plotterData[0].values?.map((dimensionsValue)=>{          
                this.setState({
                    dataLine:this.state.dataLine = {
                        datasets:this.state.dataLine.datasets,
                        labels:[...this.state.dataLine.labels,dimensionsValue]}
                })
            })
            console.log(this.props.plotterData)       
        }
        async getMeasures(){
                this.props?.plotterData[1]?.values.map((measuresValue,index)=>{
                this.state.dataLine.datasets.forEach((dataset) => {
                    dataset.data.push(parseInt(this.props.plotterData[1].values[index]));
                });
            });
                console.log(this.props.plotterData[1].values)
            console.log(this.state.dataLine.datasets[0])
        }
       
    
    componentDidMount() {
        this.props.GetPlotterData();
        setTimeout(() => {
            this.getMeasures();
            this.getDimensionsData();
            
    }, 2000)
    }
    render() {
        return (
            <MDBContainer className={styles.chartStyle}>
                {/* <h3 className="mt-5"></h3> */}
                <Line data={this.state.dataLine} options={{ responsive: true }} />
            </MDBContainer>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        plotterData: state.PlotterDataReducer.data,

    };
};

const mapDisaptchToProps = (dispatch) => {
    return {
        GetPlotterData: (data, onSucess) => {
            dispatch(_GetPlotterData(data, onSucess));
        },
    };
};

export default connect(mapStateToProps, mapDisaptchToProps)(Chart);


