import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import axios from "axios";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../Config/config";
import { YouTube } from "@mui/icons-material";
import "./Modal.css";
import Gallery from "../Carousel/Carousel";

const style = {
  position: "absolute",
  top: "13%",
  left: "12%",
  width: "67%",
  height: "68%",
  backgroundColor: "#376e6f",
  border: "1px solid #116466",
  borderRadius: 10,
  color: "white",
  boxShadow: 24,
  padding: 3,
};

export default function DetailModal({ children, media_type, id }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div>
        <div
          className="media"
          style={{ cursor: "pointer" }}
          color="inherit"
          onClick={handleOpen}
        >
          {children}
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
        >
          <Fade in={open}>
            {content && (
              <Box sx={style}>
                <div className="detailModal">
                  <img
                    alt={content.name || content.title}
                    className="modalPortrait"
                    src={
                      content.poster_path
                        ? `${img_500}/${content.poster_path}`
                        : unavailable
                    }
                  />
                  <img
                    src={
                      content.backdrop_path
                        ? `${img_500}/${content.backdrop_path}`
                        : unavailableLandscape
                    }
                    alt={content.name || content.title}
                    className="modalLandscape"
                  />
                  <div className="modalAbout">
                    <span className="modalTitle">
                      {content.name || content.title}(
                      {(
                        content.first_air_date ||
                        content.release_date ||
                        "-----"
                      ).substring(0, 4)}
                      )
                    </span>
                    {content.tagline && (
                      <i className="tagline">{content.tagline}</i>
                    )}
                    <span className="modalDescription">{content.overview}</span>
                    <div>
                      <Gallery media_type={media_type} id={id} />
                    </div>
                    <Button
                      variant="contained"
                      startIcon={<YouTube />}
                      color="error"
                      target="_blank"
                      href={`https://www.youtube.com/watch?v=${video}`}
                    >
                      Watch the trailer
                    </Button>
                  </div>
                </div>
              </Box>
            )}
          </Fade>
        </Modal>
      </div>
    </>
  );
}
