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
          <img src="http://localhost:5151/cover/home/frank515/Desktop/test.mp3" />
        </ion-card-header>
        <ion-card-content>
          <h2>{{ playingStatus.title }}</h2>
          <p>{{ playingStatus.artist }}</p>
          <!-- <ion-range :value="100 * playingStatus.percentage"> -->
            <ion-range @ionChange="onChangeRange">
            <div slot="start">{{ formatSeconds(playingStatus.duration * playingStatus.percentage) }}</div>
            <div slot="end">-{{ formatSeconds(playingStatus.duration * (1 - playingStatus.percentage)) }}</div>
          </ion-range>
          <ion-button color="dark" fill="clear" size="small">
            <ion-icon slot="icon-only" :icon="shuffle"></ion-icon>
          </ion-button>
          <ion-button color="dark" fill="clear" size="large">
            <ion-icon slot="icon-only" :icon="playBack"></ion-icon>
          </ion-button>
          <ion-button color="dark" fill="clear" class="button-largest">
            <ion-icon slot="icon-only" :icon="play"></ion-icon>
          </ion-button>
          <ion-button color="dark" fill="clear" size="large">
            <ion-icon slot="icon-only" :icon="playForward"></ion-icon>
          </ion-button>
          <ion-button color="dark" fill="clear" size="small">
            <ion-icon slot="icon-only" :icon="repeat"></ion-icon>
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
  IonCardTitle,
  IonCardHeader,
  IonProgressBar,
  IonRange,
  IonButton,
  IonIcon,
} from "@ionic/vue";
import { onMounted, reactive, getCurrentInstance } from "vue";
import { playForward, repeat, play, playBack, shuffle } from "ionicons/icons";
import { formatSeconds } from '@/misc/util.ts'
import TabMenu from "@/views/TabMenu.vue";
import { title } from "process";

const app = getCurrentInstance()?.appContext.app
const audioEvents = app!.config.globalProperties.$audioEvents
onMounted(() => {
  audioEvents.emit('setSrc', '/home/frank515/Desktop/test.mp3')
  audioEvents.emit('play')
  fetch('http://localhost:5151/detail/home/frank515/Desktop/test.mp3')
    .then(response => {
      console.log(response.json());
      
      return response.json()
    })
    .then(data => {
      playingStatus.title = data.title
      playingStatus.artist = data.artist
    })

})

const playingStatus = reactive({
  title: "Symphony No. 6 in A Minor I. Allegro energico, ma non troppo.",
  artist: "Mahler Gustav",
  percentage: 0,
  order: "random",
  cover: "@/assets/cover.png",
  duration: 203,
});


const onChangeRange = (event: any) => {
  playingStatus.percentage = event.detail.value / 100
  console.log(playingStatus.percentage);
}


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