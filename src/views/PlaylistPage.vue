<template>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button expand="block" @click="setOpen(true)">
            <ion-icon slot="icon-only" :icon="add"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Playlist</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <!-- 添加播放列表页面 -->
      <ion-modal :is-open="isOpen" :presenting-element="null">
        <ion-header>
          <ion-toolbar>
            <ion-title>New playlist</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="setOpen(false)">Add</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <!-- 卡片内容 -->
          <ion-item>
            <ion-input
              @ionInput="changeName"
              label="Name"
              placeholder="playlist"
              labelPlacement="fixed"
              :value="newPlaylistInfo.playlistsName"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-textarea
              @ionInput="changeDescription"
              label="Description"
              placeholder="Introduce your playlist"
              labelPlacement="fixed"
              :auto-grow="true"
              :value=newPlaylistInfo.description
            >
            </ion-textarea>
          </ion-item>
        </ion-content>
      </ion-modal>
      <!-- 库列表 -->
      <ul class="list">
      <ion-nav-link router-direction="forward" :component="PlaylistDetail" v-for="item in fetchPlaylist()" :key="item.Name">
        <div class="list-item">
          <ion-card class="library-card" @click="selectPlaylist(item.Name)">
            <img src="@/assets/cover.png" class="header-img" />
            <div class="card-content">
              <ion-card-title>{{ item.Name }}</ion-card-title>
            </div>
          </ion-card>
        </div>
      </ion-nav-link>
      </ul>
    </ion-content>
</template>
  
  <script lang="ts" setup>
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonIcon,
  IonItem,
  IonInput,
  IonCard,
  IonTextarea,
  IonCardTitle,
  IonNavLink
} from "@ionic/vue";
import { ref, reactive } from "vue";
import { add } from "ionicons/icons";
import { testLibList } from "@/misc/util";
import PlaylistDetail from "@/views/PlaylistDetail.vue";
import { useGlobalStore } from "@/store/globalStore.ts"
const globalStore = useGlobalStore()

const newPlaylistInfo = reactive({
  playlistsName: '',
  description: '',
});

const isOpen = ref(false);
const setOpen = (isOpen_: boolean) => {
  isOpen.value = isOpen_;
  addNewPlaylist(newPlaylistInfo.playlistsName, newPlaylistInfo.description)
  newPlaylistInfo.description = ''
  newPlaylistInfo.playlistsName = ''
};

const selectPlaylist = (name: string) => {
  // 传递参数给详情页，通过修改全局储存库
  globalStore.lastPlaylistDetail = name
}


const changeName = (event: any) => {
  newPlaylistInfo.playlistsName = event.detail.value
}
const changeDescription = (event: any) => {
  newPlaylistInfo.description = event.detail.value
}

const addNewPlaylist = (name: string, description: string) => {
  // 向服务端发送请求
  fetchPlaylist()
}

const fetchPlaylist = () => {
  return testLibList;
};
</script>
  
  <style scoped>
.header-img {
  width: var(--cover-width);
  height: auto;
  clip-path: polygon(
    0 0,
    100% 0,
    100% var(--header-img-height),
    0 var(--header-img-height)
  );
}

.library-card {
  width: var(--cover-width);
  height: var(--cover-hight);
}

.card-content {
  position: relative;
  bottom: calc(var(--cover-hight) * 0.3);
}

.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>