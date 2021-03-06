import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";
import { Route } from "react-router";
import Nav from "./components/NavBar";
import SmurfDetail from "./components/SmurfDetail";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3333/smurfs")
      .then(response => {
        this.setState({ smurfs: response.data });
      })
      .catch(err => console.log(err));
  }

  deleteSmurfHandler = id => {
    return () => {
      axios
        .delete(`http://localhost:3333/smurfs/${id}`)
        .then(response =>
          this.setState({
            smurfs: response.data
          })
        )
        .catch(err => console.log(err));
    };
  };

  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
        <Nav />
        <Route
          path="/smurf-form"
          component={() => <SmurfForm smurfs={this.state.smurfs} />}
        />
        <Route
          path="/"
          exact
          component={() => (
            <Smurfs
              smurfs={this.state.smurfs}
              deleteSmurfHandler={this.deleteSmurfHandler}
            />
          )}
        />
        <Route
          path="/smurfs/:id"
          component={() => <SmurfDetail smurfs={this.state.smurfs} />}
        />
      </div>
    );
  }
}

export default App;
