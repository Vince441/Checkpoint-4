import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function Header() {
  const { userConnected } = useContext(UserContext);
  function determineActive({ isActive }) {
    if (isActive === true) {
      return "active";
    }
    return "";
  }

  return (
    <header>
      {userConnected ? (
        <nav>
          <NavLink to="PageDino">Mes Dinosaures</NavLink>
          <NavLink to="ProfilUser">Profil</NavLink>
        </nav>
      ) : (
        <>
          <NavLink to="/" className={determineActive({ isActive: false })}>
            Home
          </NavLink>
          <NavLink to="Inscription">Inscription</NavLink>
        </>
      )}
    </header>
  );
}
