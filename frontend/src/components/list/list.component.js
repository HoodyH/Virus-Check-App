import React from 'react';
import './list.component.css';


const RequestList = ({ requestList }) => {
  return (
    <div className="container">
          <h3 className="p-3 text-center">Recent Requests</h3>
          <table className="table table-striped table-bordered">
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
                      <td>{item.is_threat}</td>
                      <td>{item.timestamp}</td>
                      <td>{item.harmless}</td>
                      <td>{item.malicious}</td>
                      <td>{item.suspicious}</td>
                      <td>{item.timeout}</td>
                      <td>{item.undetected}</td>
                    </tr>)
                  })}
              </tbody>
          </table>
      </div>
  )
}

export default RequestList;
