import EventEmitter from 'events'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import DataStore from 'nedb'

const useGlobalStore = defineStore('global', () => {
    const lastPlaylistDetail = ref('')
    const playing = ref('')    // path
    const duration = ref(0)
    const globalPlayerCtrl = ref<EventEmitter>()
    const homePlageCtrl = ref<EventEmitter>()
    const percentage = ref(0)
    
    const setPlaying = (name: string) => {playing.value = name}
    const setLastPlaylistDetail = (name: string) => {lastPlaylistDetail.value = name}
    function setDuration(duration_: number) {duration.value = duration_}
    const setPercentage = (percentage_: number) => {percentage.value = percentage_}
    return {
        lastPlaylistDetail, playing, setPlaying, setLastPlaylistDetail, setPercentage, duration, globalPlayerCtrl, setDuration, percentage,homePlageCtrl
    }
    })

export {
    useGlobalStore,
}