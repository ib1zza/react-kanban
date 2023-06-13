import React, {useEffect} from 'react';
import s from './BoardPage.module.scss';
import {IBoard} from "../Home";
import {useParams} from "react-router-dom";
import {getBoard} from "../../queries/getBoard";
import TaskColumn from "../Home/components/TaskColumn";
import Button from "../../components/UI/Button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink, faPlus} from "@fortawesome/free-solid-svg-icons";
import TaskColumnCreate from "../Home/components/TaskColumnCreate";
import {createColumn} from "../../queries/createColumn";

interface IBoardPageProps {
    // board: IBoard
}

export interface IColumn {
    uid: string,
    title: string,
    tasks: { [x: string]: any },
    timeCreated: string,
    timeUpdated: string,
    color: string
}

const BoardPage: React.FC<IBoardPageProps> = () => {
    const {boardId} = useParams()
    const [board, setBoard] = React.useState<IBoard>()
    const [isCreating, setIsCreating] = React.useState(false)
    useEffect(() => {
        if (!boardId) return
        getBoard(boardId).then((board) => {
            setBoard(board)
        })
    }, [boardId])

    if (!board) return null;


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
    const rerender = () => {
        if (!boardId) return
        getBoard(boardId).then((board) => {
            setBoard(board);
        })
    }

    console.log(board);
    return (
        <div>
            <h1 className={s.title}>{board.title}</h1>
            <div className={s.wrapper}>
                <div className={s.columnsWrapper}>
                    {getColumnsFromBoard(board).map((column) => (
                        <TaskColumn key={column.uid} column={column} onEdit={rerender} boardId={board.uid}/>
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
            </div>
        </div>
    );
};

export default BoardPage;
