import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "../css/carousel.css";

const CarouselMovies = props => {
  let { slides } = props;

  const displayMovie = slides.map(movie => {
    return (
      <div className='imgSlideContainer'>
        
        <img
          src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
          alt={movie.original_title}
          className='imgMovie'
        />
        <div className='movieTitle'>
          <p>{movie.title}</p>
        </div>
      </div>
    );
  });

  return (
    <div className='carouselContainer'>
      <Carousel
        additionalTransfrom={0}
        arrows
        itemClass='slides'
        autoPlay={true}
        autoPlaySpeed={2100}
        centerMode={true}
        containerClass='container-with-dots'
        focusOnSelect={false}
        infinite
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024
            },
            items: 3,
            partialVisibilityGutter: 40
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0
            },
            items: 1,
            partialVisibilityGutter: 30
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464
            },
            items: 2,
            partialVisibilityGutter: 30
          }
        }}
        showDots={false}
        sliderClass=''
        slidesToSlide={1}
        swipeable
      >
        {displayMovie}
      </Carousel>
    </div>
  );
};

export default CarouselMovies;
