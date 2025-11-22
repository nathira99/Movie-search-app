import { useEffect, useState, useRef } from "react";
import { searchMovies } from "../services/Api";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import { toggleFavorite, getFavorites } from "../utils/favorites";

const TYPE_OPTIONS = [
  { label: "All", value: "" },
  { label: "Movie", value: "movie" },
  { label: "Series", value: "series" },
  { label: "Episode", value: "episode" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);

  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fav, setFav] = useState(getFavorites());
  const [error, setError] = useState("");

  const debounceRef = useRef(null);

  async function fetchData(p = 1) {
    if (!query.trim() || query.trim().length < 3) {
      setResults([]);
      setTotal(0);
      setError(query.trim() ? "Enter at least 3 characters" : "");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await searchMovies({ query, page: p, type });
      setResults(data.Search || []);
      setTotal(Number(data.totalResults) || 0);
      setPage(p);
    } catch (err) {
      setError(err.message);
      setResults([]);
    }

    setLoading(false);
  }

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchData(1), 400);
    return () => clearTimeout(debounceRef.current);
  }, [query, type]);

  function handleFavorite(movie) {
    toggleFavorite(movie);
    setFav(getFavorites());
  }

  return (
    <div className="max-w-6xl mx-auto p-5">

      <h1 className="text-3xl font-bold mb-5">Movie Search</h1>

      <div className="flex gap-3 mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg shadow-sm"
          placeholder="Search movies (min 3 letters)..."
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-3 py-2 border rounded-lg shadow-sm"
        >
          {TYPE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {loading && <p className="text-gray-500">Loading…</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-5">
        {results.map((m) => (
          <MovieCard
            key={m.imdbID}
            movie={m}
            isFavorite={fav.some((f) => f.imdbID === m.imdbID)}
            onToggleFavorite={handleFavorite}
          />
        ))}
      </div>

      {total > 10 && (
        <Pagination
          current={page}
          total={total}
          pageSize={10}
          onPageChange={(p) => fetchData(p)}
        />
      )}
    </div>
  );
}
