const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div></div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));