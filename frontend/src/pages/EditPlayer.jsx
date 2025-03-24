import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditPlayer.css';
import UploadPhoto from '../components/UploadPhoto';

function EditPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [playerData, setPlayerData] = useState({
    fullName: '',
    age: '',
    nationality: '',
    position: '',
    videoUrl: '',
    levelTag: '',
    evaluation: {
      speed: '',
      dribble: '',
      vision: '',
      endurance: '',
      physical: '',
      tactical: '',
      potential: ''
    }
  });
  const [successMessage, setSuccessMessage] = useState('');



  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/players/${id}`);
        setPlayerData(res.data);
      } catch (error) {
        console.error('Erreur chargement joueur', error);
      }
    };
    fetchPlayer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in playerData.evaluation) {
      setPlayerData(prev => ({
        ...prev,
        evaluation: { ...prev.evaluation, [name]: value }
      }));
    } else {
      setPlayerData(prev => ({ ...prev, [name]: value }));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.put(`http://localhost:5000/api/players/${id}`, playerData);
    setSuccessMessage("✅ Modifications enregistrées avec succès !");
    setTimeout(() => navigate('/'), 2000);
  } catch (error) {
    console.error('Erreur modification', error);
  }
};


  const handlePhotoUpdated = (newUrl) => {
    setPlayerData(prev => ({ ...prev, photoUrl: newUrl }));
  };

  return (
    <div className="edit-player-container">
      <h2>✏️ Modifier le joueur</h2>
      

      <form className="edit-player-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom :</label>
          <input type="text" name="fullName" value={playerData.fullName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Âge :</label>
          <input type="number" name="age" min="0" max="100" value={playerData.age} onChange={handleChange} required />

        </div>

        <div className="form-group">
          <label>Nationalité :</label>
          <input type="text" name="nationality" value={playerData.nationality} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Poste :</label>
          <input type="text" name="position" value={playerData.position} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Lien vidéo :</label>
          <input type="text" name="videoUrl" value={playerData.videoUrl} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Niveau :</label>
          <input type="text" name="levelTag" value={playerData.levelTag} onChange={handleChange} />
        </div>

        <h4>Évaluation technique</h4>
        {Object.keys(playerData.evaluation).map((key) => (
          <div className="form-group" key={key}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1)} :</label>
            <input
              type="number"
              name={key}
              value={playerData.evaluation[key]}
              onChange={handleChange}
              min="0"
              max="100"
              placeholder={key}
            />
          </div>
        ))}
        <UploadPhoto playerId={id} onPhotoUpdated={handlePhotoUpdated} />

        <button type="submit" className="btn-save">💾 Enregistrer</button>
      </form>
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
}

export default EditPlayer;
