import React, { useState, useContext } from "react";
import axios from "axios";
import { useLoaderData, Link } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function PageDino() {
  const Dino = useLoaderData(loadDino);
  const [filter, setFilter] = useState("");
  const { userConnected } = useContext(UserContext);

  const handleInput = (event) => {
    const { name, value } = event.target;

    if (name === "filterName") {
      setFilter(value);
    }
  };
  return (
    <div className="papa_container">
      <div className="filter">
        <input
          type="text"
          name="filterName"
          value={filter}
          className="search_input"
          placeholder="Rechercher un dinosaure"
          onChange={handleInput}
        />
      </div>
      {userConnected ? (
        <div className="container-cards">
          {Dino.filter(
            (Dinos) =>
              filter === "" ||
              Dinos.name.toLowerCase().startsWith(filter.toLowerCase())
          ).map((Dinos) => (
            <div className="dino-cards" key={Dinos.id}>
              <Link to={/PageDinoDetails/ + Dinos.id}>
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${Dinos.image}`}
                  alt={Dinos.name}
                />
                <div className="texte-cards">
                  <h1>{Dinos.name}</h1>
                  <p>
                    <span>Types :</span> {Dinos.type}
                  </p>
                  <p>
                    <span>Période :</span> {Dinos.periode}
                  </p>
                  <p>
                    <span>Poids :</span> {Dinos.poid}
                  </p>
                  <p>
                    <span>Taille :</span> {Dinos.taille}
                  </p>
                  <p>
                    <span>Pays :</span> {Dinos.repartition}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
      <div className="container-filtre" />
    </div>
  );
}

export const loadDino = async () => {
  const user = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/dinosaures`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return res.data;
  } catch (e) {
    console.error("Erreur lors du chargement des dinosaures :", e);
    return [];
  }
};
