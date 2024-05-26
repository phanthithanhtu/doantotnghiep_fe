import React from "react";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "./Slide.scss";
const Slide = ({ popularMovies }) => {
  return (
    <div className="slide-poster">
      <Carousel
        className="slide"
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
      >
        {popularMovies.map((movie, index) => (
          <div className="poster__item slide-item" key={index}>
            <div className="poster__image">
              <img src={movie.backgroundURL} alt={movie.title} />
            </div>
            <div className="overlay">
              <div className="overlay-content">
            
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slide;
