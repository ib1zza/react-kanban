import React, {FC, useEffect, useState} from 'react';
import s from "./ShareBoard.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {IBoard, LinkedUserType} from "../../../../../../types/IBoard";
import {getUserInfo} from "../../../../../../queries/getUserInfo";
import {deleteUserFromBoard} from "../../../../../../queries/deleteUserFromBoard";
import {IUserInfo} from "../../../../../../types/User";

interface Props {
    board: IBoard
}

const GuestsList: FC<Props> = ({board}) => {
    const [isEditorsOpened, setIsEditorsOpened] = useState(false);
    const [usersEmails, setUsersEmails] = useState<IUserInfo[]>([]);

    const handleRemoveUserFromBoard = async (userId: string) => {
        await deleteUserFromBoard(board.uid, userId, isEditorsOpened ? LinkedUserType.USER : LinkedUserType.GUEST);
    }

    const getBoardAllowedPeople = async (isSearchForEditors: boolean): Promise<IUserInfo[]> => {
        const handleServerResponse = <T extends unknown>({status, value}: { status: string, value?: T }): T | null => {
            return status === "fulfilled" ? value || null : null;
        }

        let user: IUserInfo[] = [];

        const usersInfoResponses = await Promise.allSettled(
            (!isSearchForEditors ? board.guestsAllowed : board.usersAllowed)
                .map((userId) => getUserInfo(userId))
        );

        usersInfoResponses.forEach((userInfoResponse) => {
            const result = handleServerResponse(userInfoResponse);
            if (result) {
                user.push(result)
            }
        })

        return user
    };

    useEffect(() => {
        getBoardAllowedPeople(isEditorsOpened).then((res) => {
            setUsersEmails(res);
        });
    }, [isEditorsOpened]);

    return (
        <div className={s.form__users}>
            <div className={s.form__title}>Кто подключён?</div>
            <div className={s.form__categories}>
                <button
                    onClick={() => {
                        setIsEditorsOpened(false);
                    }}
                    className={isEditorsOpened ? s.form__category_l : s.form__category_l__active}
                >
                    Гости
                </button>
                <button
                    onClick={() => {
                        setIsEditorsOpened(true);
                    }}
                    className={
                        !isEditorsOpened ? s.form__category_r : s.form__category_r__active
                    }
                >
                    Редакторы
                </button>
            </div>
            <div>
                {
                    usersEmails.map((user) => (
                        <div key={user.uid} className={s.form__user}>
                            <div>{user.email}</div>
                            <button onClick={() =>handleRemoveUserFromBoard(user.uid)}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>

    );
};

export default GuestsList;