import axios from "axios";
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import CheckForm from "./components/check/check.component";
import Result from "./components/result/result.component";
import RequestList from "./components/list/list.component";
import './index.css';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {requestList: [], response: null}

    this.checkRequest = this.checkRequest.bind(this);
  }

  // analyze incoming requests
  async checkRequest(target) {
    // make request to the backed
    const response = await axios.post(
      '/api/check',
      {target: target}
    );

    // update the states to display on the webpage
    this.setState({
      response: response.data,
      requestList: this.state.requestList.concat(response.data)
    });
  }

  // once react has mount load the previous items from the backend
  async componentDidMount() {
    const response = await axios.get('/api/items');
    this.setState({ requestList: response.data });
  }

  render(){
    return (
      <div>
          <CheckForm onSubmit={ this.checkRequest } />
          <Result result={ this.state.response }/>
          <RequestList requestList={ this.state.requestList } />
      </div>

    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
