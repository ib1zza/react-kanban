import React from "react";
import { useTheme } from "../../../../app/providers/theme/lib/useTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { Theme } from "../../../../app/providers/theme/lib/ThemeContext";
import s from "./ThemeSwitcher.module.scss";
import { classNames } from "../../../lib/classNames/classNames";
interface ThemeSwitcherProps{
    className?: string
}
const ThemeSwitcher = ({className} : ThemeSwitcherProps) => {
    const { toggleTheme, theme } = useTheme();
    return (
        <button className={classNames(s.button__theme,{}, 
            [className as string])} onClick={toggleTheme}>
            {theme === Theme.LIGHT ? (
                <FontAwesomeIcon icon={faSun} />
            ) : (
                <FontAwesomeIcon icon={faMoon} />
            )}
        </button>
    );
};

export default ThemeSwitcher;
