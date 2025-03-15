import { useAppDispatch, useAppSelector } from 'app/providers/StoreProvider';
import { getHomeBoards } from 'pages/Home/model/selectors/getHomeBoards';
import React, { useEffect } from 'react';
import { subscribeToUserBoards } from 'pages/Home/model/services/subscribeToUserBoards';
import { getBoardsRt } from 'pages/Home/model/services/getBoardsRt';
import { homeActions } from 'pages/Home/model/slice/HomeSlice';
import { mapBoardFromServer } from 'entities/Board';
import s from 'pages/Home/ui/Home.module.scss';
import BoardPreviewSkeleton from 'entities/Board/ui/BoardPreviewSkeleton';

export function useLogic() {
    const { user } = useAppSelector((state) => state.userInfo);
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
                            dispatch(homeActions.addBoards(res.map(mapBoardFromServer)));
                        }
                    });
                }
            },
        );
        return () => {
            unsub();
        };
    }, [dispatch, user?.uid]);

    return {
        boards,
        user,
    };
}
