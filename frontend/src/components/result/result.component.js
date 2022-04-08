import React from 'react';
import './result.component.css';

const Result = ({ result }) => {
  if (result)
    return (
      <div className="container">
        <h3 className="p-3 text-center">Response</h3>
        <tr key={result.id}>
          <td>{result.target}</td>
          <td>{result.is_threat}</td>
          <td>{result.timestamp}</td>
          <td>{result.harmless}</td>
          <td>{result.malicious}</td>
          <td>{result.suspicious}</td>
          <td>{result.timeout}</td>
          <td>{result.undetected}</td>
        </tr>
      </div>
    )
}

export default Result;
