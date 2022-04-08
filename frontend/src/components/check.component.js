import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class CheckForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // update the value on change
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  // post the data to the server
  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Card className="text-center mt-3">
          <Card.Header>Analyze</Card.Header>
          <Card.Body>
            <Card.Title>Check safety of an IP or URL</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </Card.Body>
          <Card.Body>
            <Button type="submit" value="Submit">Check!</Button>
          </Card.Body>
        </Card>
      </form>
    );
  }
}

export default CheckForm;
