<template>
  <div class="app-container">
    <header class="app-header">
      <div class="full-width-content header-content">
        <h1 class="site-title">Film Gallery</h1>
        <nav class="nav-links">
          <button
            :class="{ active: category === 'popular' }"
            @click="category = 'popular'"
          >
            Popular
          </button>
          <button
            :class="{ active: category === 'now_playing' }"
            @click="category = 'now_playing'"
          >
            Now Playing
          </button>
          <button
            :class="{ active: category === 'upcoming' }"
            @click="category = 'upcoming'"
          >
            Upcoming
          </button>
          <button
            :class="{ active: category === 'top_rated' }"
            @click="category = 'top_rated'"
          >
            Top Rated
          </button>
          <button
            :class="[{ active: category === 'watchlist' }, 'watchlist-btn']"
            @click="category = 'watchlist'"
          >
            Watchlist
          </button>
        </nav>
      </div>
    </header>

    <main class="app-main">
      <div class="full-width-content">
        <FilmGallery :category="category" />
      </div>
    </main>

    <footer class="app-footer">
      <div class="full-width-content">
        <p>© 2025 Devon Vickery. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FilmGallery from './components/FilmGallery.vue'

const category = ref('popular')
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: #fff5e1;
  color: #5c2a2a;
  overflow-x: hidden;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header,
.app-footer {
  width: 100%;
  background-color: #D94F4F;
  border-bottom: 3px solid #FFF;
}

.app-footer {
  border-top: 3px solid #FFF;
  border-bottom: none;
}

.app-main {
  flex-grow: 1;
}

.full-width-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  box-sizing: border-box;
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.site-title {
  margin: 0;
  font-weight: 900;
  font-size: 2.8rem;
  color: #fff;
  text-align: center;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
}

.nav-links {
  margin-top: 1rem;
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.nav-links button {
  background: #fff;
  border: 2px solid #D94F4F;
  color: #D94F4F;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.4rem 1.2rem;
  border-radius: 6px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-links button:hover {
  background-color: #D94F4F;
  color: #fff;
}

.nav-links button.active {
  background-color: #D94F4F;
  color: #fff;
  border-color: #D94F4F;
}

.nav-links button.watchlist-btn {
  background-color: #f6edc9;
  border-color: #d9c56a;     
  color: #5c2a2a;         
}

.nav-links button.watchlist-btn:hover {
  background-color: #f9e79f;
  border-color: #bfae45;
  color: #3e1d1d;
}

.nav-links button.watchlist-btn.active {
  background-color: #f9e79f;
  border-color: #a38c36;
  color: #2c130f;
}

.app-footer p {
  margin: 0;
  font-size: 0.9rem;
  color: #fff;
  text-align: center;
  font-weight: 600;
}
</style>