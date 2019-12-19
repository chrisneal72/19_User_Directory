import React, { Component } from "react";
import API from "../utils/API";
import Container from "../components/Container";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import Alert from "../components/Alert";

class Search extends Component {
  state = {
    search: "",
    results: [
        {
        "gender": "female",
        "name": {
        "title": "Mrs",
        "first": "Marsha",
        "last": "Rivera"
        },
        "location": {
        "street": {
        "number": 6658,
        "name": "Mcclellan Rd"
        },
        "city": "Greensboro",
        "state": "Indiana",
        "country": "United States",
        "postcode": 45319,
        "coordinates": {
        "latitude": "58.5496",
        "longitude": "120.8175"
        },
        "timezone": {
        "offset": "+5:45",
        "description": "Kathmandu"
        }
        },
        "email": "marsha.rivera@example.com",
        "login": {
        "uuid": "ac7ca764-6b13-4573-94b7-593b1ae84b7d",
        "username": "heavyfrog657",
        "password": "potter",
        "salt": "RhoxClwr",
        "md5": "ea3224b0504a7e71e99e2995204feb99",
        "sha1": "4a9254c9d11b1e9390417dee79846b102d951b65",
        "sha256": "9c0f78f72dd747a39fc1aa7205f2bec2e5c5a656ef26cc525905f60c7bca13af"
        },
        "dob": {
        "date": "1954-12-06T22:07:36.321Z",
        "age": 65
        },
        "registered": {
        "date": "2014-07-16T19:16:04.989Z",
        "age": 5
        },
        "phone": "(695)-274-8891",
        "cell": "(746)-392-9154",
        "id": {
        "name": "SSN",
        "value": "580-80-6843"
        },
        "picture": {
        "large": "https://randomuser.me/api/portraits/women/11.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/11.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/11.jpg"
        },
        "nat": "US"
        }
    ],
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
    console.log(this.state.search)
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.getUsers(this.state.search)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({ results: res.data.message, error: "" });
      })
      .catch(err => this.setState({ error: err.message }));
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
          <SearchResults results={this.state.results} />
          </table>
        </Container>
      </div>
    );
  }
}

export default Search;
