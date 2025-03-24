import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlayerCard from '../components/PlayerCard';
import './Home.css';

function Home() {
  // 🔄 États principaux
  const [players, setPlayers] = useState([]);
  const [availableNationalities, setAvailableNationalities] = useState([]); // ✅ Pour stocker les pays disponibles
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ position: '', nationality: '', levelTag: '', favoritesOnly: false });
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 4;

  // ✅ Fonction de récupération des joueurs depuis le backend
  const fetchPlayers = () => {
    axios.get('http://localhost:5000/api/players')
      .then(res => {
        setPlayers(res.data);

        // ✅ Récupérer dynamiquement toutes les nationalités uniques présentes dans la base
        const nationalities = [...new Set(res.data.map(p => p.nationality))];
        setAvailableNationalities(nationalities);
      })
      .catch(err => console.error('Erreur récupération joueurs :', err));
  };

  // 🔄 Récupération des données au chargement initial
  useEffect(() => {
    fetchPlayers();
  }, []);

  // 🔍 Filtres (recherche, position, nationalité, tag, favoris)
  const filteredPlayers = players
    .filter(player => player.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(player => (filters.position ? player.position === filters.position : true))
    .filter(player => (filters.nationality ? player.nationality === filters.nationality : true))
    .filter(player => (filters.levelTag ? player.levelTag === filters.levelTag : true))
    .filter(player => (filters.favoritesOnly ? player.isFavorite : true));

  // 🔼 Tri local
  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    if (sortBy === 'age') return a.age - b.age;
    if (sortBy === 'potential') return b.evaluation.potential - a.evaluation.potential;
    if (sortBy === 'speed') return b.evaluation.speed - a.evaluation.speed;
    if (sortBy === 'name') return a.fullName.localeCompare(b.fullName);
    return 0;
  });

  // 📄 Pagination
  const indexOfLast = currentPage * playersPerPage;
  const indexOfFirst = indexOfLast - playersPerPage;
  const currentPlayers = sortedPlayers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedPlayers.length / playersPerPage);

  return (
    <div className="home-container">
      {/* 🔍 Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher un joueur..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* 📊 Filtres dynamiques */}
      <div className="filters">
        <select onChange={e => setFilters({ ...filters, position: e.target.value })}>
          <option value="">Poste</option>
          <option value="Gardien">Gardien</option>
          <option value="Défenseur">Défenseur</option>
          <option value="Milieu central">Milieu central</option>
          <option value="Milieu offensif">Milieu offensif</option>
          <option value="Ailier gauche">Ailier gauche</option>
          <option value="Ailier droit">Ailier droit</option>
          <option value="Avant-centre">Avant-centre</option>
        </select>

        {/* ✅ Liste des nationalités dynamiques */}
        <select onChange={e => setFilters({ ...filters, nationality: e.target.value })}>
          <option value="">Pays</option>
          {availableNationalities.map((nat, idx) => (
            <option key={idx} value={nat}>{nat}</option>
          ))}
        </select>

        <select onChange={e => setFilters({ ...filters, levelTag: e.target.value })}>
          <option value="">Niveau</option>
          <option value="Espoir">Espoir</option>
          <option value="Pro">Pro</option>
          <option value="À suivre">À suivre</option>
        </select>

        <button onClick={() => setFilters({ ...filters, favoritesOnly: !filters.favoritesOnly })}>
          {filters.favoritesOnly ? 'Tous les joueurs' : 'Afficher favoris'}
        </button>
      </div>

      {/* 🔼 Tri */}
      <div className="sorting">
        <label>Trier par :</label>
        <select onChange={e => setSortBy(e.target.value)}>
          <option value="">Triez</option>
          <option value="name">Nom</option>
          <option value="age">Âge</option>
          <option value="potential">Potentiel</option>
          <option value="speed">Vitesse</option>
        </select>
      </div>

      {/* 📋 Liste des joueurs */}
      <div className="players-list">
        {currentPlayers.map(player => (
          <PlayerCard key={player._id} player={player} onToggleFavorite={fetchPlayers} />
        ))}
      </div>

      {/* 📑 Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;
