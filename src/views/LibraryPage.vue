<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button expand="block" @click="setOpen(true)">
            <ion-icon slot="icon-only" :icon="add"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Library</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <!-- 添加库页面 -->
      <ion-modal :is-open="isOpen" :presenting-element="null">
        <ion-header>
          <ion-toolbar>
            <ion-title>Add local library</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="setOpen(false)">Add</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-list>
            <ion-item>
              <ion-input
                label="Name"
                placeholder="New library"
                :value="libraryForm.Name"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-input
                label="Path"
                placeholder="Select.."
                :value="libraryForm.Path"
              ></ion-input>
              <ion-button expand="block" fill="clear" @click="onSelectPath"
                ><ion-icon :icon="folder"></ion-icon
              ></ion-button>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-modal>
      <!-- 全部歌曲列表 -->
      <ion-list>
        <!-- 播放时突出 -->
          <ion-item
          v-for="item in list"
          :key="item.title"
          :color="item.metadata.title == playing ? 'light' : ''"
        >
          <!-- 红心部分 -->
          <strong
            slot="start"
            style="position: relative; top: 3px"
            @click="item.liked = !item.liked"
          >
            <div v-if="item.liked">
              <ion-icon
                :icon="heart"
                slot="icon-only"
                style="color: crimson"
              ></ion-icon>
            </div>
            <div v-else>
              <ion-icon :icon="heartOutline" slot="icon-only"></ion-icon>
            </div>
          </strong>
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
    </ion-content>
  </ion-page>
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
  IonList,
  IonItem,
  IonInput,
  IonPage,
  IonCard,
  IonLabel,
  IonCardContent,
  IonAvatar,
  IonCardHeader,
  
} from "@ionic/vue";
import { ref, reactive, onMounted } from "vue";
import { add, folder, heart, heartOutline, play } from "ionicons/icons";
import { formatSeconds } from "@/misc/util.ts";
import { useGlobalStore } from "../store/globalStore"
const globalStore = useGlobalStore()

const audioEvents = globalStore.globalPlayerCtrl

const isOpen = ref(false);
const setOpen = (isOpen_: boolean) => {
  isOpen.value = isOpen_;
  if (!isOpen_) {
    fetch('http://localhost:5151/add-lib' + libraryForm.Path)
      .then(response => {
        console.log("added library:" + response);
      })
      .catch(error => {
        console.error(error);
      })
      refresh();
  }
};
const onSelectPath = () => {};
const libraryForm = reactive({
  Name: "",
  Path: "",
});

const playing = ref('');
const list = ref<any[]>()
// 页面响应代码
const play = (path: string) => {
  globalStore.setPlaying(path)
  audioEvents?.emit('setSrc', path)
  audioEvents?.emit('play')
  globalStore.homePlageCtrl?.emit('init')
};


const fetchAllSong = () => {
  fetch('http://localhost:5151/get-lib')
    .then(response => {
      return response.json()
    })
    .then(value => {
      list.value = value
      return value
    })
    .catch(error => {
      console.error(error);
    })
};

const refresh = () => {
  fetchAllSong()
}

onMounted(() => {
  refresh()
})
</script>

<style scoped>
.small-grey {
  color: darkgray;
  font-size: small;
}

::webkit-scrollbar {
  display: none;
}
</style>