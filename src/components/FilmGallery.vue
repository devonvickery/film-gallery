<template>
  <div class="container">
    <!-- Page Title -->
    <h1 class="page-title">{{ categoryTitle }}</h1>

    <!-- Loading and error state-->
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <!-- Movie grid -->
    <div class="movie-grid" v-else>
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <a
          :href="`https://www.themoviedb.org/movie/${movie.id}`"
          target="_blank"
          rel="noopener noreferrer"
          class="movie-link"
        >
          <!-- Poster -->
          <img
            :src="getImageUrl(movie.poster_path)"
            :alt="movie.title"
            class="movie-poster"
          />
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
import { ref, watch, onMounted, computed } from 'vue'

const props = defineProps({
  category: {
    type: String,
    default: 'popular'
  }
})

const movies = ref([])
const loading = ref(true)
const error = ref(null)
const apiKey = import.meta.env.VITE_TMDB_API_KEY

function getImageUrl(path) {
  return path ? `https://image.tmdb.org/t/p/w500${path}` : ''
}

const categoryTitleMap = {
  popular: 'Popular Movies',
  now_playing: 'Now Playing',
  upcoming: 'Upcoming Movies',
  top_rated: 'Top Rated Movies'
}

const categoryTitle = computed(() => categoryTitleMap[props.category] || 'Movies')

async function fetchMovies() {
  loading.value = true
  error.value = null
  try {
    const apiUrl = `https://api.themoviedb.org/3/movie/${props.category}?api_key=${apiKey}&language=en-US&page=1`
    const res = await fetch(apiUrl)
    if (!res.ok) throw new Error('Failed to fetch movies :(')
    const data = await res.json()
    movies.value = data.results
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(fetchMovies)
watch(() => props.category, fetchMovies)
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  color: #222; /* dark text for popcorn vibe */
  /* No border or background container */
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #D94F4F; /* faded popcorn red */
  text-align: center;
  border-bottom: 3px solid #F9E79F; /* light buttery yellow */
  padding-bottom: 0.5rem;
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
}

.loading {
  text-align: center;
  font-weight: 600;
  color: #D94F4F;
}

.error {
  color: #D94F4F;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
}

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
  background-color: #fff7d9; /* light buttery yellow */
  border-radius: 0.5rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  transition: box-shadow 0.3s ease;
  color: #D94F4F; /* faded red for text */
}

.movie-card:hover {
  box-shadow: 0 6px 18px rgba(217, 79, 79, 0.4);
}

.movie-link {
  display: block;
  text-decoration: none;
  color: #D94F4F;
}

.movie-link:hover {
  text-decoration: underline;
  color: #9B2D2D; /* deeper red on hover */
}

.movie-poster {
  width: 100%;
  height: auto;
  margin-bottom: 0.75rem;
  border-radius: 0.4rem;
  border: 3px solid #D94F4F; /* faded red border like popcorn box stripes */
}

.movie-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
}

.movie-date {
  font-size: 0.9rem;
  margin-top: 0.5rem;
  color: #9B7D30; /* darker buttery yellow */
  font-weight: 600;
  text-align: right;
}
</style>