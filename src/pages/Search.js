import React, { Component } from "react";
import API from "../utils/API";
import Container from "../components/Container";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import Alert from "../components/Alert";

class Search extends Component {
  state = {
    search: "",
    toSearch: "",
    results: [],
    filtered: [],
    error: ""
  };

  // When the component mounts, get a list of all available base breeds and update this.state.breeds
  componentDidMount() {
    API.getUsers()
      .then(res => this.setState({ results: res.data.results }))
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    this.setState({ search: event.target.value });
  };

  filterResults = (searchTerm) => {
    let words = searchTerm.toLowerCase().split(' ');
    let resultArr = this.state.results;
    let filteredArray = [];
    for(let i=0; i < resultArr.length; i++){
      console.log(resultArr[i].name.first.toLowerCase().includes(words[0]), resultArr[i].name.first.toLowerCase(), words[0])
      if((resultArr[i].name.first.toLowerCase().includes(words[0]) || resultArr[i].name.first.toLowerCase().includes(words[1])) || (resultArr[i].name.last.toLowerCase().includes(words[0]) || resultArr[i].name.last.toLowerCase().includes(words[1]))){
        filteredArray.push(resultArr[i])
      }
    }
    this.setState({filtered: filteredArray, toSearch: this.state.search});
  }

  handleFormSubmit = event => {
    event.preventDefault();
    this.filterResults(this.state.search)
  };

  render() {
    return (
      <div>
        <Container style={{ minHeight: "80%" }}>
          <h1 className="text-center">Search By Name!</h1>
          <Alert
            type="danger"
            style={{ opacity: this.state.error ? 1 : 0, marginBottom: 10 }}
          >
            {this.state.error}
          </Alert>
          <SearchForm
            handleFormSubmit={this.handleFormSubmit}
            handleInputChange={this.handleInputChange}
            employees={this.state.employees}
          />
          <table>
            <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Cell Phone</th>
            </tr>
            </thead>

          {!this.state.toSearch ? <SearchResults results={this.state.results} /> : <SearchResults results={this.state.filtered} />}  
          </table>
        </Container>
      </div>
    );
  }
}

export default Search;
