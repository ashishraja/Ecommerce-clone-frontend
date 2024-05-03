import React from "react";
import ReactStars from "react-rating-stars-component";
import profilePng from "../images/Profile.png";

const ReviewCard = ({ review }) => {
  const options = {
    edit:false,
    color:"rgba(20,20,20,.1)",
    activeColor:"tomato",
    value: review.rating,
    readOnly: true,
    isHalf:true,
    size:window.innerWidth < 600 ? 20:25
  };

  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p style={{marginTop:"10px"}}>{review.name}</p>
      <ReactStars {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;