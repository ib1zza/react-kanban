/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/no-array-index-key */
import React, {
    useEffect, useState,
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
import { createBoardRt } from 'features/boards/API/createBoard/createBoardRealtime';
import { getUserBoardsRt } from 'pages/Home/model/services/getUserBoardsRt';
import { subscribeToUserBoards } from 'pages/Home/model/services/subscribeToUserBoards';
import { getBoardsRt } from 'pages/Home/model/services/getBoardsRt';
import { subscribeToUserNotifications } from 'entities/Notifications/model/services/API/subscribeToUserNotifications';
import BoardPreviewSkeleton from 'entities/Board/ui/BoardPreviewSkeleton';
import { getUserBoards as getBoards } from '../model/services/getUserBoards';
import s from './Home.module.scss';

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
    // const fetchBoards = useCallback(() => {
    //     getUserBoardsRt(user).then((res) => {
    //         if (res) {
    //             dispatch(homeActions.addBoards(Object.values(res)));
    //         }
    //     });
    //     // () => getBoards(user).then((res: IBoard[]) => {
    //     // if (res) {
    //     //     dispatch(homeActions.addBoards(Object.values(res)));
    //     // }
    //     // }),
    // }, [dispatch, user]);
    // useEffect(() => {
    //     if (boards.length === 0) {
    //         fetchBoards();
    //     }
    // }, [boards.length, fetchBoards, user]);

    useEffect(() => {
        if (!user?.uid) return;

        const unsub = subscribeToUserBoards(
            user.uid,
            (data) => {
                console.log(data);
                if (data) {
                    getBoardsRt(Object.keys(data)).then((res) => {
                        if (res) {
                            dispatch(homeActions.addBoards(Object.values(res)));
                        }
                    });

                    // dispatch(homeActions.addBoards(Object.values(data)));
                }
            },
        );

        return () => {
            unsub();
        };
    }, [user?.uid]);

    const handleCreateBoard = async (title: string) => {
        setAddBoardStatus(false);

        await createBoardRt(title, user?.uid as string);
        // await fetchBoards();
    };
    const handleLinkBoard = async (id: string) => {
        setLinkBoardStatus(false);

        await addUserToBoard(id, user?.uid as string, LinkedUserType.USER);
        // await fetchBoards();
    };
    const { t } = useTranslation('buttons');
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
                {!user?.uid ? <BoardPreviewSkeleton /> : (
                    <>
                        {' '}
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
                        {!!boards.length && boards.map((item: IBoard, index) => (
                            <BoardPreview
                                onClick={() => {
                                    navigate(`/board/${item?.uid}`);
                                }}
                                key={item.uid}
                                board={item}
                                userId={user.uid}
                            />
                        ))}
                    </>
                )}

            </div>

        </div>

    );
};

export default Home;
