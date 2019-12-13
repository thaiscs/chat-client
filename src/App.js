import React, { Component } from "react";
import { connect } from "react-redux";

class App extends Component {
  stream = new EventSource("http://localhost:4000/stream");

  componentDidMount() {
    this.stream.onmessage = event => {
      // console.log("event test: ", event.data);

      const parse = JSON.parse(event.data); // back to js data types
      console.log("parsed: ", parse);
    };
  }

  render() {
    return <div>cliente</div>;
  }
}

function mapStateToProps(state) {
  return {
    // should always return an object
    // each prop of this object becomes a prop in this component
    messages: state
  };
}

export default connect(mapStateToProps)(App);
