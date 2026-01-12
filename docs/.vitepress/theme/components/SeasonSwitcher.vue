<template>
  <div class="season-switcher-float">
    <div class="season-fab" @click="toggleDropdown" ref="dropdown">
      <span class="current-season-icon">{{ currentSeasonIcon }}</span>
    </div>
    
    <div class="season-menu" :class="{ 'show': isOpen }">
      <div class="season-menu-header">
        <span class="menu-title">选择季节效果</span>
      </div>
      <div 
        v-for="season in seasons" 
        :key="season.key"
        class="season-item"
        :class="{ 'active': selectedSeason === season.key }"
        @click="selectSeason(season.key)"
      >
        <span class="season-icon">{{ season.icon }}</span>
        <span class="season-name">{{ season.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 季节数据
const seasons = [
  { key: 'auto', icon: '🔄', name: '自动切换' },
  { key: 'spring', icon: '🌸', name: '春季花瓣' },
  { key: 'summer', icon: '🌧️', name: '夏季雨滴' },
  { key: 'autumn', icon: '🍂', name: '秋季落叶' },
  { key: 'winter', icon: '❄️', name: '冬季雪花' }
]

// 响应式数据
const isOpen = ref(false)
const selectedSeason = ref('auto')
const dropdown = ref<HTMLElement>()

// 计算当前季节显示
const currentSeasonIcon = computed(() => {
  const season = seasons.find(s => s.key === selectedSeason.value)
  return season?.icon || '🔄'
})

// 切换下拉菜单
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

// 选择季节
const selectSeason = (seasonKey: string) => {
  selectedSeason.value = seasonKey
  isOpen.value = false
  
  // 触发全局季节切换事件
  window.dispatchEvent(new CustomEvent('seasonChange', { 
    detail: { season: seasonKey } 
  }))
  
  // 保存用户选择到 localStorage
  localStorage.setItem('selectedSeason', seasonKey)
}

// 点击外部关闭下拉菜单
const handleClickOutside = (event: Event) => {
  if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

// 组件挂载时的初始化
onMounted(() => {
  // 从 localStorage 读取用户之前的选择
  const saved = localStorage.getItem('selectedSeason')
  if (saved && seasons.some(s => s.key === saved)) {
    selectedSeason.value = saved
  }
  
  // 添加点击外部事件监听
  document.addEventListener('click', handleClickOutside)
})

// 组件卸载时清理
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.season-switcher-float {
  position: fixed;
  bottom: 80px;
  right: 24px;
  z-index: 2000;
}

.season-fab {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
  backdrop-filter: blur(8px);
}

.season-fab:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  background: var(--vp-c-brand-2);
}

.season-fab:active {
  transform: translateY(0);
}

.current-season-icon {
  font-size: 24px;
  line-height: 1;
}

.season-menu {
  position: absolute;
  bottom: 70px;
  right: 0;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  min-width: 180px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px) scale(0.95);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(12px);
  overflow: hidden;
}

.season-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
}

.season-menu-header {
  padding: 12px 16px 8px;
  border-bottom: 1px solid var(--vp-c-divider-light);
  background: var(--vp-c-bg-soft);
}

.menu-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.season-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  color: var(--vp-c-text-1);
  position: relative;
}

.season-item:hover {
  background: var(--vp-c-bg-soft);
}

.season-item.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.season-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--vp-c-brand-1);
}

.season-icon {
  font-size: 18px;
  line-height: 1;
}

.season-name {
  white-space: nowrap;
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .season-switcher-float {
    bottom: 70px;
    right: 16px;
  }
  
  .season-fab {
    width: 48px;
    height: 48px;
  }
  
  .current-season-icon {
    font-size: 20px;
  }
  
  .season-menu {
    bottom: 60px;
    min-width: 160px;
  }
  
  .season-item {
    padding: 10px 14px;
    font-size: 13px;
  }
  
  .season-icon {
    font-size: 16px;
  }
}

/* 暗色主题适配 */
.dark .season-fab {
  background: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.dark .season-fab:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
}

.dark .season-menu {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* 动画效果 */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.season-fab:focus {
  animation: pulse 1s ease-in-out;
  outline: none;
}
</style>