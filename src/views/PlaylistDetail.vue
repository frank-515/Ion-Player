<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button></ion-back-button>
      </ion-buttons>
      <ion-title>{{ playlistDetail.playlistName }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-card class="music-card">
      <ion-card-header>
        <ion-card-subtitle class="left">{{ playlistDetail.description }}</ion-card-subtitle>
        <ion-card-title class="left">{{ playlistDetail.playlistName }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-list>
          <ion-item lines="none" v-for="item in fetchPlaylist(playlistDetail.playlistName)" :key="item.id">
            <ion-thumbnail slot="start">
              <img src="@/assets/cover.png" />
            </ion-thumbnail>
            <ion-label>
              <h3>{{ item.title }}</h3>
              <p>{{ item.artist }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-card-content>
    </ion-card>
  </ion-content>
</template>

<script setup lang="ts">
import { IonHeader, IonTitle, IonToolbar, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonThumbnail, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle } from '@ionic/vue';
import { onMounted, reactive } from 'vue';
import { testPlaylistDetails } from '@/misc/util'
import { useGlobalStore } from "@/store/globalStore.ts"
const globalStore = useGlobalStore()
const playlistDetail = reactive({
  playlistName: '',
  description: ''
})

onMounted(() => {
  fetchPlaylist(globalStore.lastPlaylistDetail)
  alert("fetched " + globalStore.lastPlaylistDetail)
})

const fetchPlaylist = (name: string) => {
  // 传送到后段处理
  
  
  playlistDetail.description = testPlaylistDetails.description 
  playlistDetail.playlistName = testPlaylistDetails.playlistName
  return testPlaylistDetails.playlist
}
</script>

<style scoped>
component-card .music-card ion-list ion-thumbnail {
  margin-top: 5px;
  margin-bottom: 5px;
  --border-radius: 14px;
}

.left {
  text-align: left;
  text-justify: inter-word;
}

ion-thumbnail {
    --border-radius: 5px;
  }
</style>