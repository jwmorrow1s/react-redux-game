import React, { Component } from "react";
import { connect } from "react-redux";

class Floor extends Component {
  render() {
    return <div id="Floor">Floor</div>;
  }
}

// const mapStateToProps = state => {};
// const mapDispatchToProps = dispatch => {};

export default connect(/*mapStateToProps ,mapDispatchToProps*/)(Floor);
