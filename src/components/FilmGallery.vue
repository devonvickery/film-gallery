<template>
  <div class="container">
    <!-- Page Title -->
    <h1 class="page-title">Popular Movies</h1>

    <!-- Loading and error state-->
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <!-- Movie grid -->
    <div class="movie-grid" v-else>
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
       <a :href="`https://www.themoviedb.org/movie/${movie.id}`" target="_blank" rel="noopener noreferrer" class="movie-link">
        <!-- Poster -->
        <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" class="movie-poster" />
        <!-- Title -->
        <h2 class="movie-title">{{ movie.title }}</h2>
       </a>
        <!-- Release Date -->
        <p class="movie-date">{{ movie.release_date }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const movies = ref([])
const loading = ref(true)
const error = ref(null)

const apiKey = import.meta.env.VITE_TMDB_API_KEY
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`

function getImageUrl(path) {
  return path ? `https://image.tmdb.org/t/p/w500${path}` : ''
}

// Fetch movies on component mount
onMounted(async () => {
  try {
    const res = await fetch(apiUrl)
    if (!res.ok) throw new Error('Failed to fetch movies :(')
    const data = await res.json()
    movies.value = data.results
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.page-title {
  font-size: 1.5rem; /* roughly text-2xl */
  font-weight: 700; /* bold */
  margin-bottom: 1rem;
}

.error {
  color: #ef4444; /* Tailwind red-500 equivalent */
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
}

/* Responsive grid */
@media (min-width: 640px) {
  .movie-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 768px) {
  .movie-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 1024px) {
  .movie-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.movie-card {
  border: 1px solid #ddd;
  border-radius: 0.375rem; /* ~ rounded */
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  padding: 0.5rem;
  transition: box-shadow 0.3s ease;
}

.movie-card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.movie-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.movie-poster {
  width: 100%;
  height: auto;
  margin-bottom: 0.5rem;
}

.movie-title {
  font-size: 1.125rem; /* text-lg */
  font-weight: 600;
  margin: 0;
}

.movie-date {
  font-size: 0.875rem; /* text-sm */
  margin-top: 0.25rem;
  color: #555;
}
</style>