import React, { Component } from "react";
import { connect } from "react-redux";
import superagent from "superagent";

class App extends Component {
  state = {
    text: ""
  };
  stream = new EventSource("http://localhost:4000/stream");

  componentDidMount() {
    this.stream.onmessage = event => {
      const parsed = JSON.parse(event.data); // back to js data types
      // this.props.allMessages(parse);
      this.props.dispatch(parsed);
      console.log("parsed: ", parsed);
    };
  }

  onChange = event => {
    // OPTIONS:
    // const value = event.target.value
    // const {value} = event.target
    // nested destructuring
    const {
      target: { value }
    } = event;
    this.setState({ text: value });
  };

  onClick = () => {
    this.setState({ text: "" });
  };

  onSubmit = async event => {
    event.preventDefault();
    const url = "http://localhost:4000/messages";
    const response = await superagent.post(url).send(this.state);
    console.log("response:", response);
  };
  render() {
    console.log("props:", this.props);
    const { messages } = this.props;

    const list = messages.map(message => (
      <p key={message.id}>{message.text}</p>
    ));

    return (
      <div className="App">
        <div className="chatapp">
          <p>
            <span>
              <strong>ChatApp</strong>
            </span>
          </p>
          <header>
            {" "}
            <form onSubmit={this.onSubmit}>
              <input
                onChange={this.onChange}
                type="text"
                value={this.state.text}
              />
              <button>SEND</button>
            </form>
            <button onClick={this.onClick}>RESET</button>
          </header>
        </div>
        <main className="chatmessages">{list}</main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    // should always return an object
    // each property of this object becomes a PROP in this component :)
    messages: state
  };
}

// put data into store
// const mapDispatchToProps = {
//   allMessages
// the action can be dispatched by running this.props.allMessages inside the component
// };

export default connect(mapStateToProps)(App);
