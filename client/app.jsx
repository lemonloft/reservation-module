const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // componentDidMount() {
  //   fetch('/allLofts', {
  //     method: 'GET'
  //   })
  //     .then(response => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       let sampleReservation = {
  //         loft_id: 1,
  //         startDate: '2019-12-24',
  //         endDate: '2019-12-26'
  //       }
  //       fetch('/reservations', {
  //         method: 'POST',
  //         body: JSON.stringify(sampleReservation),
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       })
  //       .then(() => {
  //         fetch(`/reservations?q=${data[0].url}`,{
  //           method: 'GET'
  //         })
  //         .then(response => response.json())
  //         .then((datum) => {
  //           console.log(datum);
  //         })
  //         .catch(err => {
  //           console.log('err: ', err);
  //         });
  //       })
  //     })
  //     .catch(err => {
  //       console.log('err: ', err)
  //     });
  // }
  render() {
    return (
      <div>Hello World!</div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));