import axios from "axios";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DinoEdit({ dino, onUpdate }) {
  const [dinoUpdate, setdinoUpdate] = useState(dino);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      const dinoUpdated = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/dinosaures/${dinoUpdate.id}`,
        dinoUpdate,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      onUpdate(dinoUpdated.data);
      navigate(`/PageDinoDetails/${dinoUpdated.data.id}`);
    } catch (error) {
      console.error("Error updating dinosaur:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="details-upload">
        <div className="texte-details">
          <div className="flex-texte">
            <div className="titre-logo">
              <div className="texte-p1">
                <span>Name : </span>
                <input
                  type="text"
                  name="name"
                  value={dinoUpdate.name}
                  onChange={(event) =>
                    setdinoUpdate({
                      ...dinoUpdate,
                      name: event.target.value,
                    })
                  }
                />
                <span>Type : </span>
                <input
                  type="text"
                  name="type"
                  onChange={(event) =>
                    setdinoUpdate({
                      ...dinoUpdate,
                      type: event.target.value,
                    })
                  }
                />
                <span>Periode : </span>
                <input
                  type="text"
                  name="periode"
                  onChange={(event) =>
                    setdinoUpdate({
                      ...dinoUpdate,
                      periode: event.target.value,
                    })
                  }
                />
                <span>Poid : </span>
                <input
                  type="text"
                  name="poid"
                  onChange={(event) =>
                    setdinoUpdate({
                      ...dinoUpdate,
                      poid: event.target.value,
                    })
                  }
                />
              </div>
              <div className="p2-t-p1">
                <span>Taille : </span>
                <input
                  type="text"
                  name="taille"
                  onChange={(event) =>
                    setdinoUpdate({
                      ...dinoUpdate,
                      taille: event.target.value,
                    })
                  }
                />
                <span>Pays : </span>
                <input
                  type="text"
                  name="repartition"
                  onChange={(event) =>
                    setdinoUpdate({
                      ...dinoUpdate,
                      repartition: event.target.value,
                    })
                  }
                />

                <span>Description : </span>
                <textarea
                  type="text"
                  name="description"
                  onChange={(event) =>
                    setdinoUpdate({
                      ...dinoUpdate,
                      description: event.target.value,
                    })
                  }
                />
                <div className="button-update">
                  <button type="submit">Update Dinosaure</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

DinoEdit.propTypes = {
  dino: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
