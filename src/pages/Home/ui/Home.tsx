/* eslint-disable react/no-array-index-key */
import React, {
    useCallback, useEffect, useState,
} from 'react';
import { faLink, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import Button from 'shared/ui/Button/Button';
import { addUserToBoard, createBoard } from 'features/boards';
import { IBoard, LinkedUserType } from 'app/types/IBoard';

import { BoardPreview } from 'entities/Board';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';
import ActionForm, { ActionFormStatus } from 'shared/ui/ActionForm/ui/ActionForm';

import { useTranslation } from 'react-i18next';
import { getUserBoards as getBoards } from '../model/services/getUserBoards';
import s from './Home.module.scss';
import HomeSkeleton from './HomeSkeleton';
import { homeActions } from '../model/slice/HomeSlice';
import { getHomeBoards } from '../model/selectors/getHomeBoards';

const Home = () => {
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.userInfo);
    const [addBoardStatus, setAddBoardStatus] = useState(false);
    const [linkBoardStatus, setLinkBoardStatus] = useState(false);
    const boards = useAppSelector(getHomeBoards);
    const dispatch = useAppDispatch();
    // getting boards (only info which we need)
    const fetchBoards = useCallback(() => getBoards(user).then((res: IBoard[]) => {
        if (res) {
            dispatch(homeActions.addBoards(Object.values(res)));
        }
    }), [dispatch, user]);
    useEffect(() => {
        if (boards.length === 0) {
            fetchBoards();
        }
    }, [boards.length, fetchBoards, user]);

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
    const { t } = useTranslation('buttons');
    if (!user?.uid) return <HomeSkeleton />;
    return (
        <div className={s.boardPageContainer}>

            <div className={s.buttons}>
                <Button
                    onClick={() => setAddBoardStatus(true)}
                    // className={s.add_button}
                    icon={<FontAwesomeIcon size="lg" icon={faPlus} />}
                >
                    {/* <FontAwesomeIcon size="lg" icon={faPlus} /> */}
                    {t('Добавить доску')}
                </Button>
                <Button onClick={() => setLinkBoardStatus(true)} className={s.share_button}>
                    <FontAwesomeIcon size="lg" icon={faLink} />

                </Button>

            </div>

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
                {boards.length && boards.map((item: IBoard, index) => (
                    <BoardPreview
                        onClick={() => {
                            navigate(`/board/${item?.uid}`);
                        }}
                        key={index}
                        board={item}
                        userId={user.uid}
                    />
                ))}
            </div>

        </div>

    );
};

export default Home;
