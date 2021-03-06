import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PlotterPage from './components/plotter_page/plotter_page';
import Chart from './sharedpreferences/chart/chart'


export default class App extends React.Component {
  render() {
    return (

      <Router>
        <Switch>
          <Route path="/" exact component={PlotterPage} />
          <Route path="/chart" component={Chart} />
        </Switch>
      </Router >
    ) 
  }
}