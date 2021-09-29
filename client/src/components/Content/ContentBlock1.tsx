import React from 'react';

export default function ContentBlock1(): JSX.Element {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-20 p-5 mx-auto sm:p-10 md:p-16 bg-gray-100 text-gray-800 fonZ">
      <div className="flex flex-col mx-auto overflow-hidden rounded">
        <img src="https://avatars.mds.yandex.net/i?id=b10135531a1f8c5e747785292a6b820f-5312300-images-thumbs&n=13&exp=1" />
        <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md bg-gray-50 fonX">
          <div className="space-y-2">
            <a
              rel="noopener noreferrer"
              href="#"
              className="inline-block text-2xl font-semibold sm:text-3xl"
            >
              "Кино может быть ложью, отражением реальности, или отражением мечты. Но в любом
              случае, это очень сильное средство воздействия на людей"
            </a>
            <p className="text-xs text-gray-600">
              By{' '}
              <a rel="noopener noreferrer" href="#" className="text-xs hover:underline">
                Акира Куросава, японский режиссер
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col mx-auto overflow-hidden rounded">
        <img
          src="https://www.film.ru/sites/default/files/filefield_paths/brody-scorsesedocumentary.jpg"
          className="imgBLock"
        />
        <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md bg-gray-50 fonX">
          <div className="space-y-2">
            <a
              rel="noopener noreferrer"
              href="#"
              className="inline-block text-2xl font-semibold sm:text-3xl"
            >
              "Кино может быть ложью, отражением реальности, или отражением мечты. Но в любом
              случае, это очень сильное средство воздействия на людей"
            </a>
            <p className="text-xs text-gray-600">
              By{' '}
              <a rel="noopener noreferrer" href="#" className="text-xs hover:underline">
                Акира Куросава, японский режиссер
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
