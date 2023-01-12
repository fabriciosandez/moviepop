import { Badge } from "@mui/material";
import React from "react";
import { img_300, unavailable } from "../../Config/config";
import DetailModal from "../Modal/Modal";
import "./Card.css";

const Card = ({ id, poster, title, date, media_type, vote_average }) => {
  return (
    <DetailModal media_type={media_type} id={id}>
      <Badge
        badgeContent={vote_average.toFixed(1)}
        color={vote_average > 6 ? "primary" : "secondary"}
      />
      <img src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
      <div className="moviedata">
        <span className="title">{title}</span>
        <span className="subTitle">
          {media_type === "tv" ? "Serie" : "Movie"}
          <span className="subTitle">{date}</span>
        </span>
      </div>
    </DetailModal>
  );
};

export default Card;
