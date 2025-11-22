import { useEffect, useState, useRef } from "react";
import { searchMovies, getMovieById } from "../services/Api";
import MovieCard from "../components/MovieCard";
import { getFavorites, saveFavorite, removeFavorite } from "../utils/favorites";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [episodes, setEpisodes] = useState([]);

  const [favorites, setFavorites] = useState(getFavorites());

  const [searchText, setSearchText] = useState("");
  const [searchLimit, setSearchLimit] = useState(10);
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState("");

  const [suggestions, setSuggestions] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const debounceRef = useRef(null);

  useEffect(() => {
    loadCategories();
    return () => clearTimeout(debounceRef.current);
  }, []);

  async function loadCategories() {
    try {
      const mov = await searchMovies({ query: "Avengers", type: "movie" });
      setMovies(mov.Search || []);
    } catch {
      setMovies([]);
    }

    try {
      const ser = await searchMovies({ query: "Breaking Bad", type: "series" });
      setSeries(ser.Search || []);
    } catch {
      setSeries([]);
    }

    try {
      const ep = await searchMovies({ query: "Seinfeld", type: "episode" });
      setEpisodes(ep.Search || []);
    } catch {
      setEpisodes([]);
    }
  }

  function handleToggleFavorite(movie) {
    const exists = favorites.find((m) => m.imdbID === movie.imdbID);

    if (exists) {
      removeFavorite(movie.imdbID);
    } else {
      saveFavorite(movie);
    }

    setFavorites(getFavorites());
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h2 className="text-2xl font-bold mb-3">Popular Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-10">
        {movies.map((m) => (
          <MovieCard
            key={m.imdbID}
            movie={m}
            isFavorite={favorites.some((f) => f.imdbID === m.imdbID)}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-3">Popular Series</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-10">
        {series.map((m) => (
          <MovieCard
            key={m.imdbID}
            movie={m}
            isFavorite={favorites.some((f) => f.imdbID === m.imdbID)}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-3">Popular Episodes</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {episodes.map((m) => (
          <MovieCard
            key={m.imdbID}
            movie={m}
            isFavorite={favorites.some((f) => f.imdbID === m.imdbID)}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>

    </div>
  );
}
