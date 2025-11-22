export function getFavorites() {
  const favs = localStorage.getItem("favorites");
  return favs ? JSON.parse(favs) : [];
}

export function saveFavorite(movie) {
  const favs = getFavorites();
  const exists = favs.find((m) => m.imdbID === movie.imdbID);

  if (!exists) {
    favs.push(movie);
    localStorage.setItem("favorites", JSON.stringify(favs));
  }
}

export function removeFavorite(id) {
  let favs = getFavorites();
  favs = favs.filter((m) => m.imdbID !== id);
  localStorage.setItem("favorites", JSON.stringify(favs));
}

export function isFavorite(id) {
  return getFavorites().some((m) => m.imdbID === id);
}

export function toggleFavorite(movie) {
  if (!movie?.imdbID) return;

  const favs = getFavorites();
  const exists = favs.find((m) => m.imdbID === movie.imdbID);

  if (exists) {
    removeFavorite(movie.imdbID);
  } else {
    saveFavorite(movie);
  }
}
