import React from 'react';
import AllBoards from '../Boards/AllBoards';
import '../../styles.css';
import { useAppSelector } from '../../redux/hooks';
import WelcomeRegistrationBox from './WelcomeRegistrationBox';
import SliderMain from '../Slider/SliderMain';
import VideoNav from '../Video/VideoNav';
import ContentBlock2 from '../Content/ContentBlock2';
import CreateBoardBox from '../Boards/CreateBoardBox';
import Search from './Search';

export default function MainPage(): JSX.Element {
  const user = useAppSelector((store) => store.user);

  return (
    <div className="containerMain">
      <div className="videoBarBlock">
        <VideoNav />
      </div>

      {!user.id && (
        <div className="sliderBlock">
          <SliderMain />
        </div>
      )}

      {user.id ? (
        <>
          <h1 style={{ color: 'white', fontSize: '40px', marginTop: '10px' }}>
            <div className="createBoard">Создай свою кинодоску</div>
            <div className="arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                // stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                />
              </svg>
            </div>
          </h1>
          <CreateBoardBox />
        </>
      ) : (
        <h1 style={{ color: 'white', fontSize: '40px' }}>Топ досок пользователей</h1>
      )}

      <Search />

      <div className="AllCardBlock">
        <AllBoards />
      </div>

      <div className="contentBlock2">
        <ContentBlock2 />
      </div>

      {!user.name && <WelcomeRegistrationBox />}
    </div>
  );
}
