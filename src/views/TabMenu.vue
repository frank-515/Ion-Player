<template>
  <ion-page>
    <audio ref="audioPlayer"></audio>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/home">
          <ion-icon :icon="playCircle" />
          <ion-label>Listen now</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="library" href="/library">
          <ion-icon :icon="musicalNote" />
          <ion-label>Library</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="search" href="/search">
          <ion-icon :icon="search" />
          <ion-label>Search</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="playlist" href="/playlist">
          <ion-icon :icon="list" />
          <ion-label>playlist</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
  import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';
  import { playCircle, search, musicalNote, list } from 'ionicons/icons';
  import { useGlobalStore } from '@/store/globalStore';
  import { onMounted, ref, getCurrentInstance } from 'vue'
  import events from 'events'
  const globalStore = useGlobalStore()

  // 控制全局音乐状态
  const audioEvents = new events.EventEmitter()
  const audioPlayer = ref<HTMLAudioElement>()


    // 提升到vue全局
  const app = getCurrentInstance()?.appContext.app
  app!.config.globalProperties.$audioEvents = audioEvents
  
  // app!.config.globalProperties.$currentDuration = audioPlayer.value?.duration
  // Maybe I should use pinia to menage global properties
  globalStore.duration = audioPlayer.value?.duration
  globalStore.globalPlayerCtrl = audioEvents

    // 播放音频函数
    const playAudio = () => {
    audioPlayer.value?.play()
  }

  // 暂停音频函数
    const pauseAudio = () => {
    audioPlayer.value?.pause()
  }

  const getPercentage = () => {
    if (audioPlayer.value) {
      return audioPlayer.value.currentTime / audioPlayer.value.duration
    }
  }

/** 
  设置 audio 元素的播放进度百分比
  @param { percentage } 进度百分比-取值范围 [0, 1]
*/
  const setPercentage = (percentage: number) => {
    if (percentage < 0) percentage = 0
    if (percentage > 1) percentage = 1
    if (audioPlayer.value) {
      setCurrentTime(percentage * getDuration()!)
    }
    
  }

  const getDuration = () => {
    return audioPlayer.value?.duration
  }

  const setPlaySrc = (src: string) => {
    if (audioPlayer.value) {
      audioPlayer.value.src = 'http://localhost:5151/music' + src
    }
  }
  
  const getVolume = () => {
    if (audioPlayer.value) {
      return audioPlayer.value.volume
    }
  }

  const setVolume = (volume: number) => {
    if (audioPlayer.value) {
      audioPlayer.value.volume = volume
    }
  }

  const setCurrentTime = (time: number) => {
    if (audioPlayer.value) {
      audioPlayer.value.currentTime = time
      audioPlayer.value.currentTime = time
      audioPlayer.value.currentTime = time
    }
  }

  const getCurrentTime = () => {
    if (audioPlayer.value) { 
      return audioPlayer.value.currentTime
    }
  }


  audioEvents.on('play', () => {
    playAudio()
  })
  audioEvents.on('pause', () => {
    pauseAudio()
  })
  audioEvents.on('setSrc', (src: string) => {
    setPlaySrc(src)
  })
  audioEvents.on('setPercentage', (percentage: number) => {
    setPercentage(percentage)
    globalStore.setPercentage(percentage)
  })
  audioEvents.on('setVolume', (volume: number) => {
    setVolume(volume)
  })
  audioEvents.on('refresh', () => {
    globalStore.setPercentage(getPercentage())    
  })
  app!.config.globalProperties.$getPercentage = getPercentage

  
</script>