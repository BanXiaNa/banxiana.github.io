<template>
  <div class="season-switcher">
    <div class="season-dropdown" @click="toggleDropdown" ref="dropdown">
      <span class="current-season">{{ currentSeasonIcon }} {{ currentSeasonText }}</span>
      <svg class="dropdown-arrow" :class="{ 'open': isOpen }" viewBox="0 0 24 24" width="16" height="16">
        <path d="M7 10l5 5 5-5z" fill="currentColor"/>
      </svg>
    </div>
    
    <div class="season-menu" :class="{ 'show': isOpen }">
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

const currentSeasonText = computed(() => {
  const season = seasons.find(s => s.key === selectedSeason.value)
  return season?.name || '自动切换'
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
.season-switcher {
  position: relative;
  display: inline-block;
}

.season-dropdown {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  color: var(--vp-c-text-1);
  user-select: none;
}

.season-dropdown:hover {
  background: var(--vp-c-bg-mute);
  border-color: var(--vp-c-brand-1);
}

.current-season {
  white-space: nowrap;
}

.dropdown-arrow {
  transition: transform 0.2s ease;
  color: var(--vp-c-text-2);
}

.dropdown-arrow.open {
  transform: rotate(180deg);
}

.season-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: var(--vp-shadow-3);
  min-width: 160px;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: all 0.2s ease;
}

.season-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.season-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.season-item:hover {
  background: var(--vp-c-bg-soft);
}

.season-item.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.season-item:first-child {
  border-radius: 8px 8px 0 0;
}

.season-item:last-child {
  border-radius: 0 0 8px 8px;
}

.season-icon {
  font-size: 16px;
}

.season-name {
  white-space: nowrap;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .season-dropdown {
    padding: 4px 8px;
    font-size: 13px;
  }
  
  .season-menu {
    right: -20px;
    min-width: 140px;
  }
  
  .season-item {
    padding: 6px 10px;
    font-size: 13px;
  }
}
</style>