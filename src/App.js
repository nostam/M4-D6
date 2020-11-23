import { Modal } from "react-bootstrap";
import { Link, Route, Switch } from "react-router-dom";
import MovieList from "./components/MovieList";
import ModalMovie from "./components/ModalMovie";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import SinlgeMoviePage from "./components/SinlgeMoviePage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        {/* not route properly? */}
        <Route exact path="/">
          <MovieList />
          {/* <ModalMovie />   */}
        </Route>
        {/*not route properly?  */}
        <Route exact path="/movie/:id">
          <SinlgeMoviePage />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
