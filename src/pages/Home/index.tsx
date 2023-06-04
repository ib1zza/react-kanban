import React from "react";
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
function getLocalStorageItem(key: any) {
  return JSON.parse(localStorage.getItem(key) as any);
}

function setLocalStorageItem(key: any, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

const tasks = {
  Backlog: [],
  Ready: [],
  "In progress": [],
  Finished: [],
};

const TYPES = {
  Backlog: "Backlog",
  Ready: "Ready",
  Inprogress: "In progress",
  Finished: "Finished",
};

const Home = () => {
  const [tasksAll, setTasksAll] = React.useState(
    getLocalStorageItem("tasks") || tasks
  );

  function setState(newState: ITask[]) {
    setTasksAll(newState);
    setLocalStorageItem("tasks", newState);
  }

  function removeTaskFromList(prevListName: keyof typeof tasksAll, id: string) {
    return tasksAll[prevListName].filter((item: ITask) => item.id !== id);
  }

  function addTaskToList(task: ITask, listName: keyof typeof tasksAll) {
    setState({
      ...tasksAll,
      [listName]: tasksAll[listName].concat(task),
    });
  }

  const changeDescription = (
    id: string,
    columnName: string,
    description: string
  ) => {
    let taskToEdit = tasksAll[columnName].findIndex(
      (item: any) => item.id == id
    );
    if (taskToEdit === -1) return;

    let temp = tasksAll[columnName][taskToEdit];
    temp.description = description;

    setState({
      ...tasksAll,
      [temp.status]: removeTaskFromList(temp.status, id).concat(temp),
    });
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
                <Route
                  index
                  element={
                    <div className={"blocks__container"}>
                      {Object.keys(TYPES).map((key: keyof typeof TYPES) => {
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
                      })}
                      <div className={"buttons"}>
                        <Button>
                          <FontAwesomeIcon icon={faPlus} />
                        </Button>
                        <Button>
                          <FontAwesomeIcon icon={faLink} />
                        </Button>
                      </div>
                    </div>
                  }
                />
                <Route
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
                />
              </Routes>
            </div>
            <Footer
              active={tasksAll[TYPES.Backlog].length}
              finished={tasksAll[TYPES.Finished].length}
            />
          </div>
        }
      />
      <Route path="profile" element={<Profile />}></Route>
    </Routes>
  );
};

export default Home;
