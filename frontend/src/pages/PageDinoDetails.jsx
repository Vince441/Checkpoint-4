import { redirect, useLoaderData, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import DinoEdit from "../components/DinoEdit";

export default function Dinodetails() {
  const Dino = useLoaderData(loadDinoDetails);
  const [dino, setDino] = useState({});
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteDino = async (id) => {
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/dinosaures/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      navigate("/PageDino");
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = (updatedDino) => {
    setDino(updatedDino);
    setIsEditing(false);
  };

  return (
    <div className="page-details">
      <div className="return-details">
        <div className="return-home">
          <Link to="/PageDino">
            <img src="/images/retour.png" alt="retour" />
          </Link>
        </div>
        {Dino.map((Dinos) => (
          <div className="details-cards-container" key={Dinos.id}>
            {isEditing ? (
              <DinoEdit dino={Dinos} onUpdate={handleUpdate} />
            ) : (
              <div className="details-cards">
                <div className="texte-details">
                  <div className="flex-texte">
                    <div className="titre-logo">
                      <h1>{Dinos.name}</h1>
                    </div>
                    <div className="texte-p1">
                      <div className="p1-t-p1">
                        <p>
                          <span>Types :</span> {Dinos.type}
                        </p>
                        <p>
                          <span> Période :</span> {Dinos.periode}
                        </p>
                      </div>
                      <div className="p2-t-p1">
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
                    </div>
                    <div className="texte-p2">
                      <p>
                        <span>Description :</span> <br />
                        {Dinos.description}
                      </p>
                    </div>
                    <div className="button-update-delete">
                      <button
                        type="button"
                        onClick={() => handleDeleteDino(Dinos.id)}
                      >
                        Supprimer
                      </button>
                      <button type="button" onClick={() => setIsEditing(true)}>
                        Modifier
                      </button>
                    </div>
                  </div>
                </div>
                <div className="Image-dino">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${Dinos.image}`}
                    alt="dino"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export const loadDinoDetails = async ({ params }) => {
  const user = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/dinosaures/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return res.data;
  } catch (e) {
    console.error("No Dino");
    return redirect("/");
  }
};
