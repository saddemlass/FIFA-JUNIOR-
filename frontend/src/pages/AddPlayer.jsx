import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddPlayer.css';

const AddPlayer = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [photoFile, setPhotoFile] = useState(null); 
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    nationality: '',
    position: '',
    videoUrl: '',
    levelTag: 'Espoir',
    photoUrl: '',
    evaluation: {
      speed: '', dribble: '', vision: '', endurance: '',
      physical: '', tactical: '', potential: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.evaluation) {
      let num = parseInt(value);
      if (num < 0) num = 0;
      if (num > 100) num = 100;
      setFormData({
        ...formData,
        evaluation: { ...formData.evaluation, [name]: isNaN(num) ? '' : num }
      });
    } else if (name === "age") {
      let age = parseInt(value);
      if (age < 0) age = 0;
      if (age > 100) age = 100;
      setFormData({ ...formData, age: isNaN(age) ? '' : age });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePhotoChange = (e) => {
    setPhotoFile(e.target.files[0]); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (photoFile) {
        const photoData = new FormData();
        photoData.append('photo', photoFile);

        const uploadRes = await axios.post('http://localhost:5000/api/upload-photo', photoData);
        const uploadedUrl = uploadRes.data.imageUrl;
        formData.photoUrl = uploadedUrl;
      }
      await axios.post('http://localhost:5000/api/players', formData);
      setSuccessMessage('✅ Joueur ajouté avec succès ! Redirection...');
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      alert("❌ Erreur lors de l'ajout du joueur");
      console.error(error);
    }
  };

  return (
    <div className="add-player-container">
      <h2>Ajouter un nouveau joueur</h2>
      <form onSubmit={handleSubmit} className="add-player-form">
        <label>Nom complet :</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

        <label>Âge :</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} min="0" max="100" required />

        <label>Nationalité :</label>
        <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} required />

        <label>Poste :</label>
        <select name="position" value={formData.position} onChange={handleChange} required>
          <option value="">Sélectionnez un poste</option>
          <option value="Gardien">Gardien</option>
          <option value="Défenseur">Défenseur</option>
          <option value="Milieu central">Milieu central</option>
          <option value="Milieu offensif">Milieu offensif</option>
          <option value="Ailier gauche">Ailier gauche</option>
          <option value="Ailier droit">Ailier droit</option>
          <option value="Avant-centre">Avant-centre</option>
        </select>

        <label>Lien vidéo :</label>
        <input type="text" name="videoUrl" value={formData.videoUrl} onChange={handleChange} required />

        
        <label>Photo du joueur :</label>
        <input type="file" accept="image/*" onChange={handlePhotoChange} />

        <label>Niveau :</label>
        <select name="levelTag" value={formData.levelTag} onChange={handleChange}>
          <option value="Espoir">Espoir</option>
          <option value="Pro">Pro</option>
          <option value="À suivre">À suivre</option>
        </select>

        <h4>Évaluations techniques</h4>
        {Object.entries(formData.evaluation).map(([key, val]) => (
          <div key={key}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1)} :</label>
            <input
              type="number"
              name={key}
              value={val}
              onChange={handleChange}
              min="0"
              max="100"
              required
            />
          </div>
        ))}

        <button type="submit">Ajouter le joueur</button>
      </form>

      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default AddPlayer;
