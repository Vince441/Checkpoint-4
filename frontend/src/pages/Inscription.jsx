import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";

export default function Inscription() {
  const [inputPassword, setinputPassword] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const { setUserConnected } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userSignup = {
      pseudo,
      email,
      password: inputPassword,
    };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur`,
        userSignup
      );

      setUserConnected(res.data);
      const userLocal = {
        ...res.data,
        token: res.data.token,
      };
      localStorage.setItem(
        "token",
        JSON.stringify({
          ...userLocal,
        })
      );

      if (res.status === 201) {
        navigate("/PageDino");
      } else {
        console.info(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {" "}
      <div className="container-inscription">
        <div className="page-inscription">
          <div className="Container">
            <form onSubmit={handleSubmit}>
              <div className="Information">
                <h1>Inscription</h1>
                <div className="Information_pseudo_email_password">
                  <label htmlFor="pseudo">Choisissez votre Pseudo</label>
                  <input
                    type="pseudo"
                    id="pseudo"
                    onChange={(event) => setPseudo(event.target.value)}
                  />
                  <label htmlFor="email">Entrez votre e-mail</label>
                  <input
                    type="email"
                    id="email"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <label htmlFor="password">
                    Choisissez votre mot de passe
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={inputPassword}
                    onChange={(event) => setinputPassword(event.target.value)}
                  />
                </div>
                <button type="submit">S'incrire</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
