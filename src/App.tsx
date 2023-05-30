import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import TaskPage from "./pages/Home/components/TaskPage/TaskPage";
import Layout from "./pages/Home/components/Layout/Layout";
import TaskColumn from "./pages/Home/components/TaskColumn";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./pages/Home";
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

function App() {
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
    <AuthContextProvider>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
