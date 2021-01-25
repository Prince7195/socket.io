import React, { Component } from "react";
import socket from "./uitilities/socketConnection";
import Widget from "./Widget";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          perfData: {}
        };
    }

    componentDidMount() {
      const that = this;
      socket.on("data", data => {
        const currentState = { ...that.state.perfData };
        currentState[data.macA] = data;
        that.setState({
          perfData: currentState
        });
        console.log(currentState);
      });
    }

    render() {
      const widgets = [];
      Object.entries(this.state.perfData).forEach(([key, value], index) => {
        widgets.push(<Widget key={key} data={value} index={index} />);
      });
      return (
        <div className="App">
          {widgets}
        </div>
      );
    }
}

export default App;
