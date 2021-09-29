import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateBoardBox(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row justify-center items-center" style={{ marginTop: '2vh' }}>
      <button
        type="button"
        className="flex flex-row bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full"
        onClick={() => navigate('/addBoard')}
      >
        <span>+ добавить кинодоску</span>
      </button>
    </div>
  );
}
