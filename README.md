# 🎬 Movies Search App (React + Tailwind + OMDB)

A simple movie search application using the OMDB API, built with:

- React
- React Router
- Tailwind CSS
- LocalStorage for favorites

## 🚀 Features
- Movie search (title / keywords)
- Filter by type: Movie / Series / Episode
- Pagination (based on OMDB API)
- Movie detailed page
- Add/Remove favorites (saved locally)
- Error handling & empty states

## 📦 Setup
1. Clone the repo:
git clone https://github.com/your-username/movies-search-app.git

2. Install dependencies:

npm install

3. Add `.env`:

VITE_OMDB_API_KEY=your_api_key

4. Run the app:

npm run dev


## 📝 Notes
- Uses OMDB’s free API.
- Filtering is done via API query (no array.filter used).
