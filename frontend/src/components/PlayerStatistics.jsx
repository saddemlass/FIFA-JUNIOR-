import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PlayerStatistics.css';

function PlayerStatistics({ playerId }) {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/players/${playerId}/statistics`);
        setStatistics(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques', error);
      }
    };

    fetchStats();
  }, [playerId]);

  if (!statistics) return null;

  return (
    <div className="statistics-container">
      <h3>Statistiques du joueur</h3>
      <div className="statistics-list">
        <div className="statistics-item">
          <span className="label">Total buts :</span>
          <span className="value">{statistics.totalGoals}</span>
        </div>
        <div className="statistics-item">
          <span className="label">Total passes décisives :</span>
          <span className="value">{statistics.totalAssists}</span>
        </div>
        <div className="statistics-item">
          <span className="label">Total minutes jouées :</span>
          <span className="value">{statistics.totalMinutes}</span>
        </div>
        <div className="statistics-item">
          <span className="label">Moyenne de notation :</span>
          <span className="value">{statistics.averageRating.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default PlayerStatistics;
