import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function ProfilUser() {
  const { userConnected, setUserConnected } = useContext(UserContext);
  const [nameDino, setNameDino] = useState("");
  const [typeDino, setTypeDino] = useState("");
  const [periodeDino, setPeriodeDino] = useState("");
  const [poidDino, setPoidDino] = useState("");
  const [tailleDino, setTailleDino] = useState("");
  const [repartitionDino, setRepartitionDino] = useState("");
  const [descriptionDino, setDescriptionDino] = useState("");
  const [file, setFile] = useState(undefined);

  const navigate = useNavigate();

  const removeToken = () => {
    localStorage.removeItem("token");
  };

  const handlelogout = () => {
    removeToken();
    setUserConnected(null);
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      const data = new FormData();
      data.append("name", nameDino);
      data.append("type", typeDino);
      data.append("periode", periodeDino);
      data.append("poid", poidDino);
      data.append("taille", tailleDino);
      data.append("repartition", repartitionDino);
      data.append("description", descriptionDino);
      data.append("image", file);
      data.append("userId", userConnected.id);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/dinoaures/adddino`,
        data,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setFile(res.data[0]);
      navigate("/PageDino");
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div>
      {userConnected ? (
        <div className="ProfilUser">
          <div className="ProfilUser__header_1">
            <div className="ProfilUser__header">
              <h1>Profil</h1>
              <button
                className="btn-deconnexion"
                onClick={handlelogout}
                type="button"
              >
                Déconnexion
              </button>
              <div className="ProfilUser__header__information">
                <div className="Flex__info">
                  <h2>Pseudo</h2>
                  <p>{userConnected.pseudo}</p>
                </div>
                <div className="Flex__info">
                  <h2>Email</h2>

                  <p>{userConnected.email}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="ProfilUser__header_2">
            <div className="ProfilUser__Upload">
              <form className="Upload__Container" onSubmit={handleSubmit}>
                <h1>Upload ton dinosaure</h1>
                <div className="ProfilUser__Upload__1">
                  <div className="ProfilUser__Upload__1__1">
                    <h2>Nom :</h2>
                    <input
                      type="text"
                      onChange={(event) => setNameDino(event.target.value)}
                      onClick={handleInputClick}
                    />
                    <h2>Type de Dinosaures :</h2>
                    <input
                      type="text"
                      onChange={(event) => setTypeDino(event.target.value)}
                      onClick={handleInputClick}
                    />
                    <h2>Période :</h2>
                    <input
                      type="text"
                      onChange={(event) => setPeriodeDino(event.target.value)}
                      onClick={handleInputClick}
                    />
                    <h2>Poid :</h2>
                    <input
                      type="text"
                      onChange={(event) => setPoidDino(event.target.value)}
                      onClick={handleInputClick}
                    />
                  </div>
                  <div className="ProfilUser__Upload__1__2">
                    <h2>Taille :</h2>
                    <input
                      type="text"
                      onChange={(event) => setTailleDino(event.target.value)}
                      onClick={handleInputClick}
                    />
                    <h2>Répartition :</h2>
                    <input
                      type="text"
                      onChange={(event) =>
                        setRepartitionDino(event.target.value)
                      }
                      onClick={handleInputClick}
                    />
                    <h2>Déscription :</h2>
                    <textarea
                      name="message"
                      onChange={(event) =>
                        setDescriptionDino(event.target.value)
                      }
                      onClick={handleInputClick}
                    />

                    <div className="ProfilUser__button__upload_validation">
                      <div className="ProfilUser__button__style">
                        <input
                          name="filename"
                          onChange={(e) => setFile(e.target.files[0])}
                          type="file"
                          accept="image/*"
                        />
                      </div>
                      <button type="submit" className="btn-validation">
                        Valider la création
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
