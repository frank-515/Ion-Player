<template>
  <ion-app>
    <ion-router-outlet></ion-router-outlet>
  </ion-app>
</template>

<script lang="ts">
  import { IonApp, IonRouterOutlet } from '@ionic/vue';

  import { defineComponent } from 'vue';

  import Tabmenu from '@/views/Tabmenu';

  export default defineComponent({
    name: 'App',
    components: { IonApp, IonRouterOutlet },
  });
</script>