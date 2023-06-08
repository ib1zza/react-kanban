import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import TaskPage from "./components/TaskPage/TaskPage";
import TaskColumn from "./components/TaskColumn";
import Button from "../../components/UI/Button/Button";
import { faLink, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ITask } from "../../utils/types";
import Profile from "../Profile";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import s from "./Home.module.scss";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "@firebase/firestore";
import { db } from "../../firebase";
import { UserAuth } from "../../context/AuthContext";
import TaskColumnCreate from "./components/TaskColumnCreate";
import { addBoardTrue } from "../../store/Reducers/addBoardSlice";
import { RootState } from "../../store/store";
import {
  setBoardColumns,
  setBoardName,
} from "../../store/Reducers/boardCollectionSlice";
import { useNavigate } from "react-router-dom";
// function getLocalStorageItem(key: any) {
//   return JSON.parse(localStorage.getItem(key) as any);
// }

// function setLocalStorageItem(key: any, value: any) {
//   localStorage.setItem(key, JSON.stringify(value));
// }

const TYPES = {
  Backlog: "Backlog",
  Ready: "Ready",
  Inprogress: "In progress",
  Finished: "Finished",
};

const Home = () => {
  const [tasksAll, setTasksAll] = React.useState<any>([]);
  const navigate = useNavigate();
  const addBoardStatus = useSelector(
    (state: RootState) => state.addBoard.opened
  );
  const boardName = useSelector(
    (state: RootState) => state.boardCollection.name
  );
  const dispatch = useDispatch();

  const { user } = UserAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getBoards = async () => {
    const dataRef = query(
      collection(db, "boards"),
      where("ownerId", "==", `${user?.uid}`)
    );

    const docsSnap = await getDocs(dataRef);
    const res: any[] = [];
    docsSnap.forEach((doc) => {
      res.push({ ...doc.data() });
    });
    setTasksAll(res);
  };
  const getCollection = async () => {
    const dataRef = query(
      collection(db, "boards"),
      where("ownerId", "==", `${user?.uid}`),
      where("title", "==", `${boardName}`)
    );

    const docsSnap = await getDocs(dataRef);
    const res: any[] = [];
    docsSnap.forEach((doc) => {
      res.push({ ...doc.data() });
    });
    console.log(res);
    dispatch(setBoardColumns(res[0].columns));
  };

  useEffect(() => {
    if (boardName) {
      getCollection();
    }
  }, [getCollection, tasksAll.length]);
  useEffect(() => {
    if (tasksAll.length === 0) {
      getBoards();
    }
    //
  }, [getBoards, tasksAll.length]);

  // function setState(newState: ITask[]) {
  //   setTasksAll(newState);
  //   setLocalStorageItem("tasks", newState);
  // }

  function removeTaskFromList(prevListName: keyof typeof tasksAll, id: string) {
    return tasksAll[prevListName].filter((item: ITask) => item.id !== id);
  }
  //task: ITask, listName: keyof typeof tasksAll
  async function addTaskToList() {
    await setDoc(doc(db, "boards", "23"), {
      chatId: "",
    });
    // setState({
    //   ...tasksAll,
    //   [listName]: tasksAll[listName].concat(task),
    // });
  }

  // const changeDescription = (
  //   id: string,
  //   columnName: string,
  //   description: string
  // ) => {
  //   let taskToEdit = tasksAll[columnName].findIndex(
  //     (item: any) => item.id == id
  //   );
  //   if (taskToEdit === -1) return;

  //   let temp = tasksAll[columnName][taskToEdit];
  //   temp.description = description;

  // setState({
  //   ...tasksAll,
  //   [temp.status]: removeTaskFromList(temp.status, id).concat(temp),
  // });
  // };

  return (
    <Routes>
      <Route
        path="/*"
        element={
          <div className={s.home}>
            <Header />
            <div className={s.body}>
              <Routes>
                <Route
                  path="/board"
                  element={
                    <div>
                      {/* <TaskColumn
                              title={item.title}
                              // tasks={tasksAll[key]}
                              withSelect={undefined}
                              prevList={undefined}
                            /> */}
                    </div>
                  }
                />
                <Route
                  index
                  element={
                    <div className={"blocks__container"}>
                      {addBoardStatus && <TaskColumnCreate />}
                      {tasksAll.map((item: any, index: any) => {
                        return (
                          <div
                            key={index}
                            className={"block"}
                            onClick={() => {
                              dispatch(setBoardName(item.title));
                              navigate("/board");
                            }}
                          >
                            {item.title}
                          </div>
                        );
                      })}
                      {!addBoardStatus && (
                        <div className={"buttons"}>
                          <Button onClick={() => dispatch(addBoardTrue())}>
                            <FontAwesomeIcon icon={faPlus} />
                          </Button>
                          <Button>
                            <FontAwesomeIcon icon={faLink} />
                          </Button>
                        </div>
                      )}
                    </div>
                  }
                />
                <Route path="/profile" element={<Profile />} />
                {/* <Route
                  path="tasks/:id"
                  element={
                    <TaskPage
                      tasks={[
                        ...Object.keys(tasksAll).reduce(
                          (acc, key) => acc.concat(tasksAll[key]),
                          []
                        ),
                      ]}
                      changeDescription={changeDescription}
                    />
                  }
                /> */}
              </Routes>
            </div>
            {/* <Footer
              // active={tasksAll[TYPES.Backlog].length}
              // finished={tasksAll[TYPES.Finished].length}
            /> */}
          </div>
        }
      />
    </Routes>
  );
};

export default Home;
