import React from 'react';
import s from './BoardPage.module.scss';
import {IBoard} from "../Home";
import { useParams} from "react-router-dom";

interface IBoardPageProps {
  // board: IBoard
}
const BoardPage:React.FC<IBoardPageProps> = () => {
    const {boardId} = useParams()
  return (
    <div>
      <h1>{boardId}</h1>
    </div>
  );
};

export default BoardPage;
