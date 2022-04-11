import React from 'react';
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const Result = ({ result }) => {
  if (result)
    return (
      <Card className="text-center mt-3"  border={result.is_threat? "danger" : "success"}>
        <Card.Header>Result</Card.Header>
        <Card.Body>
          <Card.Title>
            <a target="_blank" href={"https://www.virustotal.com/gui/search/" + encodeURIComponent(encodeURIComponent(result.target))}>
              {result.target}
            </a>
            &nbsp;looks {result.is_threat? "Insecure": "Ok :)"}
          </Card.Title>
          <Card.Text>
            Here you can take a look at the number of services
            that have classified that target in the following categories
          </Card.Text>
        </Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>Harmless: {result.harmless}</ListGroup.Item>
          <ListGroup.Item>Malicious: {result.malicious }</ListGroup.Item>
          <ListGroup.Item>Suspicious: {result.suspicious}</ListGroup.Item>
          <ListGroup.Item>Timeout: {result.timeout}</ListGroup.Item>
          <ListGroup.Item>Undetected: {result.undetected}</ListGroup.Item>
        </ListGroup>
      </Card>
    )
}

export default Result;
