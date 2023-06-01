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
          <img src="@/assets/cover.png" />
        </ion-card-header>
        <ion-card-content>
          <h2>{{ playingStatus.title }}</h2>
          <p>{{ playingStatus.artist }}</p>
          <!-- <ion-progress-bar :value="playingStatus.percentage"></ion-progress-bar> -->
          <ion-range aria-label="Temperature">
            <div slot="start">s</div>
            <div slot="end">s</div>
            <div slot="label">s</div>
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
} from "@ionic/vue";
import { reactive } from "vue";
import { playForward, repeat, play, playBack, shuffle } from "ionicons/icons";

const playingStatus = reactive({
  title: "Symphony No. 6 in A Minor I. Allegro energico, ma non troppo.",
  artist: "Mahler Gustav",
  percentage: 0.25,
  order: "random",
  cover: "@/assets/cover.png",
});
</script>

<style scoped>
.example-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

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