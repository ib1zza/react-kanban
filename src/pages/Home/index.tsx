import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Button from "../../components/UI/Button/Button";
import { faLink, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import s from "./Home.module.scss";
import { UserAuth } from "../../context/AuthContext";
import FormToCreate from "../BoardPage/utils/FormToCreate";
import { useNavigate } from "react-router-dom";
import BoardPreview from "../BoardPage/components/BoardPreview/BoardPreview";
import { createBoard } from "../../queries/createBoard";
import { IBoard } from "../../types/IBoard";
import FormToLink from "../BoardPage/utils/FormToLink";
import { getBoards } from "./utils/getBoards";
import Modal from "../../components/UI/Modal/Modal";

const Home = () => {
  const navigate = useNavigate();
  const { user } = UserAuth();
  const [boards, setBoards] = React.useState<IBoard[]>([]);
  const [addBoardStatus, setAddBoardStatus] = useState(false);
  const [linkBoardStatus, setLinkBoardStatus] = useState(false);

  //getting boards (only info which we need)
  useEffect(() => {
    if (boards.length === 0) {
      getBoards(user, setBoards);
    }
  }, [boards.length, user]);

  const handleCreateBoardAction = (title: string) => {
    createBoard(title, user?.uid as string).then((res: any) =>
      getBoards(user, setBoards)
    );
    setAddBoardStatus(false);
  };
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
                  onCreateBoard={handleCreateBoardAction}
                  onAbort={() => setAddBoardStatus(false)}
                />
              )}
              {linkBoardStatus && (
                <FormToLink
                  forBoard
                  onCreateBoard={handleCreateBoardAction}
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
                    userId={user?.uid as string}
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
