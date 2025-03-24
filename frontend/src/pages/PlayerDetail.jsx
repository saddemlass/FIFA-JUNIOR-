import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PlayerDetail.css';
import PlayerStatistics from '../components/PlayerStatistics';

const FavoriteStar = ({ isFavorite, onToggleFavorite }) => {
  return (
    <span
      onClick={onToggleFavorite}
      style={{
        cursor: "pointer",
        fontSize: "30px",
        color: isFavorite ? "gold" : "white",
        transition: "color 0.3s ease"
      }}
      title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      {isFavorite ? "★" : "☆"}
    </span>
  );
};

function PlayerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);

  const [comment, setComment] = useState('');
  const [match, setMatch] = useState({
    date: '', competition: '', opponent: '', position: '',
    goals: 0, assists: 0, minutesPlayed: 0, matchRating: 0, comments: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/players/${id}`)
      .then(res => setPlayer(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleCommentSubmit = () => {
    if (!comment.trim()) return;
    axios.post(`http://localhost:5000/api/players/${id}/comment`, { comment })
      .then(() => {
        setPlayer(prev => ({ ...prev, comments: [...prev.comments, comment] }));
        setComment('');
      })
      .catch(err => console.error(err));
  };

  const handleMatchSubmit = () => {
    if (match.goals < 0 || match.assists < 0 || match.matchRating < 0 || match.matchRating > 10) {
      alert("Veuillez entrer des valeurs valides : buts et passes > 0, note entre 0 et 10");
      return;
    }
    axios.post(`http://localhost:5000/api/players/${id}/match`, match)
      .then(() => window.location.reload())
      .catch(err => console.error(err));
  };

  const toggleFavorite = () => {
    axios.patch(`http://localhost:5000/api/players/${id}/favorite`)
      .then(() => setPlayer(prev => ({ ...prev, isFavorite: !prev.isFavorite })))
      .catch(err => console.error(err));
  };
  const [successMessage, setSuccessMessage] = useState('');
 

const deletePlayer = () => {
  if (window.confirm("Voulez-vous vraiment supprimer ce joueur ?")) {
    axios.delete(`http://localhost:5000/api/players/${id}`)
      .then(() => {
        setSuccessMessage("✅ Joueur supprimé avec succès !");
        setTimeout(() => navigate('/'), 2000);
      })
      .catch(err => console.error(err));
  }
};

if (!player) return <div>Chargement...</div>;

  return (
    <div className="player-detail-container">
      <div className="player-header">
        <h2>{player.fullName}</h2>
        <FavoriteStar isFavorite={player.isFavorite} onToggleFavorite={toggleFavorite} />
      </div>

      <img src={player.photoUrl} alt={player.fullName} className="detail-photo" />
      <p><strong>Âge :</strong> {player.age}</p>
      <p><strong>Position :</strong> {player.position}</p>
      <p><strong>Nationalité :</strong> {player.nationality}</p>
      <p><strong>Niveau :</strong> {player.levelTag}</p>
      <p><strong>Vidéo :</strong> <a href={player.videoUrl} target="_blank" rel="noreferrer">Voir la vidéo</a></p>

      <PlayerStatistics playerId={id} />

      <h3>Commentaires</h3>
      <ul>
        {player.comments && player.comments.map((c, index) => <li key={index}>{c}</li>)}
      </ul>
      <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Votre commentaire..." />
      <button onClick={handleCommentSubmit}>Ajouter</button>

      <h3>Ajouter un match</h3>
      <label>Date <input type="date" value={match.date} onChange={(e) => setMatch({ ...match, date: e.target.value })} /></label>
      <label>Compétition  <input type="text" placeholder="Compétition" value={match.competition} onChange={(e) => setMatch({ ...match, competition: e.target.value })} /></label>
      <label>Adversaire <input type="text" placeholder="Adversaire" value={match.opponent} onChange={(e) => setMatch({ ...match, opponent: e.target.value })} /></label>
      <label>Position </label> 
      <select value={match.position} onChange={(e) => setMatch({ ...match, position: e.target.value })}>
      <option value="">Sélectionnez un poste</option>
      <option value="Gardien">Gardien</option>
      <option value="Défenseur">Défenseur</option>
      <option value="Milieu central">Milieu central</option>
      <option value="Milieu offensif">Milieu offensif</option>
      <option value="Ailier gauche">Ailier gauche</option>
      <option value="Ailier droit">Ailier droit</option>
      <option value="Avant-centre">Avant-centre</option>
      </select>
      

      <label>Buts  <input type="number" placeholder="Buts" value={match.goals} onChange={(e) => setMatch({ ...match, goals: parseInt(e.target.value) })} /></label>
      <label>Passes <input type="number" placeholder="Passes" value={match.assists} onChange={(e) => setMatch({ ...match, assists: parseInt(e.target.value) })} /></label>
      <label>Minutes jouées  <input type="number" placeholder="Minutes jouées" value={match.minutesPlayed} onChange={(e) => setMatch({ ...match, minutesPlayed: parseInt(e.target.value) })} /></label>
      <label>Note match <input type="number" min="0" max="10" placeholder="Note match" value={match.matchRating} onChange={(e) => setMatch({ ...match, matchRating: parseFloat(e.target.value) })} /></label>
      <button onClick={handleMatchSubmit}>Ajouter match</button>
     
      <button onClick={() => navigate(`/edit/${player._id}`)}>✏️ Modifier joueur</button>
      <button onClick={deletePlayer} style={{ backgroundColor: 'red', color: 'white', marginTop: '15px' }}>
        Supprimer ce joueur
      </button>
      {successMessage && <div className="success-message">{successMessage}</div>}

    </div>
  );
}

export default PlayerDetail;