# Film Gallery Vue 3 Project

**Film Gallery** is a Vue 3 project that displays movie data from TMDb’s API and lets users manage a simple watchlist.

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/devonvickery/film-gallery.git
   cd film-gallery

   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Update the `.env` file in the project root:

   There is an `.env` file included with the following line:

   ```
   VITE_TMDB_API_KEY=xxxx
   ```

   Replace `xxxx` with your actual TMDb API key.

4. If you don’t have a TMDb API key:

   * Go to [https://www.themoviedb.org/](https://www.themoviedb.org/)
   * Create a free account
   * Navigate to your account settings → API section
   * Follow the instructions to request an API key
   * Use this key to replace `xxxx` in the `.env` file

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open your browser and visit:

   ```
   http://localhost:5173
   ```

---

## Assumptions

* You have a valid TMDb API key to access movie data.
* Watchlist data is stored only in memory and will reset when the page reloads.
* Movie data is fetched directly from TMDb’s public API.

---

## Challenges

* Handling API errors gracefully, such as invalid API keys or network issues.
* Keeping the watchlist state updated immediately when adding or removing movies.
* Managing pagination and category changes cleanly using the Composition API.

---

## Potential Improvements

* Persist the watchlist data to `localStorage` or a backend to keep it between sessions.
* Add user authentication for personalized watchlists.
* Implement search and more filtering options for movies.
* Add loading animations for a better user experience while fetching data.
