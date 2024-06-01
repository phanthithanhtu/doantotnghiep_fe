import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { makeStyles } from '@material-ui/core/styles';
import HospitalAdvertisement from './HospitalAdvertisement';
import './Slide.scss';

const useStyles = makeStyles((theme) => ({
  slidePoster: {
    position: 'relative',
  },
}));

const Slide = ({ popularMovies }) => {
  const classes = useStyles();

  return (
    <div className={classes.slidePoster}>
      <Carousel
        className="slide"
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showThumbs={false} // Disable thumbs
      >
        {popularMovies.map((movie, index) => (
          <div className="poster__item slide-item" key={index}>
            <div className="poster__image">
              <img src={movie.backgroundURL} alt={movie.title} />
              <HospitalAdvertisement /> {/* Hiển thị nội dung quảng cáo */}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slide;
