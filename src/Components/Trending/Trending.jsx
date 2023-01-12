import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import CustomPagination from "../Pagination/Pagination";

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );
    setContent(data.results);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div className="main">
      <span className="pageTitle">Trending this week</span>
      <div className="container">
        {content &&
          content.map((info) => (
            <Card
              key={info.id}
              id={info.id}
              poster={info.poster_path}
              title={info.title || info.name}
              date={info.first_air_date || info.release_date}
              media_type={info.media_type}
              vote_average={info.vote_average}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Trending;
