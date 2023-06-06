<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button></ion-back-button>
      </ion-buttons>
      <ion-buttons slot="end">
          <ion-button expand="block" @click="onAddMusic">
            <ion-icon slot="icon-only" :icon="add"></ion-icon>
          </ion-button>
        </ion-buttons>
      <ion-title>{{ playlistDetail.playlistName }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-card class="music-card">
      <ion-card-header>
        <ion-card-subtitle class="left">{{ playlistDetail.description }}</ion-card-subtitle>
        <ion-card-title class="left">
          {{ playlistDetail.playlistName }}
        </ion-card-title>
        <ion-card-subtitle>
      </ion-card-subtitle>
      </ion-card-header>

      <ion-card-content>
        <ion-list>
          <ion-item lines="none" v-for="item in list" :key="item.metadata.title">
            <ion-thumbnail slot="start">
              <img :src="getCoverURL(item.path)" />
            </ion-thumbnail>
            <ion-label>
              <h3>{{ item.metadata.title }}</h3>
              <p>{{ item.metadata.artist }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-card-content>
    </ion-card>
  </ion-content>
</template>

<script setup lang="ts">
import { IonHeader, IonButton, IonTitle, IonToolbar, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonThumbnail, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonIcon } from '@ionic/vue';
import { onMounted, reactive, ref } from 'vue';
import { testPlaylistDetails } from '@/misc/util'
import { useGlobalStore } from "@/store/globalStore.ts"
import { add } from 'ionicons/icons'

const globalStore = useGlobalStore()
const playlistDetail = reactive({
  playlistName: '',
  description: ''
})
const list = ref<any[]>()

onMounted(() => {
  fetchPlaylist(globalStore.lastPlaylistDetail)
})

// 向歌单内添加音乐
const onAddMusic = () => {

}

const getCoverURL = (path: string) => {
  return 'http://localhost:5151/cover/' + path
}

const fetchPlaylist = (name: string) => {
  // 传送到后段处理
  fetch('http://localhost:5151/playlist/' + name)
    .then((response: any) => {
     return response.json()
      
    })
    .then(value =>{
      
      list.value = value.playlist
      playlistDetail.description = value.description
      playlistDetail.playlistName = value.playlistName
    })
    .catch(err => {console.error(err);})
    
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