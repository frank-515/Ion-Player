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
        <ion-item v-for="item in fetchAllSong()" :key="item.id" :color="item.id == playing ? 'light' : ''">
          <!-- 红心部分 -->
            <strong slot="start" style="position: relative; top: 3px;" @click="onLike()">
              <div v-if="item.liked"> <ion-icon :icon="heart" slot="icon-only" style="color:crimson;"></ion-icon></div>
              <div v-else><ion-icon :icon="heartOutline" slot="icon-only"></ion-icon></div>
            </strong>
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
import { ref, reactive } from "vue";
import { add, folder, heart, heartOutline, play } from "ionicons/icons";
import { it } from "node:test";

const isOpen = ref(false);
const setOpen = (isOpen_: boolean) => {
  isOpen.value = isOpen_;
};
const onSelectPath = () => {};
const libraryForm = reactive({
  Name: "",
  Path: "",
});


const playing = ref(4)

// 格式化秒
// Generates By GPT-3.5
function formatSeconds(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`;
}
// 页面响应代码
const play = (id: number) => {
  alert(id)
}

const onLike = () => {
  alert('like')
 
  
}

const fetchAllSong = () => {
  return testPlaylist;
};


const testPlaylist = [
  {id:1, title: 'Ode to Joy', artist: 'Beethoven', duration: 243, liked: true},
  {id:2, title: 'Moonlight Sonata', artist: 'Beethoven', duration: 332, liked: false},
  {id:3, title: 'Für Elise', artist: 'Beethoven', duration: 181, liked: false},
  {id:4, title: 'Spring', artist: 'Vivaldi', duration: 345, liked: true},
  {id:5, title: 'Summer', artist: 'Vivaldi', duration: 311, liked: false},
  {id:6, title: 'Autumn', artist: 'Vivaldi', duration: 330, liked: false},
  {id:7, title: 'Winter', artist: 'Vivaldi', duration: 288, liked: true},
  {id:8, title: 'Air on the G String', artist: 'Bach', duration: 358, liked: false},
  {id:9, title: 'Brandenburg Concerto No. 3', artist: 'Bach', duration: 320, liked: false},
  {id:10, title: 'Goldberg Variations', artist: 'Bach', duration: 544, liked: true},
  {id:11, title: 'Toccata and Fugue in D Minor', artist: 'Bach', duration: 535, liked: false},
  {id:12, title: 'Prelude in C Major', artist: 'Bach', duration: 142, liked: true},
  {id:13, title: 'Jesu, Joy of Man\'s Desiring', artist: 'Bach', duration: 327, liked: true},
];

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