import React, { useState, createContext, useEffect } from "react";


// объект для работы с локальным хранилищем
export const storage = {
  setItem: (name: string, item: any) => {
    console.log("setItem", name, item);
    localStorage.setItem(name, JSON.stringify(item));
  },
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    if (item) {
      return JSON.parse(item);
    }
  },
};

// функция, которая меняет css переменные в зависимости от выбранной темы
function changeCssRootVariables(theme: Theme) {
  const root = document.querySelector(":root") as HTMLElement;

  // тут массив с названиями всех css переменных (они лежат в файле styles/vars.scss)
  const components = [
    "body-bg",
    "darker-bg",
    "columnBg",
    "taskBg",
    "taskTextColor",
    "buttonTextColor",
  ];

  // меняем значения переменных
  // для этого проходимся по всем элементам
  // и для каждого меняем значение переменной default на light / dark
  // в зависимости от выбранной темы
  components.forEach((component) => {
    root.style.setProperty(
      `--${component}-default`,
      `var(--${component}-${theme})`
    );
  });
}

interface IThemeContext {
  theme: string;
  changeTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

export const ThemeContext = createContext<IThemeContext>({
  theme: Theme.LIGHT,
  changeTheme: () => {},
  toggleTheme: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const useTheme = () => {
  return React.useContext(ThemeContext);
};

// Провайдер для темы
const ThemeProvider: React.FC<Props> = ({ children, ...props }) => {
  const [theme, setTheme] = useState<Theme>(
    storage.getItem("react-kanban/theme") || Theme.LIGHT
  );

  // переключение темы с помощью toggle
  const toggleTheme = () => {
    const propsTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    setTheme(propsTheme);
  };

  const changeTheme = (propsTheme: Theme) => {
    changeCssRootVariables(propsTheme);
    storage.setItem("react-kanban/theme", propsTheme);
  };

  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ theme, changeTheme, toggleTheme }}
      {...props}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
