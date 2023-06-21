import React, { memo, useEffect, useLayoutEffect, useState } from "react";
import s from "./BoardPage.module.scss";

import { useParams } from "react-router-dom";
import { getBoard } from "../../queries/getBoard";
import TaskColumn from "../Home/components/TaskColumn/TaskColumn";
import Button from "../../components/UI/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TaskColumnCreate from "../Home/components/TaskColumn/TaskColumnCreate";
import { createColumn } from "../../queries/createColumn";
import { IBoard } from "../../types/IBoard";
import PopupTaskInfo from "./PopupTaskInfo/PopupTaskInfo";
import {
  removeSelectedTask,
  setCurrentBoard,
  setCurrentTask,
} from "../../store/Reducers/boardCollectionSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getTaskInfo } from "../../queries/getTaskInfo";
import BoardPageHeader from "./BoardPageHeader/BoardPageHeader";
import { editBoard } from "../../queries/editBoard";
import TaskColumnLink from "../Home/components/TaskColumn/TaskColumnLink";

const BoardPage: React.FC = memo(() => {
  const { boardId } = useParams();
  const { selectedBoard, selectedTask, selectedColumnId } = useAppSelector(
    (state) => state.boardCollection
  );
  const [isCreating, setIsCreating] = useState(false);
  const [isLinking, setIsLinking] = useState(false);
  const dispatch = useAppDispatch();

  const getBoardFromId = () => {
    if (!boardId) return;
    return getBoard(boardId).then((board) => {
      dispatch(setCurrentBoard(board));
      return board;
    });
  };

  useEffect(() => {
    console.log(boardId);
    getBoardFromId();
  }, [boardId]);

  const refetchBoard = () => {
    getBoardFromId();
  };

  const refetchTask = async () => {
    if (!boardId || !selectedColumnId || !selectedTask) return;
    const res = await getTaskInfo(boardId, selectedColumnId, selectedTask.uid);
    dispatch(setCurrentTask(res));
  };

  const getColumnsFromBoard = (board: IBoard) => {
    return Object.values(board.columns).sort(
      (a, b) => +a.timeCreated - +b.timeCreated
    );
  };

  const createColumnAction = async (title: string, color: string) => {
    if (!boardId) return;
    await createColumn(title, color, boardId);
    setIsCreating(false);
    refetchBoard();
  };

  const onDeleteTask = () => {
    dispatch(removeSelectedTask());
    refetchBoard();
  };

  const onEditTitle = (newTitle: string) => {
    if (!boardId) return;
    editBoard(boardId, { title: newTitle }).then(refetchBoard);
  };

  if (!selectedBoard) return <></>;

  return (
    <div className={s.wrapperContainer}>
      <BoardPageHeader onEdit={onEditTitle} title={selectedBoard.title} />
      <div className={s.wrapper}>
        <div className={s.columnsWrapper}>
          {getColumnsFromBoard(selectedBoard).map((column) => (
            <TaskColumn
              key={column.uid}
              column={column}
              onEdit={refetchBoard}
              boardId={selectedBoard.uid}
            />
          ))}
          {isCreating && (
            <TaskColumnCreate
              forColumn
              onCreateColumn={createColumnAction}
              onAbort={() => setIsCreating(false)}
            />
          )}
          {isLinking && (
            <TaskColumnLink
              forColumn
              onCreateColumn={() => 1}
              onAbort={() => setIsLinking(false)}
            />
          )}
        </div>
        {!isCreating && (
          <div className={s.buttons}>
            <Button onClick={() => setIsCreating(true)}>
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </div>
        )}
        {selectedTask && (
          <PopupTaskInfo onEdit={refetchTask} onDelete={onDeleteTask} />
        )}
      </div>
    </div>
  );
});

export default BoardPage;
