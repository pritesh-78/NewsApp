import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {Switch} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

export default class App extends Component {
  pageSize=5;
  apiKey = process.env.REACT_APP_NEWS_API
  state={
    progress:0
  }
  setProgress = (progress)=>{
      this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
        <NavBar></NavBar>
        <LoadingBar
        color='#f11946' height={3} progress={this.state.progress}
      />
        <Switch>
          <Route exact path="/"><News setProgress={this.setProgress} apiKey={this.apikey} key="general" pageSize={this.pageSize} country="in" category="general"></News></Route>
          <Route exact path="/business"><News setProgress={this.setProgress} apiKey={this.apikey} key="business" pageSize={this.pageSize} country="in" category="business"></News></Route>
          <Route exact path="/entertainment"><News setProgress={this.setProgress} apiKey={this.apikey} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment"></News></Route>
          <Route exact path="/general"><News setProgress={this.setProgress} apiKey={this.apikey} key="general" pageSize={this.pageSize} country="in" category="general"></News></Route>
          <Route exact path="/health"><News setProgress={this.setProgress} apiKey={this.apikey} key="health" pageSize={this.pageSize} country="in" category="health"></News></Route>
          <Route exact path="/science"><News setProgress={this.setProgress} apiKey={this.apikey} key="science" pageSize={this.pageSize} country="in" category="science"></News></Route>
          <Route exact path="/sports"><News setProgress={this.setProgress} apiKey={this.apikey} key="sports" pageSize={this.pageSize} country="in" category="sports"></News></Route>
          <Route exact path="/technology"><News setProgress={this.setProgress} apiKey={this.apikey} key="technology" pageSize={this.pageSize} country="in" category="technology"></News></Route>
      </Switch>
      </Router>
      </div>
    )
  }
}
