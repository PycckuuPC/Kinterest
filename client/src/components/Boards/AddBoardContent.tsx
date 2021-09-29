import React, { useEffect } from 'react'; // подключаем react, хук useEffect
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks'; // подключаем наши кастомные хуки redux
import { getMoviesThunk } from '../../redux/slices/movieSlice'; // подключаем Thunk для получения всех досок
import '../../styles.css';
import AddOneFilm from './AddOneFilm';

export default function BoardContent(): JSX.Element {
  const dispatch = useAppDispatch(); // получили функцию dispatch вызвав наш кастомный useAppDispatch

  const films = useAppSelector((store) => store.movie); // получем из store фильммы конкретной доски

  useEffect(() => {
    dispatch(getMoviesThunk());
  }, []);

  return (
    <div className="container2">
      {films.movie.map((el) => (
        <AddOneFilm key={el.id} film={el} /> // мы передаем пропсом в OneRecord один объект из массива объектов
      ))}
    </div>
  );
}
