import React, {memo, useEffect, useLayoutEffect, useState} from 'react';
import s from './BoardPage.module.scss';

import {useParams} from "react-router-dom";
import {getBoard} from "../../queries/getBoard";
import TaskColumn from "../Home/components/TaskColumn/TaskColumn";
import Button from "../../components/UI/Button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink, faPlus} from "@fortawesome/free-solid-svg-icons";
import TaskColumnCreate from "../Home/components/TaskColumn/TaskColumnCreate";
import {createColumn} from "../../queries/createColumn";
import {IBoard} from "../../types/IBoard";
import PopupTaskInfo from "./PopupTaskInfo/PopupTaskInfo";
import {removeSelectedBoard, setCurrentBoard} from "../../store/Reducers/boardCollectionSlice";
import {useAppDispatch, useAppSelector} from "../../store/store";



const BoardPage: React.FC = memo(() => {
    const {boardId} = useParams();
    const {selectedBoard, selectedTask} = useAppSelector(state => state.boardCollection);
    const [isCreating, setIsCreating] = useState(false)
    const dispatch = useAppDispatch()

    const getBoardFromId = () => {
        if(!boardId) return
        return getBoard(boardId).then((board) => {
            dispatch(setCurrentBoard(board))
            return board;
        });
    }

    // useLayoutEffect(() => {
    //     return () => {
    //         dispatch(removeSelectedBoard())
    //     }
    // }, [])

    useEffect(() => {
        console.log(boardId)
        getBoardFromId();
        console.log("useEffect")
    }, [boardId])

    const rerender = () => {
        getBoardFromId()
        console.log("rerender")
    }

    const getColumnsFromBoard = (board: IBoard) => {
        return Object.values(board.columns).sort(
            (a, b) => +a.timeCreated - +b.timeCreated
        )
    }

    const createColumnAction = async (title: string, color: string) => {
        if (!boardId) return
        await createColumn(title, color, boardId)
        setIsCreating(false)
        rerender();
    }

    if (!selectedBoard) return <></>;

    return (
        <div className={s.wrapperContainer}>
            <h1 className={s.title}>{selectedBoard.title}</h1>
            <div className={s.wrapper}>
                <div className={s.columnsWrapper}>
                    {getColumnsFromBoard(selectedBoard).map((column) => (
                        <TaskColumn key={column.uid} column={column} onEdit={rerender} boardId={selectedBoard.uid}/>
                    ))}
                    {isCreating && (
                        <TaskColumnCreate
                            forColumn
                            onCreateColumn={createColumnAction}
                            onAbort={() => setIsCreating(false)}
                        />
                    )}
                </div>
                {!isCreating && (
                    <div className={s.buttons}>
                        <Button onClick={() => setIsCreating(true)}>
                            <FontAwesomeIcon icon={faPlus}/>
                        </Button>
                        <Button>
                            <FontAwesomeIcon icon={faLink}/>
                        </Button>
                    </div>
                )}
                {selectedTask && (
                    <PopupTaskInfo rerender={rerender} />
                )}
            </div>
        </div>
    );
})

export default BoardPage;
