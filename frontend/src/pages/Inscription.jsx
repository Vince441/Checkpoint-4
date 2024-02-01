import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Inscription() {
  const [password, setPassword] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userSignup = {
      pseudo,
      email,
      password: password,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/utilisateur`,
        userSignup
      );

      if (res.status === 201) {
        navigate("/");
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
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
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
