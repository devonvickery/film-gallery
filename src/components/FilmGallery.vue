<template>
  <div class="p-4">
    <!-- Page Title -->
    <h1 class="text-2xl font-bold mb-4">Popular Movies</h1>

    <!-- Loading and error state-->
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    
    <!-- Movie grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4" v-else>
      <div v-for="movie in movies" :key="movie.id" class="border rounded shadow p-2">
        <!-- Poster -->
        <img :src="getImageUrl(movie.poster_path)" :alt="movie.title" class="w-full h-auto mb-2" />
        <!-- Title -->
        <h2 class="text-lg font-semibold">{{ movie.title }}</h2>
        <!-- Release Date -->
        <p class="text-sm">{{ movie.release_date }}</p>
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
</style>