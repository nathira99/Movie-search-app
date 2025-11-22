import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieById } from "../services/Api";
import { toggleFavorite, getFavorites } from "../utils/favorites";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [favList, setFavList] = useState(getFavorites());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getMovieById(id);
      setMovie(data);
      setLoading(false);
    })();
  }, [id]);

  const isFav = favList.some((f) => f.imdbID === id);

  return (
    <div className="max-w-5xl mx-auto p-6">

      <Link to="/" className="text-blue-600 hover:underline">← Back</Link>

      {loading && <p className="mt-4">Loading…</p>}
      {!movie && !loading && <p>No data found</p>}

      {movie && (
        <div className="grid md:grid-cols-2 gap-6 mt-6">

          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
            className="rounded-xl shadow-xl w-full"
          />

          <div>
            <h2 className="text-3xl font-bold">{movie.Title} ({movie.Year})</h2>

            <p className="text-gray-600 mt-2"><strong>Genre:</strong> {movie.Genre}</p>
            <p className="text-gray-600"><strong>Runtime:</strong> {movie.Runtime}</p>
            <p className="text-gray-600"><strong>Director:</strong> {movie.Director}</p>
            <p className="text-gray-600"><strong>Actors:</strong> {movie.Actors}</p>

            <div className="mt-4">
              <strong>Plot:</strong>
              <p className="text-gray-700 mt-1">{movie.Plot}</p>
            </div>

            <button
              onClick={() => {
                toggleFavorite(movie);
                setFavList(getFavorites());
              }}
              className={`mt-6 px-4 py-2 rounded-lg font-semibold 
                ${isFav ? "bg-yellow-400" : "bg-blue-600 text-white hover:bg-blue-700"}`}
            >
              {isFav ? "★ Remove Favorite" : "☆ Add to Favorite"}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
