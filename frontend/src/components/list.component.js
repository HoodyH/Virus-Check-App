import React from 'react';
import Card from "react-bootstrap/Card";


const RequestList = ({ requestList }) => {
  return (
    <Card className="text-center mt-3">
      <Card.Header>Recent Requests</Card.Header>
      <Card.Body>
        <Card.Title>List of last analysis executed</Card.Title>
      </Card.Body>
      <Card.Body>
        <table className="table table-striped table-bordered table-sm">
          <thead>
            <tr>
              <th>Target</th>
              <th>Is Threat</th>
              <th>Timestamp</th>
              <th>Harmless</th>
              <th>Malicious</th>
              <th>Suspicious</th>
              <th>Timeout</th>
              <th>Undetected</th>
            </tr>
          </thead>
          <tbody>
            {requestList && requestList.map(item => {
              return(<tr key={item.id}>
                <td>{item.target}</td>
                <td>{item.is_threat? "Yes": "No"}</td>
                <td>{new Date(item.timestamp).toLocaleDateString(
                  undefined,
                  { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: 'numeric' }
                  )}
                </td>
                <td>{item.harmless}</td>
                <td>{item.malicious}</td>
                <td>{item.suspicious}</td>
                <td>{item.timeout}</td>
                <td>{item.undetected}</td>
              </tr>)
            })}
          </tbody>
          </table>
      </Card.Body>
    </Card>
  )
}

export default RequestList;
