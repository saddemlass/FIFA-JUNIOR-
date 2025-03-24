import React from "react";

const FavoriteStar = ({ isFavorite, onToggleFavorite }) => {
  return (
    <span
      onClick={onToggleFavorite}
      style={{
        cursor: "pointer",
        fontSize: "22px",
        color: isFavorite ? "gold" : "white",
        transition: "color 0.3s ease"
      }}
      title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      {isFavorite ? "★" : "☆"}
    </span>
  );
};

export default FavoriteStar;
