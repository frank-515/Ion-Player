

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar style="padding-top: 8px;">
        <ion-searchbar placeholder="Search" :value="keyword" @ionInput="onSearchChange"></ion-searchbar>
      </ion-toolbar>
      <ion-toolbar>
        <ion-segment>
          <ion-segment-button>Name</ion-segment-button>
          <ion-segment-button>Artist</ion-segment-button>
          <ion-segment-button>Album</ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      {{ keyword }}
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonSearchbar, IonSegment, IonSegmentButton } from '@ionic/vue';
  import { ref } from 'vue';

  const keyword = ref('')

  const onSearchChange = (event: any) => {
    keyword.value = event.detail.value
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