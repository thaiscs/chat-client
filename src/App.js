import React, { Component } from "react";
import { connect } from "react-redux";

class App extends Component {
  stream = new EventSource("http://localhost:4000/stream");

  componentDidMount() {
    this.stream.onmessage = event => {
      const parsed = JSON.parse(event.data); // back to js data types
      // this.props.allMessages(parse);
      this.props.dispatch(parsed);
      console.log("parsed: ", parsed);
    };
  }

  render() {
    console.log("props:", this.props);
    const { messages } = this.props;

    const list = messages.map(message => (
      <p key={message.id}>{message.text}</p>
    ));

    return (
      <div className="chatapp">
        <div>
          <p>
            <span>
              <strong>ChatApp</strong>
            </span>
          </p>
        </div>
        <div>{list}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    // should always return an object
    // each prop of this object becomes a prop in this component
    messages: state
  };
}

// put data into store
// const mapDispatchToProps = {
//   allMessages
// the action can be dispatched by running this.props.allMessages inside the component
// };

export default connect(mapStateToProps)(App);
