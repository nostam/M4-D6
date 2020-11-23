import React, { Component } from "react";
import { Row, Container, Spinner } from "react-bootstrap";
import "../styles/MovieRow.css";
import SortIcon from "@material-ui/icons/Sort";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class MoviesRow extends Component {
  state = {
    movies: [],
    sorted: true,
    loading: true,
  };

  componentDidMount = async () => {
    this.fetchMovies(this.props.query);
    // console.log(this.state.movies);
  };

  sortByYear = () => {
    let { movies } = this.state;
    let moviesByYear = movies.sort(
      (movie1, movie2) => movie1.Year - movie2.Year
    );
    this.setState({ movies: moviesByYear, sorted: true });
  };

  fetchMovies = async (q) => {
    this.setState({ loading: true });
    let baseUrl = `http://www.omdbapi.com/?`;
    let apiKey = `apikey=8b7d8ea7&`;
    try {
      let res = await fetch(`${baseUrl}s=${q}&${apiKey}`, {
        method: "GET",
      });
      if (res.ok) {
        let data = await res.json();
        this.setState({ movies: data.Search });
        setTimeout(() => this.setState({ loading: false }), 1000);
      }
    } catch (e) {
      this.setState({ loading: false });
      console.log(e);
    }
  };
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 6,
    };
    let { movies } = this.state;
    return (
      <>
        {!this.state.loading ? (
          <Container style={{ width: "98vw" }} className="mb-4" fluid>
            <Row className="d-flex align-items-center justify-content-between">
              <h3 className="movieRowTitle text-capitalize text-white my-3">
                {this.props.query}
              </h3>
              <SortIcon
                onClick={() => this.sortByYear()}
                style={{ color: "white", cursor: "pointer" }}
              />
            </Row>
            {movies ? (
              <Slider {...settings}>
                {movies.map((movie) => (
                  <div className="movieRowImg" key={movie.imdbID}>
                    <a
                      href="#"
                      onClick={() => this.props.handleOpenModal(movie.imdbID)}
                    >
                      <img
                        className="img-fluid"
                        src={movie.Poster}
                        alt="movie-poster"
                      />
                    </a>
                  </div>
                ))}
              </Slider>
            ) : (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading Posters...</span>
              </Spinner>
            )}
          </Container>
        ) : (
          <>
            <h1 className="text-white">Loading {this.props.query} Movies</h1>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </>
        )}
      </>
    );
  }
}
