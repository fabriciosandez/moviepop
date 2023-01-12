import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [bnValue, setBNValue] = React.useState(0);
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%", position: "fixed", bottom: 0, zIndex: 100 }}>
      <BottomNavigation
        sx={{ bgcolor: "#116466" }}
        showLabels={true}
        value={bnValue}
        onChange={(event, value) => {
          setBNValue(value);
        }}
      >
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Trending"
          value={bnValue}
          onClick={() => navigate("/")}
          icon={<WhatshotIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Movies"
          value={bnValue}
          onClick={() => navigate("/movies")}
          icon={<MovieIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Series"
          value={bnValue}
          onClick={() => navigate("/series")}
          icon={<TvIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Search"
          value={bnValue}
          onClick={() => navigate("/search")}
          icon={<SearchIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
