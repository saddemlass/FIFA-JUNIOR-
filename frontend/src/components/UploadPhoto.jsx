import React, { useState } from 'react';
import axios from 'axios';
import './UploadPhoto.css';

function UploadPhoto({ playerId, onPhotoUpdated }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return setMessage('Veuillez sélectionner un fichier');

    try {
      const formData = new FormData();
      formData.append('photo', selectedFile);

      const uploadRes = await axios.post('http://localhost:5000/api/upload-photo', formData);
      const photoUrl = uploadRes.data.imageUrl;

      await axios.patch(`http://localhost:5000/api/players/${playerId}/photo`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setMessage('✅ Photo mise à jour avec succès');
      onPhotoUpdated(photoUrl);
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de l'upload de la photo");
    }
  };

  return (
    <div className="upload-photo-container">
      <h3>📷 Photo</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Téléverser</button>
      {message && <p className="upload-message">{message}</p>}
    </div>
  );
}

export default UploadPhoto;
