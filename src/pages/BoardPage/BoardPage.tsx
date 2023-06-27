import React, { memo, useEffect, useState } from "react";
import s from "./BoardPage.module.scss";
import { useParams } from "react-router-dom";
import TaskColumn from "./components/TaskColumn/TaskColumn";
import Button from "../../components/UI/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import FormToCreate from "./utils/FormToCreate";
import { createColumn } from "../../queries/createColumn";
import PopupTaskInfo from "./components/PopupTaskInfo/PopupTaskInfo";
import {
  removeSelectedTask,
  setCurrentBoard,
  setCurrentTask,
} from "../../store/Reducers/boardCollectionSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getTaskInfo } from "../../queries/getTaskInfo";
import BoardPageHeader from "./components/BoardPageHeader/BoardPageHeader";
import { editBoard } from "../../queries/editBoard";
import FormToLink from "./utils/FormToLink";
import { getBoardFromId } from "../../queries/getBoardFromId";
import { getColumnsFromBoard } from "./utils/getColumnsFromBoard";
import { IBoard } from "../../types/IBoard";

const BoardPage: React.FC = memo(() => {
  const { boardId } = useParams();
  const { selectedBoard, selectedTask, selectedColumnId } = useAppSelector(
    (state) => state.boardCollection
  );
  const [isCreating, setIsCreating] = useState(false);
  const [isLinking, setIsLinking] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(boardId);
    refetchBoard();
  }, [boardId]);

  const refetchBoard = async () => {
    const board = getBoardFromId(boardId as string);
    if (board) {
      dispatch(setCurrentBoard(await (board as Promise<IBoard>)));
    }
  };

  const refetchTask = async () => {
    if (!boardId || !selectedColumnId || !selectedTask) return;
    const res = await getTaskInfo(boardId, selectedColumnId, selectedTask.uid);
    dispatch(setCurrentTask(res));
  };

  const createColumnAction = async (title: string, color: string) => {
    if (!boardId) return;
    await createColumn(title, color, boardId);
    setIsCreating(false);
    refetchBoard();
  };

  const handleDeleteTask = () => {
    dispatch(removeSelectedTask());
    refetchBoard();
  };

  const handleEditTitle = (newTitle: string) => {
    if (!boardId) return;
    editBoard(boardId, { title: newTitle }).then(refetchBoard);
  };

  if (!selectedBoard) return <></>;

  return (
    <div className={s.wrapperContainer}>
      <BoardPageHeader onEdit={handleEditTitle} title={selectedBoard.title} />
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
            <FormToCreate
              forColumn
              onCreateColumn={createColumnAction}
              onAbort={() => setIsCreating(false)}
            />
          )}
          {isLinking && (
            <FormToLink
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
          <PopupTaskInfo onEdit={refetchTask} onDelete={handleDeleteTask} />
        )}
      </div>
    </div>
  );
});

export default BoardPage;
