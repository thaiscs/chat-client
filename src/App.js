import React, { Component } from "react";

class App extends Component {
  stream = new EventSource("http://localhost:4000/stream");

  componentDidMount() {
    this.stream.onmessage = event => {
      console.log("event test: ", event.data);

      const parse = JSON.parse(event.data); // back to js data types
      console.log("parsed: ", parse);
    };
  }

  render() {
    return <div>cliente</div>;
  }
}

export default App;
