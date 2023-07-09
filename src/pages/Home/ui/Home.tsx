import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Button from "../../../shared/ui/Button/Button";
import { faLink, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import s from "./Home.module.scss";
import { UserAuth } from "../../../app/providers/authRouter/ui/AuthContext";
import { useNavigate } from "react-router-dom";
import { createBoard } from "../../../features/boards";
import { IBoard, LinkedUserType } from "../../../app/types/IBoard";
import { getBoards } from "../lib/getBoards";
import { addUserToBoard } from "../../../features/boards";
import  FormToCreate  from "../../../shared/ui/FormToCreate/FormToCreate";
import { FormToLink } from "../../../shared/ui/FormToLink";
import { BoardPreview } from "../../../entities/Board";

const Home = () => {
    const navigate = useNavigate();
    const { user } = UserAuth();
    const [boards, setBoards] = React.useState<IBoard[]>([]);
    const [addBoardStatus, setAddBoardStatus] = useState(false);
    const [linkBoardStatus, setLinkBoardStatus] = useState(false);

    //getting boards (only info which we need)
    const fetchBoards = () => getBoards(user).then((res) => setBoards(res));

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
    if (!user?.uid) return null;
    return (
        <Routes>
            <Route
                path="/*"
                element={
                    <div className={s.boardPageContainer}>
                        <div className={s.blocks__container}>
                            {addBoardStatus && (
                                <FormToCreate
                                    forBoard
                                    onCreateBoard={handleCreateBoard}
                                    onAbort={() => setAddBoardStatus(false)}
                                />
                            )}
                            {linkBoardStatus && (
                                <FormToLink
                                    forBoard
                                    onCreateBoard={handleLinkBoard}
                                    onAbort={() => setLinkBoardStatus(false)}
                                />
                            )}
                            {boards.map((item, index) => {
                                return (
                                    <BoardPreview
                                        onDelete={() => getBoards}
                                        onClick={() => {
                                            navigate("/board/" + item.uid);
                                        }}
                                        key={index}
                                        board={item}
                                        userId={user.uid}
                                    />
                                );
                            })}
                        </div>

                        <div className={s.buttons}>
                            <Button onClick={() => setAddBoardStatus(true)}>
                                <FontAwesomeIcon size={"lg"} icon={faPlus} />
                            </Button>
                            <Button onClick={() => setLinkBoardStatus(true)}>
                                <FontAwesomeIcon size={"lg"} icon={faLink} />
                            </Button>
                        </div>
                    </div>
                }
            />
        </Routes>
    );
};

export default Home;
