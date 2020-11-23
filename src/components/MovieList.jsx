import React, { Component } from "react";
import { Container, Button, Form, FormControl } from "react-bootstrap";
import ModalMovie from "./ModalMovie";
import MoviesRow from "./MoviesRow";

export default class MovieList extends Component {
  state = {
    show: false,
    currentMovie: [],
    searchQuery: "",
    showSearch: false,
  };
  componentDidMount = (movie) => {};

  handleOpenModal = async (movieId) => {
    this.setState({ show: true, currentMovie: movieId });
  };
  handleSearch = (e) => {
    e.preventDefault();
    console.log(this.state.searchQuery);
    // this.setState({ searchQuery: e.target.value });
  };
  // ComponentDidUpdate = (prevState) => {
  //   if (prevState.searchQuery !== this.state.searchQuery) {
  //     this.setState({ showSearch: true});
  //   }
  // };
  handleCloseModal = () => {
    this.setState({ show: false, currentMovie: "" });
  };

  render() {
    let { show, currentMovie } = this.state;
    return (
      <div>
        <Container className="d-flex justify-content-end" fluid>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              onKeyUp={(e) => {
                this.setState({ searchQuery: e.target.value });
              }}
            />
            <Button
              variant="outline-secondary"
              onClick={(e) => {
                this.handleSearch(e);
              }}
            >
              Search
            </Button>
          </Form>
        </Container>
        <MoviesRow handleOpenModal={this.handleOpenModal} query={"Batman"} />
        <MoviesRow
          handleOpenModal={this.handleOpenModal}
          query={"Harry Potter"}
        />
        {this.state.showSearch ? (
          <>
            <MoviesRow
              handleOpenModal={this.handleOpenModal}
              query={this.state.searchQuery}
            />
          </>
        ) : (
          ""
        )}
        <ModalMovie
          handleClose={this.handleCloseModal}
          show={show}
          currentMovie={[...currentMovie]}
        ></ModalMovie>
      </div>
    );
  }
}
