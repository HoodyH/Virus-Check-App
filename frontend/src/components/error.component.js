import React from 'react';
import Alert from "react-bootstrap/Alert";

const Error = ({ show, setShow }) => {
  if (show){
    return (
      <Alert variant="danger" className="text-center mt-3" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! Your entry it is invalid!</Alert.Heading>
        <p>
          Change to a valid url or ip and that and try again. The url must be from a website and must not include sub pages or urls parameters
        </p>
      </Alert>
    )
  }
}

export default Error;
