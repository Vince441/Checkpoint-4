import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";

function Home() {
  const [inputPseudo, setInputPseudo] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const { setUserConnected } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userLogin = {
      pseudo: inputPseudo,
      password: inputPassword,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        userLogin,

      );
      setUserConnected(res.data);
      const userLocal = {
        ...res.data.user,
        token: res.data.token,
      };
      localStorage.setItem(
        "token",
        JSON.stringify({
          ...userLocal,
        })
      );

      if (res.status === 200) {
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
      <div className="container-home">
        <div className="container-home__title">
          <div className="container-home__title__text">
            <h1>Introduction</h1>
            <p>
              Notre site dédié aux dinosaures offre une expérience interactive
              et personnalisée aux passionnés de ces créatures préhistoriques.
              <br />
              <br />
              Pour commencer, les utilisateurs sont invités à s'inscrire, créant
              ainsi leur propre compte personnel. Une fois inscrits, les membres
              peuvent accéder à leur page personnelle, où ils ont la possibilité
              de construire leur propre base de données sur les dinosaures.
              <br />
              <br />
              Vous pouvez ajouter des fiches détaillées, des images, et des
              anecdotes, établissant ainsi une collection virtuelle qui reflète
              votre intérêt spécifique.
              <br />
              <br />
              Grâce à cette approche interactive, notre site vise à rassembler
              une communauté engagée de passionnés qui partagent leurs
              connaissances et découvertes sur le fascinant monde des
              dinosaures.
            </p>
          </div>
        </div>
        <div className="page-inscription">
          <div className="Container">
            <form onSubmit={handleSubmit}>
              <div className="Information">
                <h1>Connexion</h1>
                <div className="Information_pseudo_password">
                  <label htmlFor="email">Pseudo</label>
                  <input onChange={(e) => setInputPseudo(e.target.value)} />
                  <label htmlFor="password">Password</label>{" "}
                  <input onChange={(e) => setInputPassword(e.target.value)} />
                </div>
                <div className="Information_button">
                  <button type="submit" className="btn-inscription">
                    Connexion
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
