/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/no-array-index-key */
import React, {
    memo,
    useCallback,
    useEffect, useState,
} from 'react';
import { faLink, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import Button from 'shared/ui/Button/Button';
import { addUserToBoard } from 'features/boards';
import { IBoard, LinkedUserType } from 'app/types/IBoard';
import { BoardPreview } from 'entities/Board';
import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';
import ActionForm, { ActionFormStatus } from 'shared/ui/ActionForm/ui/ActionForm';
import { useTranslation } from 'react-i18next';
import { createBoardRt } from 'features/boards/API/createBoard/createBoardRealtime';
import { subscribeToUserBoards } from 'pages/Home/model/services/subscribeToUserBoards';
import { getBoardsRt } from 'pages/Home/model/services/getBoardsRt';
import BoardPreviewSkeleton from 'entities/Board/ui/BoardPreviewSkeleton';
import { homeActions } from '../model/slice/HomeSlice';
import { getHomeBoards } from '../model/selectors/getHomeBoards';
import s from './Home.module.scss';

const Home = memo(() => {
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.userInfo);
    const [addBoardStatus, setAddBoardStatus] = useState(false);
    const [linkBoardStatus, setLinkBoardStatus] = useState(false);
    const boards = useAppSelector(getHomeBoards);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!user?.uid) return;
        const unsub = subscribeToUserBoards(
            user.uid,
            (data) => {
                if (data) {
                    getBoardsRt(Object.keys(data)).then((res) => {
                        if (res) {
                            dispatch(homeActions.addBoards(Object.values(res)));
                        }
                    });
                }
            },
        );

        return () => {
            unsub();
        };
    }, [dispatch, user?.uid]);

    const handleCreateBoard = useCallback(
        async (title: string) => {
            setAddBoardStatus(false);
            await createBoardRt(title, user?.uid as string);
        },
        [user?.uid],
    );

    const handleLinkBoard = useCallback(
        async (id: string) => {
            setLinkBoardStatus(false);
            await addUserToBoard(id, user?.uid as string, LinkedUserType.USER);
        },
        [user?.uid],
    );

    const { t } = useTranslation('buttons');
    return (
        <div className={s.boardPageContainer}>

            <div className={s.buttons}>
                <Button
                    onClick={() => setAddBoardStatus(true)}
                    icon={<FontAwesomeIcon size="lg" icon={faPlus} />}
                >

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
});

export default Home;
