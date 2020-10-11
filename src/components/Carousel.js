import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CarouselMovies = props => {
  let { slides } = props;
  console.log(slides)

  const displayMovie = slides.map(movie => {
    console.log(movie);
    return (
      <div>
        <img
          src={"https://image.tmdb.org/t/p/w400/" + movie.poster_path}
          alt={movie.original_title}
        />
        <div className='movieTitle'>
          <p>{movie.title}</p>
        </div>
      </div>
    );
  });

  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      containerClass='container-with-dots'
      focusOnSelect={false}
      infinite
      keyBoardControl
      minimumTouchDrag={80}
      renderButtonGroupOutside={true}
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
  );
};

export default CarouselMovies;
