import React from "react";
import { Modal } from "react-bootstrap";
import { Link, Route, Switch } from "react-router-dom";
import MovieList from "./components/MovieList";
import ModalMovie from "./components/ModalMovie";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import SinlgeMoviePage from "./components/SinlgeMoviePage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends React.Component {
  state = {
    loading: true,
  };
  componentDidMount = async () => {
    this.setState({ loading: false });
  };
  render() {
    return (
      <>
        {console.log("loaded VDOM")}
        {this.state.loading ? (
          <h1>Loading the main site...</h1>
        ) : (
          <div className="App">
            <NavBar />
            <Switch>
              <Route exact path="/">
                <MovieList />
                <ModalMovie />
              </Route>

              <Route exact path="/movie/:id">
                <SinlgeMoviePage />
              </Route>
            </Switch>
            <Footer />
          </div>
        )}
      </>
    );
  }
}

export default App;
