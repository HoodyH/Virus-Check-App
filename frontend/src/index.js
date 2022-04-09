import axios from "axios";
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import CheckForm from "./components/check.component";
import Error from "./components/error.component";
import Result from "./components/result.component";
import RequestList from "./components/list.component";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {requestList: [], showError: false, response: null}

    // blind to the constructor
    this.checkRequest = this.checkRequest.bind(this);
    this.showError = this.showError.bind(this);
  }

  showError(show){
    // update the state to show or not the error
    this.setState({
      showError: show
    });
  }

  // analyze incoming requests
  async checkRequest(target) {
    // make request to the backed
    try{
      // remove an eventual previous error, and requests
      this.showError(false)
      this.setState({response: null});

      // make the request to the server
      const response = await axios.post(
        '/api/check',
        {target: target}
      );

      // update the states to display on the webpage
      this.setState({
        response: response.data,
        requestList: this.state.requestList.concat(response.data)
      });

    }catch(e){
      console.log(e)
      this.showError(true)
    }
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
          <Error show={ this.state.showError } setShow={ this.showError }/>
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
