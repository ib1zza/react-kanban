import React, { useState } from "react";
import s from "./Header.module.scss";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Theme, useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../utils/AppRoute";
import noAvatar from "../../assets/images/noAvatar.svg"
import {useAppSelector} from "../../store/store";
const Header = () => {
  const {user} = useAppSelector(state => state.userInfo)
  const [isOpen, setIsOpen] = useState(false);
  const { toggleTheme, theme } = useTheme();
  const {  logOut } = useAuth();
  const navigate = useNavigate()
  function handleTheme() {
    toggleTheme();
  }

  if(!user) return null;

  return (<header className={s.header}>
    <div className={s.header__logo} onClick={() => navigate(AppRoute.HOME)}>Awesome Kanban Board</div>
    <button className={s.button__theme} onClick={handleTheme}>
      {theme === Theme.LIGHT ? (
        <FontAwesomeIcon icon={faSun} />
      ) : (
        <FontAwesomeIcon icon={faMoon} />
      )}
    </button>
    <button className={s.header__cabinet} onClick={() => setIsOpen(prev => !prev)}>
      <p className={s.nickname}>{user?.email}</p>
      <div className={s.avatar}>
        {
          user.photoURL ? <img src={user.photoURL} alt="your avatar"/> :   <img src={noAvatar} alt="no avatar"/>
        }
        {isOpen &&
          <div className={s.menu}>
            {user && <> <div onClick={() => navigate(AppRoute.PROFILE)}>Profile</div>
              <div onClick={logOut}>Log Out</div></>}
            {!user && <> <div onClick={() => navigate(AppRoute.LOGIN)}>login</div>
              <div onClick={() => navigate(AppRoute.SIGNUP)}>signup</div></>}
          </div>}
      </div>
      {
        isOpen ?
          (
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.415 7.79001L6 3.20501L10.585 7.79001L12 6.37501L6 0.375008L0 6.37501L1.415 7.79001Z" fill="white" />
            </svg>
          )
          :
          (
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.415 0.209991L6 4.79499L10.585 0.209991L12 1.62499L6 7.62499L0 1.62499L1.415 0.209991Z" fill="white" />
            </svg>
          )

      }
    </button>
  </header>)
}

export default Header
