import React from "react";

import { AppRouter } from "./providers/router";
import { AuthContextProvider } from "./providers/authRouter";

function App() {
  return (
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
  );
}

export default App;
