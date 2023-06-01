<template>
    <ion-page>
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
        <!-- 添加库页面 -->
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
            

          </ion-content>
        </ion-modal>
        <!-- 库列表 -->
        <ul class="list">
          <div v-for="lib in fetchLibrary()" :key="lib.Name" class="list-item">
            <ion-card class="library-card" @click="onSelectLib(lib.Name)">
              <img src='@/assets/cover.png' class="header-img" />
              <div class="card-content">
                <ion-card-title>{{ lib.Name }}</ion-card-title>
                <ion-card-content>{{ lib.Path }}</ion-card-content>
              </div>
            </ion-card>
          </div>
        </ul>
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
  import { add, folder } from "ionicons/icons";
  const isOpen = ref(false);
  const setOpen = (isOpen_: boolean) => {
    isOpen.value = isOpen_;
  };
  const onSelectPath = () => {};
  const libraryForm = reactive({
    Name: "",
    Path: "",
  });
  
  const onSelectLibrary = () => {};
  
  const fetchLibrary = () => {
    return testLibList;
  };
  
  const testLibList = [
    { Name: "Bach", Path: "/electron" },
    { Name: "Jay", Path: "/electron" },
    { Name: "Bach", Path: "/electron" },
    { Name: "Jay", Path: "/electron" },
    { Name: "Bach", Path: "/electron" },
    { Name: "Jay", Path: "/electron" },
  ];
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
    bottom: calc(var(--cover-hight) * 0.2);
  }
  
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  
  .list-item {
    
    
  }
  </style>