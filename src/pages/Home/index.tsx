import React from "react";
import { Route, Routes } from "react-router";
import TaskPage from "./components/TaskPage/TaskPage";
import TaskColumn from "./components/TaskColumn";
import Layout from "./components/Layout/Layout";
import Button from "../../components/UI/Button/Button";
import {faLink, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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

  function addTaskToList(prevListName: any, newTask: any, newStatus: any) {
    return tasksAll[prevListName].concat({ ...newTask, status: newStatus });
  }

  function setState(newState: any) {
    setTasksAll(newState);
    setLocalStorageItem("tasks", newState);
  }

  function removeTaskFromList(prevListName: any, id: any) {
    return tasksAll[prevListName].filter((item: any) => item.id != id);
  }

  function addTaskToBacklog(task: any) {
    setState({
      ...tasksAll,
      [TYPES.Backlog]: addTaskToList(TYPES.Backlog, task, TYPES.Backlog),
    });
  }

  function insertTaskToList(listFrom: any, listTo: any, taskID: any) {
    let task = tasksAll[listFrom].find((item: any) => item.id == taskID);
    setState({
      ...tasksAll,
      [listFrom]: removeTaskFromList(listFrom, taskID),
      [listTo]: addTaskToList(listTo, task, listTo),
    });
  }

  const changeDescription = (id: any, status: any, description: any) => {
    let taskToEdit = tasksAll[status].findIndex((item: any) => item.id == id);
    if (taskToEdit === -1) return;

    let temp = tasksAll[status][taskToEdit];
    temp.description = description;

    setState({
      ...tasksAll,
      [temp.status]: removeTaskFromList(temp.status, id).concat(temp),
    });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            active={tasksAll[TYPES.Backlog].length}
            finished={tasksAll[TYPES.Finished].length}
          />
        }
      >
        <Route
          index
          element={
            <div className={"blocks__container"}>
              <div className={"block"}>
                <TaskColumn
                  title={TYPES.Backlog}
                  tasks={tasksAll[TYPES.Backlog]}
                  onAdd={addTaskToBacklog}
                  withSelect={undefined}
                  prevList={undefined}
                />
              </div>
              <div className={"block"}>
                <TaskColumn
                  title={TYPES.Ready}
                  prevList={tasksAll[TYPES.Backlog]}
                  tasks={tasksAll[TYPES.Ready]}
                  onSelect={(id: string) =>
                    insertTaskToList(TYPES.Backlog, TYPES.Ready, id)
                  }
                  withSelect
                />
              </div>
              <div className={"block"}>
                <TaskColumn
                  title={TYPES.Inprogress}
                  prevList={tasksAll[TYPES.Ready]}
                  tasks={tasksAll[TYPES.Inprogress]}
                  onSelect={(id: string) =>
                    insertTaskToList(TYPES.Ready, TYPES.Inprogress, id)
                  }
                  withSelect
                />
              </div>
              <div className={"block"}>
                <TaskColumn
                  title={TYPES.Finished}
                  prevList={tasksAll[TYPES.Inprogress]}
                  tasks={tasksAll[TYPES.Finished]}
                  onSelect={(id: string) =>
                    insertTaskToList(TYPES.Inprogress, TYPES.Finished, id)
                  }
                  withSelect
                />
              </div>
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
      </Route>
    </Routes>
  );
};

export default Home;
