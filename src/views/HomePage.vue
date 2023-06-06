<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Listen now</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card class="music-card">
        <ion-card-header>
          <img :src="playingStatus.cover" />
        </ion-card-header>
        <ion-card-content>
          <h2>{{ playingStatus.title }}</h2>
          <p>{{ playingStatus.artist }}</p>
          <!-- <ion-range :value="100 * playingStatus.percentage"> -->
            <ion-range @ionChange="onChangeRange" ref="range" :value="playingStatus.percentage * 100">
            <div slot="start">{{ formatSeconds(playingStatus.duration * playingStatus.percentage) }}</div>
            <div slot="end">-{{ formatSeconds(playingStatus.duration * (1 - playingStatus.percentage)) }}</div>
          </ion-range>
          <ion-button color="dark" fill="clear" size="small" @click="onSwitchMode">
            <ion-icon slot="icon-only" :icon="shuffle"></ion-icon>
          </ion-button>
          <ion-button color="dark" fill="clear" size="large" @click="onPlayBack">
            <ion-icon slot="icon-only" :icon="playBack"></ion-icon>
          </ion-button>
          <ion-button color="dark" fill="clear" class="button-largest" @click="onSwitchPlay">
            <ion-icon v-if="playingStatus.isPlaying" slot="icon-only" :icon="play"></ion-icon>
            <ion-icon v-else slot="icon-only" :icon="pause"></ion-icon>
          </ion-button>
          <ion-button color="dark" fill="clear" size="large" @click="onPlayForward">
            <ion-icon slot="icon-only" :icon="playForward"></ion-icon>
          </ion-button>
          <ion-button color="dark" fill="clear" size="small" @click="playingStatus.liked = !playingStatus.liked">
            <ion-icon v-if="playingStatus.liked" slot="icon-only" :icon="heart" style="color:crimson;"></ion-icon>
            <ion-icon v-else slot="icon-only" :icon="heartOutline"></ion-icon>
          </ion-button>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonRange,
  IonButton,
  IonIcon,
} from "@ionic/vue";
import { onMounted, reactive, getCurrentInstance, ref, watch } from "vue";
import { playForward, play, playBack, shuffle, heartOutline, heart, pause } from "ionicons/icons";
import { formatSeconds } from '@/misc/util.ts'
import { useGlobalStore } from "../store/globalStore";
import EventEmitter from "events";
const globalStore = useGlobalStore();

const app = getCurrentInstance()?.appContext.app
// const audioEvents = app!.config.globalProperties.$audioEvents
// const duration = app!.config.globalProperties.$duration

const audioEvents = globalStore.globalPlayerCtrl
globalStore.homePlageCtrl = new EventEmitter();

const playingStatus = reactive({
  title: "",
  artist: "",
  percentage: 0,
  order: "",
  cover: "",
  duration: 0,
  liked: false,
  isPlaying: false
});
const range = ref<HTMLIonRangeElement>()

const onChangeRange = (event: any) => {
  playingStatus.percentage = event.detail.value / 100
  audioEvents?.emit('setPercentage', event.detail.value / 100)
}

const getCoverURL = (path: string) => {
  return "http://localhost:5151/cover/" + path
}

const getDetailURL = (path: string) => {
  return "http://localhost:5151/data/" + path
}

const init = () => {
  playingStatus.cover = getCoverURL(globalStore.playing)
  fetch(getDetailURL(globalStore.playing))
    .then(response => {
      return response.json()
    })
    .then(data => {
      playingStatus.title = data.title
      playingStatus.artist = data.artist
      playingStatus.duration = data.duration
    })
    .catch(error => {console.error("Page init error: " + error);})
    // To-Do set duration currently
}

const refreshStatus = () => {
  playingStatus.percentage = app!.config.globalProperties.$getPercentage()
  
}

const onSwitchMode = () => {
  
}

const onPlayBack = () => {

}

const onPlayForward = () => {

}

const onSwitchPlay = () => {
  playingStatus.isPlaying = !playingStatus.isPlaying
  if (!playingStatus.isPlaying) {
    audioEvents?.emit('play')
  } else {
    audioEvents?.emit('pause')
  }
}


onMounted(() => {
  globalStore.setPlaying('/home/frank515/Desktop/test.mp3') 
  audioEvents?.emit('setSrc', '/home/frank515/Desktop/test.mp3')
  init()
  setInterval(() => {refreshStatus()}, 1000)
})

globalStore.homePlageCtrl.on('init', () => {
  init()
})


</script>

<style scoped>

.music-card h2 {
  font-weight: 600;
  font-size: 16px;
  color: var(--text-darker);
}

.music-card p {
  color: var(--text-light);
}
.music-card img {
  box-shadow: 0px 2px 8px rgba(2, 8, 20, 0.1), 0px 8px 16px rgba(2, 8, 20, 0.08);
  border-radius: 6px;
  margin: 0 auto;
}
component-card .music-card .button-largest {
  font-size: 28px;
}
</style>