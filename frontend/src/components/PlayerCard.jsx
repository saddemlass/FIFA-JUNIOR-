import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PlayerCard.css';

function PlayerCard({ player, onToggleFavorite }) {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  const toggleFavorite = async (e) => {
    e.stopPropagation();
    try {
      setClicked(true); 
      await axios.patch(`http://localhost:5000/api/players/${player._id}/favorite`);
      if (onToggleFavorite) onToggleFavorite();
    } catch (error) {
      console.error("Erreur favoris", error);
    } finally {
      setTimeout(() => setClicked(false), 300); 
    }
  };

  return (
    <div className="card" onClick={() => navigate(`/player/${player._id}`)}>
      <span
        className={`favorite ${player.isFavorite ? 'favori' : 'not-favori'} ${clicked ? 'clicked' : ''}`}
        onClick={toggleFavorite}
        title={player.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      >
        {player.isFavorite ? '★' : '☆'}
      </span>

      <img src={player.photoUrl || '/default-player.png'} alt={player.fullName} className="card-img" />
      <div className="card-title">{player.fullName}</div>
      <div className="card-subtitle">{player.position} | {player.age} ans</div>
      <div className="card-subtitle">{player.nationality} | {player.levelTag}</div>

      <div className="evaluation">
        <div className="eval-item">Vitesse: {player.evaluation?.speed}</div>
        <div className="eval-item">Dribble: {player.evaluation?.dribble}</div>
        <div className="eval-item">Vision: {player.evaluation?.vision}</div>
        <div className="eval-item">Endurance: {player.evaluation?.endurance}</div>
        <div className="eval-item">Physique: {player.evaluation?.physical}</div>
        <div className="eval-item">Tactique: {player.evaluation?.tactical}</div>
        <div className="eval-item">Potentiel: {player.evaluation?.potential}</div>
      </div>

      <button className="btn-details" onClick={(e) => { e.stopPropagation(); navigate(`/player/${player._id}`); }}>
        Voir détails
      </button>
    </div>
  );
}

export default PlayerCard;
