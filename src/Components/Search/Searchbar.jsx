import { Button, Tab, Tabs, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import CustomPagination from "../Pagination/Pagination";
import Card from "../Card/Card";

const Searchbar = () => {
  const [type, setType] = useState(0);
  const [searchTitle, setSearchTitle] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState();
  const [numOfPages, setNumOfPages] = useState();

  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#FFF" },
    },
  });

  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=en-US&query=${searchTitle}&page=${page}&include_adult=false`
    );

    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);

  return (
    <div className="main">
      <div className="pageTitle2">Search title</div>
      <div className="searchBar">
        <ThemeProvider theme={theme}>
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <Button
            variant="contained"
            color="info"
            style={{ marginLeft: 10, color: "white", height: "56px" }}
            onClick={fetchSearch}
          >
            <SearchIcon />
          </Button>
        </ThemeProvider>
      </div>
      <div>
        <ThemeProvider theme={theme}>
          <Tabs
            value={type}
            onChange={(event, value) => {
              setType(value);
              setPage(1);
            }}
          >
            <Tab style={{ width: "53%" }} label="Search Movies" />
            <Tab style={{ width: "53%" }} label="Search Series" />
          </Tabs>
        </ThemeProvider>
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
              media_type={type ? "tv" : "movie"}
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

export default Searchbar;
