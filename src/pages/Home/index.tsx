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
  const [tasksAll, setTasksAll] = React.useState<any>();
  const { user } = UserAuth();
  const getCollection = async () => {
    const dataRef = query(
      collection(db, "users"),
      where("email", "==", `${user?.email}`)
    );
    const docsSnap = await getDocs(dataRef);
    docsSnap.forEach((doc) => {
      setTasksAll(doc.data());
    });
  };
  useEffect(() => {
    getCollection();
  }, []);
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
                  index
                  element={
                    <div className={"blocks__container"}>
                      {/* {Object.keys(TYPES).map((key: keyof typeof TYPES) => {
                        return (
                          <div className={"block"}>
                            <TaskColumn
                              title={TYPES[key]}
                              tasks={tasksAll[TYPES[key]]}
                              onAdd={(task) => addTaskToList(task, TYPES[key])}
                              withSelect={undefined}
                              prevList={undefined}
                            />
                          </div>
                        );
                      })} */}
                      <div className={"buttons"}>
                        <Button onClick={() => addTaskToList()}>
                          <FontAwesomeIcon icon={faPlus} />
                        </Button>
                        <Button>
                          <FontAwesomeIcon icon={faLink} />
                        </Button>
                      </div>
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
