const BASE = "https://www.omdbapi.com/";
const KEY = import.meta.env.VITE_OMDB_API_KEY;

/**
 * Search movies/series/episodes by text query
 */
export async function searchMovies({ query, page = 1, type = "" }) {
  if (!query || query.trim().length < 3) {
    return {
      Search: [],
      totalResults: 0,
      Error: "Enter at least 3 characters.",
    };
  }

  const params = new URLSearchParams({
    apikey: KEY,
    s: query.trim(),
    page: String(page),
  });

  if (type) params.append("type", type);

  let res;
  try {
    res = await fetch(`${BASE}?${params.toString()}`);
  } catch (err) {
    throw new Error("Network error. Check your internet connection.");
  }

  const data = await res.json();

  // Proper error handling
  if (data.Response === "False") {
    // Catch too many results
    if (data.Error?.toLowerCase().includes("too many")) {
      throw new Error(
        "Too many results. Try adding more letters or refining the title."
      );
    }

    // Movie not found
    if (data.Error?.toLowerCase().includes("not found")) {
      throw new Error("No movies found. Try a different title.");
    }

    throw new Error(data.Error || "Unknown API error.");
  }

  return data;
}

/**
 * Get full details of a specific movie by IMDb ID
 */
export async function getMovieById(id) {
  if (!id) throw new Error("Invalid movie ID.");

  const params = new URLSearchParams({
    apikey: KEY,
    i: id,
    plot: "full",
  });

  let res;
  try {
    res = await fetch(`${BASE}?${params.toString()}`);
  } catch (err) {
    throw new Error("Network error. Check your internet connection.");
  }

  const data = await res.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Movie details not found.");
  }

  return data;
}
