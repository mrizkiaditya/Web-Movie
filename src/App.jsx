import React from 'react';
import { useEffect, useState } from "react";
import "./App.css";
import { getMovieList, searchMovie } from "./api";
import Typed from 'typed.js';

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["<i>Rizki's</i> Movie"],
      typeSpeed: 50,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
          <div className="Movie-title">{movie.title}</div>
          <img className="Movie-image" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          <div className="Movie-detail">
            <div className="Movie-date">Release: {movie.release_date}</div>
            <div className="Movie-rate">{movie.vote_average}</div>
          </div>
        </div>
      );
    });
  };

  const search = async(q) => {
    if (q.length > 3 ) {
      const query = await searchMovie(q)
      setPopularMovies(query.results)
    }
  };

  
  return (
    <div className="App">
      <header className="App-header">
        <h1><span ref={el}></span></h1>
        <input
          placeholder="Cari film disini..."
          className="Movie-search"
          onChange={({ target }) => search(target.value)}
        />
        <div className="Movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
};

export default App;
