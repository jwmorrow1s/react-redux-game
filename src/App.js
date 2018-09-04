import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";

class App extends Component {
  render() {
    return <div className="App">Hello, world!</div>;
  }
}

const mapStateToProps = state => {};
const mapDispatchToProps = dispatch => {};

export default connect(/*mapStateToProps,mapDispatchToProps*/)(App);
