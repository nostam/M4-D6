import React, { Component } from "react";
import { Row, Button, Container, Col, Card } from "react-bootstrap";
import "../styles/MovieRow.css";
import SortIcon from "@material-ui/icons/Sort";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class MoviesRow extends Component {
  state = {
    movies: [],
    sorted: true,
  };
  componentDidMount = async () => {
    await this.fetchMovies(this.props.query);
    console.log(this.state.movies);
  };
  // componentDidMount = async () => {
  //   if(this.state.sorted)
  //   {await this.fetchMovies(this.props.query);
  //   console.log(this.state.movies);}
  // };
  sortByYear = () => {
    let { movies } = this.state;
    let moviesByYear = movies.sort(
      (movie1, movie2) => movie1.Year - movie2.Year
    );
    this.setState({ movies: moviesByYear, sorted: true });
  };

  fetchMovies = async (q) => {
    let baseUrl = `http://www.omdbapi.com/?`;
    let apiKey = `apikey=e88d2a55&`;
    try {
      let res = await fetch(`${baseUrl}s=${q}&${apiKey}`, {
        method: "GET",
      });
      if (res.ok) {
        let data = await res.json();
        this.setState({ movies: data.Search });
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
    };
    let { movies } = this.state;
    return (
      <>
        <Container style={{ width: "98vw" }} fluid>
          <Row>
            <h3 className="movieRowTitle text-capitalize text-white">
              {this.props.query}
            </h3>
          </Row>
          <Slider {...settings}>
            {console.log("Showing movies row", movies)}
            {movies.map((movie) => (
              <div className="movieRowImg">
                <a onClick={() => this.props.handleOpenModal(movie.imdbID)}>
                  <img
                    className="img-fluid"
                    src={movie.Poster}
                    alt="movie-poster"
                  />
                </a>
              </div>
            ))}
          </Slider>
        </Container>
      </>
    );
  }
}
