<template>
  <!-- 迷你播放器 - 悬浮在左下角 -->
  <transition name="player-slide">
    <div v-if="isInitialized" class="global-music-player" :class="{ expanded: isExpanded }">
      <!-- 折叠状态 - 显示当前播放信息 -->
      <div v-if="!isExpanded" class="mini-player" @click="isExpanded = true">
        <div class="mini-cover">
          <img v-if="currentTrack" :src="currentTrack.cover" :alt="currentTrack.name" />
          <div class="play-indicator" :class="{ playing: isPlaying }">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="mini-info">
          <div class="mini-name">{{ currentTrack?.name || '未播放' }}</div>
          <div class="mini-artist">{{ currentTrack?.author || '' }}</div>
        </div>
        <button @click.stop="togglePlay" class="mini-play-btn">
          <svg v-if="!isPlaying" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        </button>
      </div>
      
      <!-- 展开状态 - 完整控制面板 -->
      <div v-else class="expanded-player">
        <div class="expanded-header">
          <span class="expanded-title">🎵 正在播放</span>
          <button @click="isExpanded = false" class="close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </button>
        </div>
        
        <div class="expanded-cover">
          <img v-if="currentTrack" :src="currentTrack.cover" :alt="currentTrack.name" />
        </div>
        
        <div class="expanded-info">
          <div class="expanded-name">{{ currentTrack?.name || '未播放' }}</div>
          <div class="expanded-artist">{{ currentTrack?.author || '' }}</div>
        </div>
        
        <div class="expanded-progress">
          <span class="time">{{ formatTime(currentTime) }}</span>
          <div class="progress-bar" @click="seek">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
          </div>
          <span class="time">{{ formatTime(duration) }}</span>
        </div>
        
        <div class="expanded-controls">
          <button @click="previous" class="control-btn" title="上一曲">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="19 20 9 12 19 4 19 20"></polygon>
              <line x1="5" y1="19" x2="5" y2="5"></line>
            </svg>
          </button>
          
          <button @click="togglePlay" class="control-btn play-btn">
            <svg v-if="!isPlaying" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          </button>
          
          <button @click="next" class="control-btn" title="下一曲">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="5 4 15 12 5 20 5 4"></polygon>
              <line x1="19" y1="5" x2="19" y2="19"></line>
            </svg>
          </button>
        </div>
        
        <div class="expanded-volume">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
        
        <div class="expanded-playlist">
          <div class="playlist-header">播放列表</div>
          <div class="playlist-items">
            <div 
              v-for="(track, index) in playlist" 
              :key="index"
              class="playlist-item"
              :class="{ active: currentIndex === index }"
              @click="playTrack(index)"
            >
              <span class="item-index">{{ index + 1 }}</span>
              <span class="item-name">{{ track.name }}</span>
              <svg v-if="currentIndex === index && isPlaying" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 隐藏的 audio 元素 -->
      <audio 
        ref="audioRef" 
        @timeupdate="updateTime"
        @loadedmetadata="updateDuration"
        @ended="next"
        @play="isPlaying = true; broadcastState()"
        @pause="isPlaying = false; broadcastState()"
        @error="handleError"
      ></audio>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useMusicStore } from '../composables/useMusicStore'

// 使用共享的播放列表
const { playlist } = useMusicStore()

const audioRef = ref<HTMLAudioElement>()
const currentIndex = ref(0)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(70)
const isExpanded = ref(false)
const isInitialized = ref(false)

const currentTrack = computed(() => playlist.value[currentIndex.value])
const progress = computed(() => duration.value ? (currentTime.value / duration.value) * 100 : 0)

// 播放/暂停
const togglePlay = () => {
  console.log('togglePlay 被调用, audioRef:', audioRef.value, 'isPlaying:', isPlaying.value)
  if (!audioRef.value) {
    console.error('audio 元素不存在！')
    return
  }
  
  // 如果 src 为空，说明还没有加载音频，先加载第一首
  if (!audioRef.value.src || audioRef.value.src === '') {
    console.log('src 为空，先加载第一首歌')
    playTrack(0)
    return
  }
  
  if (isPlaying.value) {
    audioRef.value.pause()
  } else {
    console.log('尝试播放音频，src:', audioRef.value.src)
    audioRef.value.play().catch(err => {
      console.error('播放失败:', err)
    })
  }
}

// 播放指定曲目
const playTrack = (index: number) => {
  console.log('playTrack 被调用, index:', index, 'audioRef:', audioRef.value)
  if (!audioRef.value) {
    console.error('audio 元素不存在！')
    return
  }
  
  currentIndex.value = index
  const track = currentTrack.value
  console.log('准备播放:', track.name, 'file:', track.file)
  audioRef.value.src = track.file
  audioRef.value.load()
  console.log('音频已加载，开始播放')
  audioRef.value.play().catch(err => {
    console.error('播放失败:', err)
  })
}

// 上一曲
const previous = () => {
  currentIndex.value = currentIndex.value > 0 
    ? currentIndex.value - 1 
    : playlist.value.length - 1
  playTrack(currentIndex.value)
}

// 下一曲
const next = () => {
  currentIndex.value = (currentIndex.value + 1) % playlist.value.length
  playTrack(currentIndex.value)
}

// 节流函数
let lastBroadcastTime = 0
const BROADCAST_THROTTLE = 500 // 500ms 节流

// 更新时间
const updateTime = () => {
  if (audioRef.value) {
    currentTime.value = audioRef.value.currentTime
    // 节流广播状态更新
    const now = Date.now()
    if (now - lastBroadcastTime > BROADCAST_THROTTLE) {
      broadcastState()
      lastBroadcastTime = now
    }
  }
}

// 更新时长
const updateDuration = () => {
  if (audioRef.value) {
    duration.value = audioRef.value.duration
    broadcastState()
  }
}

// 广播状态到页面播放器
const broadcastState = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('globalMusicStateUpdate', {
      detail: {
        isPlaying: isPlaying.value,
        currentIndex: currentIndex.value,
        currentTime: currentTime.value,
        duration: duration.value
      }
    }))
  }
}

// 跳转播放位置
const seek = (e: MouseEvent) => {
  if (!audioRef.value) return
  
  const progressBar = e.currentTarget as HTMLElement
  const rect = progressBar.getBoundingClientRect()
  const percent = (e.clientX - rect.left) / rect.width
  audioRef.value.currentTime = percent * duration.value
}

// 改变音量
const changeVolume = () => {
  if (audioRef.value) {
    audioRef.value.volume = volume.value / 100
    // 保存到 localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('music-volume', volume.value.toString())
    }
  }
}

// 格式化时间
const formatTime = (seconds: number) => {
  if (!seconds || isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// 错误处理
const handleError = (e: Event) => {
  const audio = e.target as HTMLAudioElement
  const error = audio.error
  
  let message = '音频加载失败'
  if (error) {
    switch (error.code) {
      case error.MEDIA_ERR_ABORTED:
        message = '音频加载被中止'
        break
      case error.MEDIA_ERR_NETWORK:
        message = '网络错误，无法加载音频'
        break
      case error.MEDIA_ERR_DECODE:
        message = '音频解码失败，可能是格式不支持'
        break
      case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
        message = '音频格式不支持或文件不存在'
        break
    }
  }
  
  console.error('音频错误:', message, error)
  
  // 广播错误到页面播放器
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('globalMusicError', {
      detail: { message }
    }))
  }
}

// 监听全局播放事件
const handleGlobalPlay = (event: CustomEvent) => {
  console.log('全局播放事件触发:', event.detail)
  const { index } = event.detail
  // 先显示播放器
  isInitialized.value = true
  // 等待 DOM 更新后再播放
  nextTick(() => {
    if (index !== undefined) {
      playTrack(index)
    }
  })
}

// 监听全局控制事件
const handleGlobalControl = (event: CustomEvent) => {
  console.log('全局控制事件触发:', event.detail)
  isInitialized.value = true
  const { action, time, value } = event.detail
  switch (action) {
    case 'play':
      if (audioRef.value && !isPlaying.value) {
        audioRef.value.play().catch(err => console.error('播放失败:', err))
      }
      break
    case 'pause':
      if (audioRef.value && isPlaying.value) {
        audioRef.value.pause()
      }
      break
    case 'toggle':
      togglePlay()
      break
    case 'next':
      next()
      break
    case 'previous':
      previous()
      break
    case 'seek':
      if (audioRef.value && time !== undefined) {
        audioRef.value.currentTime = time
      }
      break
    case 'volume':
      if (audioRef.value && value !== undefined) {
        audioRef.value.volume = value / 100
        volume.value = value
      }
      break
  }
}

onMounted(() => {
  console.log('全局播放器已挂载')
  
  // 使用 nextTick 确保 DOM 已经渲染
  nextTick(() => {
    if (audioRef.value) {
      // 从 localStorage 恢复音量设置
      const savedVolume = localStorage.getItem('music-volume')
      if (savedVolume) {
        volume.value = parseInt(savedVolume)
      }
      audioRef.value.volume = volume.value / 100
      console.log('音频元素已初始化, audioRef:', audioRef.value, 'volume:', volume.value)
    } else {
      console.error('audioRef.value 为空！')
    }
  })
  
  // 监听全局事件
  window.addEventListener('globalMusicPlay', handleGlobalPlay as EventListener)
  window.addEventListener('globalMusicControl', handleGlobalControl as EventListener)
  console.log('全局事件监听器已注册')
  
  // 只在真正开始播放时才显示播放器
  // isInitialized.value = true  // 移除测试代码
})

onBeforeUnmount(() => {
  window.removeEventListener('globalMusicPlay', handleGlobalPlay as EventListener)
  window.removeEventListener('globalMusicControl', handleGlobalControl as EventListener)
})

// 暴露给外部的方法
defineExpose({
  play: togglePlay,
  next,
  previous,
  playTrack
})
</script>

<style scoped>
.global-music-player {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 998;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

/* 迷你播放器 */
.mini-player {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 50px;
  padding: 8px 16px 8px 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  max-width: 300px;
}

.mini-player:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.mini-cover {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.mini-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-indicator {
  position: absolute;
  bottom: 4px;
  right: 4px;
  display: flex;
  gap: 2px;
  align-items: flex-end;
  height: 12px;
}

.play-indicator span {
  width: 2px;
  background: white;
  border-radius: 1px;
  animation: none;
}

.play-indicator.playing span {
  animation: wave 1s ease-in-out infinite;
}

.play-indicator span:nth-child(1) { animation-delay: 0s; }
.play-indicator span:nth-child(2) { animation-delay: 0.2s; }
.play-indicator span:nth-child(3) { animation-delay: 0.4s; }

@keyframes wave {
  0%, 100% { height: 4px; }
  50% { height: 12px; }
}

.mini-info {
  flex: 1;
  min-width: 0;
}

.mini-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mini-artist {
  font-size: 12px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mini-play-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.mini-play-btn:hover {
  background: var(--vp-c-brand-2);
  transform: scale(1.1);
}

/* 展开播放器 */
.expanded-player {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  width: 320px;
  max-height: 600px;
  display: flex;
  flex-direction: column;
}

.expanded-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.expanded-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.close-btn {
  background: transparent;
  border: none;
  color: var(--vp-c-text-2);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.expanded-cover {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
}

.expanded-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.expanded-info {
  text-align: center;
  margin-bottom: 16px;
}

.expanded-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.expanded-artist {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.expanded-progress {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.time {
  font-size: 11px;
  color: var(--vp-c-text-2);
  min-width: 35px;
}

.progress-bar {
  flex: 1;
  height: 4px;
  background: var(--vp-c-bg-soft);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--vp-c-brand-1);
  border-radius: 2px;
  transition: width 0.1s ease;
}

.expanded-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
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
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
}

.play-btn {
  background: var(--vp-c-brand-1);
  color: white;
  width: 48px;
  height: 48px;
}

.play-btn:hover {
  background: var(--vp-c-brand-2);
  transform: scale(1.1);
}

.expanded-volume {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.expanded-volume svg {
  color: var(--vp-c-text-2);
  flex-shrink: 0;
}

.volume-slider {
  flex: 1;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: var(--vp-c-bg-soft);
  border-radius: 2px;
  outline: none;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  background: var(--vp-c-brand-1);
  border-radius: 50%;
  cursor: pointer;
}

.volume-slider::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background: var(--vp-c-brand-1);
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

.expanded-playlist {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.playlist-header {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.playlist-items {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.playlist-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 13px;
}

.playlist-item:hover {
  background: var(--vp-c-bg-soft);
}

.playlist-item.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.item-index {
  width: 20px;
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.item-name {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 动画 */
.player-slide-enter-active,
.player-slide-leave-active {
  transition: all 0.3s ease;
}

.player-slide-enter-from,
.player-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .global-music-player {
    bottom: 70px;
    left: 16px;
  }
  
  .mini-player {
    max-width: calc(100vw - 100px);
  }
  
  .expanded-player {
    width: calc(100vw - 32px);
    max-width: 320px;
  }
}
</style>
