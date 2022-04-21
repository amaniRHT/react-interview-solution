import React, { useEffect, useState } from "react";
import { List, Spin } from "antd";
import { movies$ } from "../../../core/data/movies";
import { Row, Col } from "antd";
import MovieCard from "../../../components/card";
import MoviesFilter from "../movies-filter";


function MoviesList() {

  //simulate loading effect while pages loads
  const [loading, setLoading] = useState(true);

  //my tmp list of movies
  const [movies, setMovies] = useState([]);
 

  //my fixed list of movies
  const [fixedMoviesList, setFixedMoviesList] = useState([]);

  //my tmp categories of movies
  const [categories, setCategories] = useState([]);

  //load movies on load
  useEffect(() => {
    movies$.then((result) => {
      setMovies(result);
      setFixedMoviesList(result);
      setCategories([...new Set(result.map((movie) => movie.category))]);
      setLoading(false);
    });
  }, []);
  //delete a movie by it's id
  const deleteMovie = (id) => {
    const newMovies = movies.filter((movie) => movie.id != id);
    setMovies(newMovies);
    setCategories([...new Set(newMovies.map((movie) => movie.category))]);
  };

  //increment movie like by it's id
  const likeMovie = (id) => {
    const newMovies = movies.map((movie) => {
      if (movie.id === id) {
        return { ...movie, likes: movie.likes + 1 };
      }

      return movie;
    });

    setMovies(newMovies);
  };

  //increment movie dislike by it's id
  const disLikeMovie = (id) => {
    const newMovies = movies.map((movie) => {
      if (movie.id === id) {
        return { ...movie, dislikes: movie.dislikes + 1 };
      }

      return movie;
    });

    setMovies(newMovies);
  };

  //handle filter by category name
  const filterMovies = (categories) => {
    if (categories.length > 0) {
      const newMovies = fixedMoviesList.filter((movie) =>
        categories.includes(movie.category)
      );
      setMovies(newMovies);
    } else {
      setMovies(fixedMoviesList);
    }
  };

  //pagination , next page
  const next = (index) => {
    const newMovies = fixedMoviesList.slice(index-1,index*2)
    setMovies(newMovies);
  };

  //pagination , previous page
  const previous = (index) => {
    const newMovies = fixedMoviesList.slice(- index * 2 , -index -1 );
    setMovies(newMovies);
  };

  if (loading) return <Spin />;
  return (
    <>
      {movies?.length === 0 ? (
        <>no movies found</>
      ) : (
        <>
          <MoviesFilter categories={categories} filterMovies={filterMovies} />
          <div className="container">
            <List
              grid={{ gutter: 16, column: 4 }}
              pagination={{
                onChange: (page) => {
                  
                },
                defaultPageSize: 4,
                pageSizeOptions: ["4", "8", "12"],
                showSizeChanger: true,
              }}
              dataSource={movies}
              renderItem={(movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  deleteMovie={deleteMovie}
                  likeMovie={likeMovie}
                  disLikeMovie={disLikeMovie}
                />
              )}
            />
          </div>
        </>
      )}
    </>
  );
}

export default MoviesList;
