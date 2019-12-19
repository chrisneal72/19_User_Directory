import React from "react";
import "./style.css";

function SearchResults(props) {
  console.log(props.results)
  return (
    <tbody>
      {props.results.map(result => (
        <tr key={result.id.value}>
          <td><img alt="Employee" src={result.picture.thumbnail} className="img-fluid" /></td>
          <td>{result.name.first} {result.name.last}</td>
          <td>{result.email}</td>
          <td>{result.phone}</td>
          <td>{result.cell}</td>
        </tr>
      ))}
    </tbody>
  );
}

export default SearchResults;
