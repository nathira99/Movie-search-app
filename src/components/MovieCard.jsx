import { Link } from "react-router-dom";

export default function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  if (!movie) return null;

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-md transition p-3">

      <Link to={`/movie/${movie.imdbID}`}>
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
          alt={movie.Title}
          onError={(e) => (e.target.src = "/placeholder.png")}
          className="w-full h-56 object-cover rounded-lg"
        />
      </Link>

      <div className="mt-3">
        <h3 className="font-semibold text-lg">{movie.Title}</h3>
        <p className="text-gray-600 text-sm">{movie.Year} • {movie.Type}</p>

        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => onToggleFavorite(movie)}
            className={`px-3 py-1 rounded-md text-sm font-medium
              ${isFavorite ? "bg-blue-400" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            {isFavorite ? "★ Saved" : "☆ Save"}
          </button>

          <Link
            to={`/movie/${movie.imdbID}`}
            className="text-blue-600 text-sm hover:underline"
          >
            Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
