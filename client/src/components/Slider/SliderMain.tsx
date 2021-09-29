import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { getMoviesThunk } from '../../redux/slices/movieSlice';
import '../../styles.css';

function SliderMain(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMoviesThunk());
  }, []);

  const films = useAppSelector((store) => store.movie);

  function updateImages() {
    currentIndex === films.movie.length - 4 ? setCurrentIndex(0) : '';

    const imagesToDisplay = films.movie.slice(currentIndex, currentIndex + 4);

    return imagesToDisplay.map((image, index) => (
      <img
        className="imgSlader"
        key={index}
        src={`https://image.tmdb.org/t/p/w500${image.backdrop_path}`}
        alt={`image ${index}`}
      />
    ));
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % films.movie.length);
    }, 2000);
    return () => clearInterval(intervalId);
  }, [films.movie.length]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateImages();
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return <div className="containerSlider">{updateImages()}</div>;
}

export default SliderMain;
