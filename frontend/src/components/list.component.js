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
              <th>Results</th>
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
                <td>
                  Harmless: {item.harmless}&nbsp;
                  Malicious: {item.malicious}&nbsp;
                  Suspicious: {item.suspicious}&nbsp;
                  Timeout: {item.timeout}&nbsp;
                  Undetected: {item.undetected}
                </td>
              </tr>)
            })}
          </tbody>
          </table>
      </Card.Body>
    </Card>
  )
}

export default RequestList;
