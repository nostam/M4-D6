import React, { Component } from "react";
import { Row, Container, Spinner, Alert } from "react-bootstrap";

import SortIcon from "@material-ui/icons/Sort";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "../styles/MovieRow.css";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1100 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1100, min: 650 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 650, min: 300 },
    items: 2,
  },
};
export default class MoviesRow extends Component {
  state = {
    movies: [],
    sorted: true,
    loading: true,
    imgLoading: true,
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
        this.setState({ movies: data.Search, loading: false });
        setTimeout(() => this.setState({ imgLoading: false }), 2000);
      }
    } catch (e) {
      this.setState({ loading: false });
      console.log(e);
    }
  };
  render() {
    // const settings = {
    //   dots: false,
    //   infinite: true,
    //   speed: 500,
    //   slidesToShow: 6,
    //   slidesToScroll: 6,
    // };
    let { movies } = this.state;
    return (
      <>
        {!this.state.loading ? (
          <Container style={{ width: "100vw" }} className="mb-4 px-0" fluid>
            <Row className="d-flex align-items-center justify-content-between pl-5">
              <h3 className="movieRowTitle text-capitalize text-white my-3">
                {this.props.query}
              </h3>
              <SortIcon
                onClick={() => this.sortByYear()}
                style={{ color: "white", cursor: "pointer" }}
              />
            </Row>
            {/* {movies ? (
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
              </Slider> */}

            <Carousel
              swipeable={false}
              draggable={false}
              showDots={false}
              responsive={responsive}
              ssr={false} // means to render carousel on server-side.
              infinite={true}
              autoPlay={this.props.deviceType !== "mobile" ? true : false}
              autoPlaySpeed={5000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              deviceType={this.props.deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {movies.map((movie) => (
                <div
                  className="movieRowImg"
                  key={movie.imdbID}
                  onClick={() => this.props.handleOpenModal(movie.imdbID)}
                >
                  <img
                    className="img-fluid"
                    src={movie.Poster}
                    alt="movie-poster"
                  />
                </div>
              ))}
            </Carousel>
          </Container>
        ) : (
          <Alert
            variant="warning"
            className="d-flex text-center justify-content-center"
          >
            <h4>Loading {this.props.query} Movies</h4>
            <Spinner animation="border" role="status" variant="warning">
              <span className="sr-only">Loading Posters...</span>
            </Spinner>
          </Alert>
        )}
      </>
    );
  }
}
