/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { faLink, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import Button from 'shared/ui/Button/Button';
import { addUserToBoard, createBoard } from 'features/boards';
import { IBoard, LinkedUserType } from 'app/types/IBoard';

import { BoardPreview } from 'entities/Board';
import { useAppSelector } from 'app/providers/StoreProvider';
import ActionForm, { ActionFormStatus } from 'shared/ui/ActionForm/ui/ActionForm';
import { getUserBoards } from '../lib/getUserBoards';
import s from './Home.module.scss';
import HomeSkeleton from './HomeSkeleton';

const Home = () => {
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.userInfo);
    const [boards, setBoards] = React.useState<IBoard[]>([]);
    const [addBoardStatus, setAddBoardStatus] = useState(false);
    const [linkBoardStatus, setLinkBoardStatus] = useState(false);

    const getBoards = getUserBoards;
    // getting boards (only info which we need)
    const fetchBoards = () => getBoards(user).then((res) => {
        setBoards(res);
    });

    useEffect(() => {
        if (boards.length === 0) {
            fetchBoards();
        }
    }, [boards.length, user]);

    const handleCreateBoard = async (title: string) => {
        await createBoard(title, user?.uid as string);
        await fetchBoards();
        setAddBoardStatus(false);
    };
    const handleLinkBoard = async (id: string) => {
        await addUserToBoard(id, user?.uid as string, LinkedUserType.USER);
        await fetchBoards();
        setLinkBoardStatus(false);
    };
    if (!user?.uid) return <HomeSkeleton />;
    return (

        <div className={s.boardPageContainer}>
            <div className={s.blocks__container}>
                {addBoardStatus && (
                    <ActionForm
                        status={ActionFormStatus.BOARD}
                        onCreateBoard={handleCreateBoard}
                        onAbort={() => setAddBoardStatus(false)}
                    />
                )}
                {linkBoardStatus && (
                    <ActionForm
                        status={ActionFormStatus.BOARD}
                        onCreateBoard={handleLinkBoard}
                        onAbort={() => setLinkBoardStatus(false)}
                    />
                )}
                {boards.map((item, index) => (
                    <BoardPreview
                        onDelete={() => getBoards}
                        onClick={() => {
                            navigate(`/board/${item.uid}`);
                        }}
                        key={index}
                        board={item}
                        userId={user.uid}
                    />
                ))}
            </div>

            <div className={s.buttons}>
                <Button onClick={() => setAddBoardStatus(true)}>
                    <FontAwesomeIcon size="lg" icon={faPlus} />
                </Button>
                <Button onClick={() => setLinkBoardStatus(true)}>
                    <FontAwesomeIcon size="lg" icon={faLink} />
                </Button>
            </div>
        </div>

    );
};

export default Home;
