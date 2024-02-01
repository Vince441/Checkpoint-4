import { Outlet } from "react-router-dom";
import { useState, useMemo } from "react";
import Header from "./globals/Header";
import UserContext from "./context/UserContext";



function App() {
  const [userConnected, setUserConnected] = useState(null);
  return (
    <UserContext.Provider
      value={useMemo(
        () => ({ userConnected, setUserConnected }),
        [userConnected, setUserConnected]
      )}
    >
      <Header />
      <Outlet />

    </UserContext.Provider>
  );
}

export default App;
