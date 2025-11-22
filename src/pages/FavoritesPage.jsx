import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getFavorites, toggleFavorite } from "../utils/favorites";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  function handleToggleFavorite(movie) {
    toggleFavorite(movie);
    setFavorites(getFavorites()); // refresh UI instantly
  }

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6">My Favorites</h1>

      {favorites.length === 0 && (
        <p className="text-gray-500 text-lg">
          You don't have any favorite movies yet.
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {favorites.map((m) => (
          <MovieCard
            key={m.imdbID}
            movie={m}
            isFavorite={true}        // always saved here
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
