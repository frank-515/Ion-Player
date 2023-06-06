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
      <ion-list v-if="keyword">
        <!-- 播放时突出 -->
        <!-- TODO - 斑马纹仍然有问题 -->
        <ion-item v-for="item in list" :key="item.metadata.title" :color="zebra() ? 'light' : ''" lines="none">
            <!-- 歌曲信息 -->
            <div slot="end" class="small-grey">
              {{ formatSeconds(item.metadata.duration) }}
            </div>
            <!-- 作者-时长 -->
            <ion-label @click="play(item.path)">{{ item.metadata.title }}</ion-label>
            <ion-label></ion-label>
            <ion-label class="small-grey">{{ item.metadata.artist }}</ion-label>
        </ion-item>
        
      </ion-list>
      <div class="sum">
        共{{ list?.length }}条项目
      </div>
      
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonSearchbar, IonSegment, IonSegmentButton, IonLabel, IonItem, IonList } from '@ionic/vue';
  import { ref } from 'vue';
  import { formatSeconds, testPlaylist } from '@/misc/util';
  import { useGlobalStore } from "../store/globalStore"
const globalStore = useGlobalStore()
const audioEvents = globalStore.globalPlayerCtrl


  const keyword = ref('')
  const searchItem = ref('name')
  const list = ref<any[]>()
  let zebra_ = 0
  const zebra = () => {
    zebra_ += 1
    
    return zebra_ % 2
  }

  const onSearchChange = (event: any) => {
    keyword.value = event.detail.value
    fetchInfo(keyword.value, searchItem.value)
  }

  const onSegmentChange = (event: any) => {
    searchItem.value = event.detail.value
    fetchInfo(keyword.value, searchItem.value)
  }
  function removeDuplicate<T>(list: T[]): T[] {
  const set = new Set(list); // 将数组转换为 Set 集合，自动去重
  return Array.from(set); // 将 Set 集合转换为数组返回
}

  const fetchInfo = (keyword: string, type: string) => {
    fetch('http://localhost:5151/search/' + type + '/' + keyword)
    .then(response => {
      return response.json()
    })
    .then(value => {
      list.value = removeDuplicate<any>(value)
      return value
    })
    .catch(error => {
      console.error(error);
    })
  }

  const play = (path: string) => {
  globalStore.setPlaying(path)
  audioEvents?.emit('setSrc', path)
  audioEvents?.emit('play')
  globalStore.homePlageCtrl?.emit('init')
};
</script>

<style scoped>
  .example-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .sum {
    padding-top: 2ex;
    font-size: small;
    color: gray;
  }
</style>