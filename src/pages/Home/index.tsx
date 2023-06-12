import React, {useEffect} from "react";
import {Route, Routes} from "react-router";
import TaskPage from "./components/TaskPage/TaskPage";
import TaskColumn from "./components/TaskColumn";
import Button from "../../components/UI/Button/Button";
import {faLink, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ITask} from "../../utils/types";
import Profile from "../Profile";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {useSelector, useDispatch} from "react-redux";
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
import {db} from "../../firebase";
import {UserAuth} from "../../context/AuthContext";
import TaskColumnCreate from "./components/TaskColumnCreate";
import {addBoardTrue} from "../../store/Reducers/addBoardSlice";
import {RootState} from "../../store/store";
import {
    setBoardColumns,
    setBoardName,
} from "../../store/Reducers/boardCollectionSlice";
import {useNavigate} from "react-router-dom";
import BoardPreview from "./components/BoardPreview/BoardPreview";
import BoardPage from "../BoardPage/BoardPage";

//TODO: delete this function or replace them to folder with utilities ur hooks
// function getLocalStorageItem(key: any) {
//   return JSON.parse(localStorage.getItem(key) as any);
// }
// function setLocalStorageItem(key: any, value: any) {
//   localStorage.setItem(key, JSON.stringify(value));
// }

export const enum GuestPermission {
    READ = "read",
    FULL = "full",
    NONE = "none"
}

export interface IBoard {
    uid: string,
    chatId?: string;
    columns: { [x: string]: any },
    guestPermissions: GuestPermission[],
    ownerId: string,
    title: string,
    usersAllowed: string[],
    timeCreated: string,
    timeUpdated: string,
}

const Home = () => {
    //TODO: rename to boards and replace to redux storage
    const [boards, setBoards] = React.useState<IBoard[]>([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = UserAuth();

    const addBoardStatus = useSelector(
        (state: RootState) => state.addBoard.opened
    );

    const boardName = useSelector(
        (state: RootState) => state.boardCollection.name
    );

    //getting boards
    const getBoards = async () => {
        const dataRef = query(
            collection(db, "boards"),
            where("ownerId", "==", `${user?.uid}`)
        );

        const docsSnap = await getDocs(dataRef);
        const res: any[] = [];
        docsSnap.forEach((doc) => {
            res.push({...doc.data()});
        });
        setBoards(res);
    };
    //getting columns from board
    const getColumnsFromBoard = async () => {
        const dataRef = query(
            collection(db, "boards"),
            where("ownerId", "==", `${user?.uid}`),
            where("title", "==", `${boardName}`)
        );

        const docsSnap = await getDocs(dataRef);
        const res: any[] = [];
        docsSnap.forEach((doc) => {
            res.push({...doc.data()});
        });
        console.log(res);
        dispatch(setBoardColumns(res[0].columns));
    };

    //getting columns, If board picked
    useEffect(() => {
        if (boardName) {
            getColumnsFromBoard();
        }
    }, [boards.length]);

    //getting boards
    useEffect(() => {
        if (boards.length === 0) {
            getBoards();
        }
    }, [boards.length]);

    if( !user) return null

    return (
        <Routes>
            <Route
                path="/*"
                element={
                    <div className={s.home}>
                        <Header/>
                        <div className={s.body}>
                            <Routes>
                                <Route
                                    path="/board/:boardId"
                                    element={
                                        <BoardPage/>
                                    }
                                />
                                <Route
                                    index
                                    element={
                                        <div className={s.boardPageContainer}><div className={s.blocks__container}>
                                            {addBoardStatus && <TaskColumnCreate onCreated={getBoards}/>}
                                            {boards.map((item, index) => {
                                                return (
                                                    <BoardPreview
                                                        onDelete={
                                                            getBoards
                                                        }
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
                                                    <Button onClick={() => dispatch(addBoardTrue())}>
                                                        <FontAwesomeIcon icon={faPlus}/>
                                                    </Button>
                                                    <Button>
                                                        <FontAwesomeIcon icon={faLink}/>
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    }
                                />

                                <Route path="/profile" element={<Profile/>}/>
                            </Routes>
                        </div>
                    </div>
                }
            />
        </Routes>
    );
};

export default Home;
