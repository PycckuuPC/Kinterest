import React from 'react';

function OneMovieCard({ film }): JSX.Element {
  return (
    <div className="bg-white rounded-md bg-gray-800 shadow-lg">
      <div className="md:flex px-4 leading-none max-w-4xl">
        <div className="flex-none ">
          <img
            src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
            alt="pic"
            className="h-72 w-56 rounded-md shadow-2xl transform -translate-y-4 border-4 border-gray-300 shadow-lg"
          />
        </div>

        <div className="flex-col text-black">
          {' '}
          <p className="pt-4 text-2xl font-bold">{film.title}</p>
          <hr className="hr-text" data-content="" />
          <div className="text-md flex justify-between px-4 my-2">
            Рейтинг IMDb: {film.vote_average}
            <span className="font-bold" />
          </div>
          <p className="hidden md:block px-4 my-4 text-sm text-left">{film.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default OneMovieCard;
