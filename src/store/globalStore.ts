import { defineStore } from 'pinia'
import { ref } from 'vue'

const useGlobalStore = defineStore('global', () => {
    const lastPlaylistDetail = ref('')
    const playing = ref('')    
    const setPlaying = (name: string) => {playing.value = name}
    const setLastPlaylistDetail = (name: string) => {lastPlaylistDetail.value = name}
    return {
        lastPlaylistDetail, playing, setPlaying, setLastPlaylistDetail
    }
    })

export {
    useGlobalStore,
}