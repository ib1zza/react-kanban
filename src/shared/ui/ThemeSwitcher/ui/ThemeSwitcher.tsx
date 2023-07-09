import React from "react";
import { useTheme } from "../../../../app/providers/theme/lib/useTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { Theme } from "../../../../app/providers/theme/lib/ThemeContext";
import s from "./ThemeSwitcher.module.scss";
const ThemeSwitcher = () => {
    const { toggleTheme, theme } = useTheme();
    return (
        <button className={s.button__theme} onClick={toggleTheme}>
            {theme === Theme.LIGHT ? (
                <FontAwesomeIcon icon={faSun} />
            ) : (
                <FontAwesomeIcon icon={faMoon} />
            )}
        </button>
    );
};

export default ThemeSwitcher;
