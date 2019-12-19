import React from "react";
import "./style.css";

function SearchResults(props) {
  console.log(props.results.results)
  return (
    <>
      {props.results.results.map(result => (
        <tr>
          <td><img alt="Employee" src={result.picture.thumbnail} className="img-fluid" /></td>
          <td>{result.name.first} {result.name.last}</td>
          <td>{result.email}</td>
          <td>{result.phone}</td>
          <td>{result.cell}</td>
        </tr>
      ))}
    </>
  );
}

export default SearchResults;
