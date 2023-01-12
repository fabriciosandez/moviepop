import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import Genres from "../Genres/Genres";
import useGenres from "../Hooks/useGenres";
import CustomPagination from "../Pagination/Pagination";

const Moviepage = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const genreForURL = useGenres(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`
    );
    setContent(data.results);
    setNumOfPages(500);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
    //eslint-disable-next-line
  }, [genreForURL, page]);

  return (
    <div className="main">
      <div>
        <div className="pageTitle2">Discover movies</div>
        <div className="genres">
          <Genres
            type="movie"
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            genres={genres}
            setGenres={setGenres}
            setPage={setPage}
          />
        </div>
      </div>
      <div className="container">
        {content &&
          content.map((info) => (
            <Card
              key={info.id}
              id={info.id}
              poster={info.poster_path}
              title={info.title || info.name}
              date={info.first_air_date || info.release_date}
              media_type="movie"
              vote_average={info.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Moviepage;
