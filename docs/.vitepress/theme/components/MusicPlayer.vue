<template>
  <div class="music-player-page">
    <div class="music-header">
      <h2>🎵 我的音乐站</h2>
      <p class="music-description">在这里聆听美妙的音乐，放松心情，顺便看看小站吧，音乐会一直播放的！</p>
    </div>
    
    <!-- 分类标签 -->
    <div class="category-tabs">
      <button 
        v-for="cat in categories" 
        :key="cat.key"
        class="category-tab"
        :class="{ active: currentCategory === cat.key }"
        @click="switchCategory(cat.key)"
      >
        {{ cat.icon }} {{ cat.name }}
      </button>
    </div>
    
    <div class="music-container">
      <!-- 当前播放信息 -->
      <div class="now-playing" v-if="currentTrack">
        <div class="album-cover">
          <img :src="currentTrack.cover" :alt="currentTrack.name" />
          <div class="play-indicator" :class="{ playing: isPlaying }">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="track-info">
          <h3 class="track-name">{{ currentTrack.name }}</h3>
          <p class="track-artist">{{ currentTrack.author }}</p>
        </div>
      </div>
      
      <!-- 播放控制 -->
      <div class="player-controls">
        <button @click="previous" class="control-btn" title="上一曲">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="19 20 9 12 19 4 19 20"></polygon>
            <line x1="5" y1="19" x2="5" y2="5"></line>
          </svg>
        </button>
        
        <button @click="togglePlay" class="control-btn play-btn" :title="isPlaying ? '暂停' : '播放'">
          <svg v-if="!isPlaying" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        </button>
        
        <button @click="next" class="control-btn" title="下一曲">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 4 15 12 5 20 5 4"></polygon>
            <line x1="19" y1="5" x2="19" y2="19"></line>
          </svg>
        </button>
      </div>
      
      <!-- 进度条 -->
      <div class="progress-container">
        <span class="time">{{ formatTime(currentTime) }}</span>
        <div class="progress-bar" @click="seek">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
        <span class="time">{{ formatTime(duration) }}</span>
      </div>
      
      <!-- 音量控制 -->
      <div class="volume-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
        <input 
          type="range" 
          min="0" 
          max="100" 
          v-model="volume" 
          @input="changeVolume"
          class="volume-slider"
        />
      </div>
      
      <!-- 播放列表 -->
      <div class="playlist">
        <h3 class="playlist-title">播放列表</h3>
        <div class="playlist-items">
          <div 
            v-for="(track, index) in playlist" 
            :key="index"
            class="playlist-item"
            :class="{ active: currentIndex === index }"
            @click="playTrack(index)"
          >
            <div class="item-index">{{ index + 1 }}</div>
            <div class="item-info">
              <div class="item-name">{{ track.name }}</div>
              <div class="item-artist">{{ track.author }}</div>
            </div>
            <div class="item-status">
              <svg v-if="currentIndex === index && isPlaying" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
              <svg v-else-if="currentIndex === index" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 错误提示 -->
    <div v-if="errorMessage" class="error-message">
      ⚠️ {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useMusicStore, type Track } from '../composables/useMusicStore'

interface Category {
  key: string
  name: string
  icon: string
}

// 分类定义
const categories: Category[] = [
  { key: 'all', name: '全部', icon: '🎵' },
  { key: 'japanese', name: '日文歌', icon: '🇯🇵' },
  { key: 'chinese', name: '中文歌', icon: '🇨🇳' },
  { key: 'english', name: '英文歌', icon: '🇺🇸' },
  { key: 'misc', name: '杂语歌', icon: '🌍' },
  { key: 'light', name: '轻音乐', icon: '🎹' },
  { key: 'rock', name: '重音乐', icon: '🎸' }
]

// 使用共享的播放列表
const { playlist: allPlaylist } = useMusicStore()

const currentCategory = ref('all')

// 根据分类过滤播放列表
const playlist = computed(() => {
  if (currentCategory.value === 'all') {
    return allPlaylist.value
  }
  return allPlaylist.value.filter(track => track.category === currentCategory.value)
})

const currentIndex = ref(0)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(70)
const errorMessage = ref('')

const currentTrack = computed(() => playlist.value[currentIndex.value])
const progress = computed(() => duration.value ? (currentTime.value / duration.value) * 100 : 0)

// 切换分类
const switchCategory = (category: string) => {
  currentCategory.value = category
  // 切换分类后重置播放状态
  currentIndex.value = 0
  // 如果正在播放，停止播放
  if (isPlaying.value && typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('globalMusicControl', {
      detail: { action: 'pause' }
    }))
  }
}

// 播放/暂停
const togglePlay = () => {
  if (isPlaying.value) {
    // 如果正在播放，暂停
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('globalMusicControl', {
        detail: { action: 'pause' }
      }))
    }
  } else {
    // 如果没有播放，开始播放当前曲目
    playTrack(currentIndex.value)
  }
}

// 播放指定曲目
const playTrack = (index: number) => {
  errorMessage.value = ''
  currentIndex.value = index
  
  const track = playlist.value[index]
  console.log('=== 页面播放器：播放曲目 ===')
  console.log('index:', index)
  console.log('track:', track)
  
  // 触发全局播放器，传递完整的歌曲信息
  if (typeof window !== 'undefined') {
    console.log('触发全局播放事件')
    const event = new CustomEvent('globalMusicPlay', {
      detail: { track }
    })
    console.log('事件对象:', event)
    window.dispatchEvent(event)
    console.log('事件已派发')
  }
}



// 上一曲
const previous = () => {
  // 在当前过滤列表中切换
  if (currentIndex.value > 0) {
    playTrack(currentIndex.value - 1)
  } else {
    // 循环到最后一首
    playTrack(playlist.value.length - 1)
  }
}

// 下一曲
const next = () => {
  // 在当前过滤列表中切换
  if (currentIndex.value < playlist.value.length - 1) {
    playTrack(currentIndex.value + 1)
  } else {
    // 循环到第一首
    playTrack(0)
  }
}

// 跳转播放位置
const seek = (e: MouseEvent) => {
  const progressBar = e.currentTarget as HTMLElement
  const rect = progressBar.getBoundingClientRect()
  const percent = (e.clientX - rect.left) / rect.width
  const newTime = percent * duration.value
  
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('globalMusicControl', {
      detail: { action: 'seek', time: newTime }
    }))
  }
}

// 改变音量
const changeVolume = () => {
  if (typeof window !== 'undefined') {
    // 保存到 localStorage
    localStorage.setItem('music-volume', volume.value.toString())
    // 通知全局播放器
    window.dispatchEvent(new CustomEvent('globalMusicControl', {
      detail: { action: 'volume', value: volume.value }
    }))
  }
}

// 格式化时间
const formatTime = (seconds: number) => {
  if (!seconds || isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

onMounted(() => {
  // 从 localStorage 恢复音量设置
  if (typeof window !== 'undefined') {
    const savedVolume = localStorage.getItem('music-volume')
    if (savedVolume) {
      volume.value = parseInt(savedVolume)
    }
    
    // 监听全局播放器的状态更新
    window.addEventListener('globalMusicStateUpdate', ((e: CustomEvent) => {
      const { isPlaying: playing, currentTrack: track, currentTime: time, duration: dur } = e.detail
      isPlaying.value = playing
      currentTime.value = time
      duration.value = dur
      
      // 根据当前播放的歌曲，在过滤后的列表中找到对应的索引
      if (track) {
        const index = playlist.value.findIndex(t => t.file === track.file)
        if (index !== -1) {
          currentIndex.value = index
        }
      }
    }) as EventListener)
    
    // 监听全局播放器的错误事件
    window.addEventListener('globalMusicError', ((e: CustomEvent) => {
      errorMessage.value = e.detail.message
      setTimeout(() => {
        errorMessage.value = ''
      }, 5000)
    }) as EventListener)
  }
})
</script>

<style scoped>
.music-player-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.music-header {
  text-align: center;
  margin-bottom: 40px;
}

.music-header h2 {
  font-size: 32px;
  margin-bottom: 10px;
  color: var(--vp-c-text-1);
}

.music-description {
  color: var(--vp-c-text-2);
  font-size: 16px;
}

/* 分类标签 */
.category-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  justify-content: center;
}

.category-tab {
  padding: 8px 20px;
  border-radius: 20px;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-tab:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  transform: translateY(-2px);
}

.category-tab.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: white;
}

.music-container {
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 当前播放 */
.now-playing {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.album-cover {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
}

.album-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-indicator {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  gap: 3px;
  align-items: flex-end;
  height: 20px;
}

.play-indicator span {
  width: 3px;
  background: white;
  border-radius: 2px;
  animation: none;
}

.play-indicator.playing span {
  animation: wave 1s ease-in-out infinite;
}

.play-indicator span:nth-child(1) {
  animation-delay: 0s;
}

.play-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.play-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes wave {
  0%, 100% { height: 8px; }
  50% { height: 20px; }
}

.track-info {
  flex: 1;
}

.track-name {
  font-size: 24px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.track-artist {
  font-size: 16px;
  color: var(--vp-c-text-2);
}

/* 播放控制 */
.player-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.control-btn {
  background: transparent;
  border: none;
  color: var(--vp-c-text-1);
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-btn:hover {
  background: var(--vp-c-bg);
  color: var(--vp-c-brand-1);
  transform: scale(1.1);
}

.play-btn {
  background: var(--vp-c-brand-1);
  color: white;
  width: 56px;
  height: 56px;
}

.play-btn:hover {
  background: var(--vp-c-brand-2);
  transform: scale(1.15);
}

/* 进度条 */
.progress-container {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.time {
  font-size: 12px;
  color: var(--vp-c-text-2);
  min-width: 40px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: var(--vp-c-bg);
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--vp-c-brand-1);
  border-radius: 3px;
  transition: width 0.1s ease;
}

/* 音量控制 */
.volume-container {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.volume-container svg {
  color: var(--vp-c-text-2);
}

.volume-slider {
  flex: 1;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: var(--vp-c-bg);
  border-radius: 3px;
  outline: none;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background: var(--vp-c-brand-1);
  border-radius: 50%;
  cursor: pointer;
}

.volume-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: var(--vp-c-brand-1);
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

/* 播放列表 */
.playlist-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 16px;
}

.playlist-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.playlist-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.playlist-item:hover {
  background: var(--vp-c-bg);
}

.playlist-item.active {
  background: var(--vp-c-brand-soft);
}

.item-index {
  width: 24px;
  text-align: center;
  font-size: 14px;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.item-info {
  flex: 1;
}

.item-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.item-artist {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.item-status {
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-brand-1);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .music-player-page {
    padding: 16px;
  }

  .music-container {
    padding: 20px;
  }

  .now-playing {
    flex-direction: column;
    text-align: center;
  }

  .album-cover {
    width: 200px;
    height: 200px;
  }

  .track-name {
    font-size: 20px;
  }

  .track-artist {
    font-size: 14px;
  }
}

/* 错误提示 */
.error-message {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: #ef4444;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  z-index: 1000;
  font-size: 14px;
  max-width: 90%;
  text-align: center;
}
</style>
