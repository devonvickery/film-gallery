<template>
    <div class="container">
        <!-- Page Title -->
        <h1 class="page-title">{{ categoryTitle }}</h1>

        <!-- Loading and error state -->
        <div v-if="loading && currentPage === 1" class="loading">Loading...</div>
        <div v-else-if="error" class="error">{{ error }}</div>

        <!-- Movie grid -->
        <div v-if="props.category === 'watchlist' && movies.length === 0" class="empty-message">
            Nothing here ...yet!
        </div>
        <div class="movie-grid" v-else>
            <div v-for="movie in movies" :key="movie.id" class="movie-card">
            <a
                :href="`https://www.themoviedb.org/movie/${movie.id}`"
                target="_blank"
                rel="noopener noreferrer"
                class="movie-link"
            >
            <img
                :src="getImageUrl(movie.poster_path)"
                :alt="movie.title"
                class="movie-poster"
            />
            <h2 class="movie-title">{{ movie.title }}</h2>
            <p class="movie-date">{{ movie.release_date }}</p>
            </a>
            <button
                @click.prevent="toggleWatchlist(movie)"
                class="watchlist-btn"
            >
            {{ watchlistStore.isInWatchlist(movie.id) ? 'Remove from Watchlist' : 'Add to Watchlist' }}
            </button>
        </div>
    </div>

    <!-- Load More button -->
    <div v-if="!loading && currentPage < totalPages" class="load-more">
        <button @click="loadMoreMovies">Load More</button>
    </div>

    
    </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { useWatchlistStore } from '../stores/watchlist'

const props = defineProps({
    category: {
        type: String,
        default: 'popular'
    }
})

const watchlistStore = useWatchlistStore()
const movies = ref([])
const loading = ref(true)
const error = ref(null)
const currentPage = ref(1)
const totalPages = ref(1)

const apiKey = import.meta.env.VITE_TMDB_API_KEY

function getImageUrl(path) {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : ''
}

const categoryTitleMap = {
    popular: 'Popular Movies',
    now_playing: 'Now Playing',
    upcoming: 'Upcoming Movies',
    top_rated: 'Top Rated Movies',
    watchlist: 'My Watchlist'
}

const categoryTitle = computed(() => categoryTitleMap[props.category] || 'Movies')

async function fetchMovies(page = 1, append = false) {
    if (props.category === 'watchlist') {
        movies.value = watchlistStore.watchlist
        loading.value = false
        error.value = null;
        totalPages.value = 1
        return
    }
    loading.value = true
    error.value = null
    try {
        const apiUrl = `https://api.themoviedb.org/3/movie/${props.category}?api_key=${apiKey}&language=en-US&page=${page}`
        const res = await fetch(apiUrl)
        if (!res.ok) throw new Error('Failed to fetch movies :(')
        const data = await res.json()

        if (append) {
        movies.value = [...movies.value, ...data.results]
        } else {
        movies.value = data.results
    }

        totalPages.value = data.total_pages
    } catch (err) {
        error.value = err.message
    } finally {
        loading.value = false
    }
}

function loadMoreMovies() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
        fetchMovies(currentPage.value, true)
    }
}

function toggleWatchlist(movie) {
    if (watchlistStore.isInWatchlist(movie.id)) {
        watchlistStore.removeMovie(movie.id)
        if (props.category === 'watchlist') {
            movies.value = movies.value.filter(m => m.id !== movie.id)
        }
    } else {
        watchlistStore.addMovie(movie)
        if (props.category === 'watchlist') {
            movies.value = [...movies.value, movie]
        }
    } 
}

watch(() => props.category, () => {
    currentPage.value = 1
    fetchMovies(1)
})

onMounted(() => {
    fetchMovies(1)
})
</script>

<style scoped>
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
    color: #222;
}

.page-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #D94F4F;
    text-align: center;
    border-bottom: 3px solid #F9E79F;
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
        gap: 1.5rem;
    }
}
@media (min-width: 768px) {
    .movie-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
    }
}
@media (min-width: 1024px) {
    .movie-grid {
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;
    }
}

.movie-card {
    background-color: #f6edc9;
    border-radius: 0.5rem;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    transition: box-shadow 0.3s ease;
    color: #D94F4F;
    display: flex;
    flex-direction: column;
    min-height: 350px;
}

.movie-card:hover {
    box-shadow: 0 6px 18px rgba(217, 79, 79, 0.4);
}

.movie-link {
    text-decoration: none;
    color: #D94F4F;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.movie-link:hover {
    color: #9B2D2D;
}

.movie-poster {
    width: 100%;
    height: auto;
    margin-bottom: 0.75rem;
    border-radius: 0.4rem;
    border: 3px solid #D94F4F;
}

.movie-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
    flex-grow: 1;
}

.movie-date {
    font-size: 0.9rem;
    margin-top: auto;
    color: #9B7D30;
    font-weight: 600;
    text-align: right;
    align-self: flex-end;
}

.load-more {
    margin-top: 2rem;
    text-align: center;
}

.load-more button {
    background-color: #D94F4F;
    color: #fff8e1;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.4rem;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.load-more button:hover {
    background-color: #9B2D2D;
}

.watchlist-btn {
    margin-top: 0.75rem;
    background-color: #D94F4F;
    color: #fff8e1;
    border: none;
    padding: 0.5rem 0.75rem;
    border-radius: 0.25rem;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.2s;
    width: 100%;
}

.empty-message {
    text-align: center;
    font-size: 1.0rem;
    font-weight: 600;
    color: #D94F4F;
    margin-top: 2rem;
}

.watchlist-btn:hover {
    background-color: #9B2D2D;
}
</style>