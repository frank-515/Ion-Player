<template>
  <ion-page>
    <ion-header>
      <ion-toolbar style="padding-top: 8px;">
        <ion-searchbar placeholder="Search" :value="keyword" @ionInput="onSearchChange"></ion-searchbar>
      </ion-toolbar>
      <ion-toolbar>
        <ion-segment :value="searchItem" @ionChange="onSegmentChange">
          <ion-segment-button value="name">Name</ion-segment-button>
          <ion-segment-button value="artist">Artist</ion-segment-button>
          <ion-segment-button value="album">Album</ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <!-- 播放时突出 -->
        <ion-item v-for="item in fetchInfo()" :key="item.id" :color="item.id % 2 ? 'light' : ''" lines="none">
            <!-- 歌曲信息 -->
            <div slot="end" class="small-grey">
              {{ formatSeconds(item.duration) }}
            </div>
            <!-- 作者-时长 -->
            <ion-label @click="play(item.id)">{{ item.title }}</ion-label>
            <ion-label></ion-label>
            <ion-label class="small-grey">{{ item.artist }}</ion-label>
        </ion-item>
        
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonSearchbar, IonSegment, IonSegmentButton, IonLabel, IonItem, IonList } from '@ionic/vue';
  import { ref } from 'vue';
  import { formatSeconds, testPlaylist } from '@/misc/util';
  
  const keyword = ref('')
  const searchItem = ref('name')

  const onSearchChange = (event: any) => {
    keyword.value = event.detail.value
    fetchInfo()
  }

  const onSegmentChange = (event: any) => {
    searchItem.value = event.detail.value
    fetchInfo()
  }
  
  const fetchInfo = () => {
    return testPlaylist
  }


</script>

<style scoped>
  .example-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>