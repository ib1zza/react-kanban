import React from "react";
import "./styles/index.scss";
import { AppRouter } from "./providers/router";
import { AuthContextProvider } from "./providers/authRouter";
import { classNames } from "../shared/lib/classNames/classNames";
import { useTheme } from "./providers/theme/lib/useTheme";

function App() {
  const { theme } = useTheme();
  return (
    <div className={classNames("app", {}, [theme as string])}>
      <AuthContextProvider>
        <AppRouter />
      </AuthContextProvider>
    </div>
  );
}

export default App;
