import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Button from "../../components/UI/Button/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Profile from "../Profile";
import Header from "./components/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import s from "./Home.module.scss";
import {
  collection,
  getDocs,
  query,
  where,
} from "@firebase/firestore";
import { db } from "../../firebase";
import { UserAuth } from "../../context/AuthContext";
import TaskColumnCreate from "./components/TaskColumn/TaskColumnCreate";

import { RootState } from "../../store/store";
import {
  setBoardColumns,
  setBoardName,
} from "../../store/Reducers/boardCollectionSlice";
import { useNavigate } from "react-router-dom";
import BoardPreview from "./components/BoardPreview/BoardPreview";
import BoardPage from "../BoardPage/BoardPage";
import { createBoard } from "../../queries/createBoard";
import {Board} from "../../types/Board";

const Home = () => {
  //TODO: rename to boards and replace to redux storage
  const [boards, setBoards] = React.useState<Board[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = UserAuth();
  const [addBoardStatus, setAddBoardStatus] = useState(false);
  //   const addBoardStatus = useSelector(
  //     (state: RootState) => state.addBoard.opened
  //   );

  const boardName = useSelector(
    (state: RootState) => state.boardCollection.name
  );

  //getting boards
  const getBoards = async () => {
    console.log(user && user?.uid);
    const dataRef = query(
      collection(db, "boards"),
      where("ownerId", "==", `${user?.uid}`)
    );

    const docsSnap = await getDocs(dataRef);
    const res: any[] = [];
    docsSnap.forEach((doc) => {
      res.push({ ...doc.data() });
    });
    setBoards(res);
  };

  //getting boards
  useEffect(() => {
    if (boards.length === 0) {
      getBoards();
    }
  }, [boards.length, user]);

  if (!user) return null;

  const createBoardAction = (title: string) => {
    createBoard(title, user.uid).then((res: any) => getBoards());

    setAddBoardStatus(false);
  };
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <div className={s.home}>
            <Header />
            <div className={s.body}>
              <Routes>
                <Route path="/board/:boardId" element={<BoardPage />} />
                <Route
                  index
                  element={
                    <div className={s.boardPageContainer}>
                      <div className={s.blocks__container}>
                        {addBoardStatus && (
                          <TaskColumnCreate
                            forBoard
                            onCreateBoard={createBoardAction}
                            onAbort={() => setAddBoardStatus(false)}
                          />
                        )}
                        {boards.map((item, index) => {
                          return (
                            <BoardPreview
                              onDelete={getBoards}
                              onClick={() => {
                                dispatch(setBoardName(item.title));
                                navigate("/board/" + item.uid);
                              }}
                              key={index}
                              board={item}
                              userId={user?.uid}
                            />
                          );
                        })}
                      </div>
                      {!addBoardStatus && (
                        <div className={s.buttons}>
                          <Button onClick={() => setAddBoardStatus(true)}>
                            <FontAwesomeIcon size={"lg"} icon={faPlus} />
                          </Button>
                        </div>
                      )}
                    </div>
                  }
                />

                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default Home;
