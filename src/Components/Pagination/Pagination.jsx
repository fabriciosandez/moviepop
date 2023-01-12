import React from "react";
import { Pagination } from "@mui/material";
import { createTheme, ThemeProvider} from "@mui/material/styles";

const theme = createTheme({
  palette:{
    mode: "dark",
  },
});

const CustomPagination = ({ setPage, numOfPages = 10 }) => {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div style={{
       width:"100%",
       display:"flex",
       justifyContent:"center",
       marginTop:10,
       
    }}>
      <ThemeProvider theme={theme}>
      <Pagination
        count={numOfPages}
        hidePrevButton hideNextButton
        color = "info"
        onChange={(e) => handlePageChange(e.target.textContent)}
      />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;
