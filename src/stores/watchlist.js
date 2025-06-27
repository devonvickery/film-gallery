import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWatchlistStore = defineStore('watchlist', () => {
    const watchlist = ref([])

    function addMovie(movie) {
        // Avoid duplicates
        if (!watchlist.value.find(m => m.id === movie.id)) {
            watchlist.value.push(movie)
        }
    }

    function removeMovie(movieId) {
        watchlist.value = watchlist.value.filter(m => m.id !== movieId)
    }

    function isInWatchlist(movieId) {
        return watchlist.value.some(m => m.id === movieId)
    }

    return { watchlist, addMovie, removeMovie, isInWatchlist }
})