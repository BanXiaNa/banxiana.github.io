<template>
  <div class="floating-toolbar">
    <!-- 主按钮 -->
    <button 
      class="main-button" 
      @click="toggleMenu"
      :class="{ active: isOpen }"
      aria-label="工具栏"
    >
      <transition name="icon-rotate" mode="out-in">
        <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="12" cy="5" r="1"></circle>
          <circle cx="12" cy="19" r="1"></circle>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </transition>
    </button>
    
    <!-- 工具菜单 -->
    <transition name="menu-slide">
      <div v-if="isOpen" class="tool-menu">
        <!-- 分享按钮 -->
        <div class="tool-item-wrapper">
          <button 
            class="tool-item" 
            @click="toggleShare"
            :class="{ active: showShare }"
            title="分享"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            <span class="tool-label">分享</span>
          </button>
          
          <!-- 分享子菜单 -->
          <transition name="submenu-slide">
            <div v-if="showShare" class="submenu share-submenu">
              <a 
                v-for="platform in platforms" 
                :key="platform.name"
                :href="platform.url"
                target="_blank"
                rel="noopener noreferrer"
                class="submenu-item"
                @click="handleShare(platform.name)"
              >
                <span class="submenu-icon">{{ platform.icon }}</span>
                <span class="submenu-name">{{ platform.name }}</span>
              </a>
              <button class="submenu-item" @click="copyLink">
                <span class="submenu-icon">🔗</span>
                <span class="submenu-name">复制链接</span>
              </button>
            </div>
          </transition>
        </div>
        
        <!-- 季节切换按钮 -->
        <div class="tool-item-wrapper">
          <button 
            class="tool-item" 
            @click="toggleSeason"
            :class="{ active: showSeason }"
            title="季节特效"
          >
            <span class="season-icon">{{ currentSeasonIcon }}</span>
            <span class="tool-label">特效</span>
          </button>
          
          <!-- 季节子菜单 -->
          <transition name="submenu-slide">
            <div v-if="showSeason" class="submenu season-submenu">
              <button 
                v-for="season in seasons" 
                :key="season.key"
                class="submenu-item"
                @click="changeSeason(season.key)"
                :class="{ active: currentSeason === season.key }"
              >
                <span class="submenu-icon">{{ season.icon }}</span>
                <span class="submenu-name">{{ season.name }}</span>
              </button>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const isOpen = ref(false)
const showShare = ref(false)
const showSeason = ref(false)
const currentSeason = ref('auto')

const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://pinellia.cn'
const title = 'XIA - 个人技术博客'
const description = '探索……沉淀……成长！分享技术学习笔记和实践经验'

// 分享平台
const platforms = computed(() => [
  {
    name: '微信',
    icon: '💬',
    url: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}`
  },
  {
    name: '微博',
    icon: '🔴',
    url: `https://service.weibo.com/share/share.php?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title + ' - ' + description)}`
  },
  {
    name: 'QQ',
    icon: '🐧',
    url: `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`
  },
  {
    name: 'Twitter',
    icon: '🐦',
    url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`
  },
  {
    name: 'Facebook',
    icon: '📘',
    url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
  },
  {
    name: 'LinkedIn',
    icon: '💼',
    url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`
  }
])

// 季节选项
const seasons = [
  { key: 'auto', name: '自动', icon: '🔄' },
  { key: 'spring', name: '春天', icon: '🌸' },
  { key: 'summer', name: '夏天', icon: '🌧️' },
  { key: 'autumn', name: '秋天', icon: '🍂' },
  { key: 'winter', name: '冬天', icon: '❄️' }
]

// 当前季节图标
const currentSeasonIcon = computed(() => {
  const season = seasons.find(s => s.key === currentSeason.value)
  return season ? season.icon : '🔄'
})

// 切换主菜单
const toggleMenu = () => {
  isOpen.value = !isOpen.value
  if (!isOpen.value) {
    showShare.value = false
    showSeason.value = false
  }
}

// 切换分享菜单
const toggleShare = () => {
  showShare.value = !showShare.value
  showSeason.value = false
}

// 切换季节菜单
const toggleSeason = () => {
  showSeason.value = !showSeason.value
  showShare.value = false
}

// 处理分享
const handleShare = (platform: string) => {
  console.log(`分享到 ${platform}`)
  if (platform === '微信') {
    setTimeout(() => {
      alert('请使用微信扫描二维码分享')
    }, 100)
  }
}

// 复制链接
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(currentUrl)
    alert('链接已复制到剪贴板！')
    isOpen.value = false
    showShare.value = false
  } catch (err) {
    const input = document.createElement('input')
    input.value = currentUrl
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
    alert('链接已复制到剪贴板！')
    isOpen.value = false
    showShare.value = false
  }
}

// 切换季节
const changeSeason = (seasonKey: string) => {
  currentSeason.value = seasonKey
  localStorage.setItem('preferred-season', seasonKey)
  
  // 触发季节切换事件
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('seasonChange', {
      detail: { season: seasonKey }
    }))
  }
  
  showSeason.value = false
}

// 初始化
onMounted(() => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('preferred-season')
    if (saved) {
      currentSeason.value = saved
    }
    
    // 点击外部关闭
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (!target.closest('.floating-toolbar')) {
        isOpen.value = false
        showShare.value = false
        showSeason.value = false
      }
    })
  }
})
</script>

<style scoped>
.floating-toolbar {
  position: fixed;
  bottom: 80px;
  right: 20px;
  z-index: 999;
}

/* 主按钮 */
.main-button {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.main-button:hover {
  background: var(--vp-c-brand-2);
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.main-button.active {
  background: var(--vp-c-brand-2);
  transform: rotate(90deg);
}

/* 工具菜单 */
.tool-menu {
  position: absolute;
  bottom: 70px;  /* 改为从主按钮上方展开 */
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tool-item-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
}

.tool-item {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
}

.tool-item:hover {
  background: var(--vp-c-bg-soft);
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.tool-item.active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
}

.tool-label {
  position: absolute;
  right: 60px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tool-item:hover .tool-label {
  opacity: 1;
}

.season-icon {
  font-size: 24px;
}

/* 子菜单 */
.submenu {
  position: absolute;
  right: 60px;
  bottom: 0;  /* 改为从按钮底部对齐，向上展开 */
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 8px;
  min-width: 140px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.submenu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  width: 100%;
  text-decoration: none;
  color: var(--vp-c-text-1);
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  background: transparent;
  font-size: 14px;
  text-align: left;
}

.submenu-item:hover {
  background: var(--vp-c-bg-soft);
}

.submenu-item.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.submenu-icon {
  font-size: 18px;
  width: 20px;
  text-align: center;
}

.submenu-name {
  flex: 1;
  font-weight: 500;
}

/* 动画 */
.icon-rotate-enter-active,
.icon-rotate-leave-active {
  transition: all 0.3s ease;
}

.icon-rotate-enter-from {
  opacity: 0;
  transform: rotate(-90deg);
}

.icon-rotate-leave-to {
  opacity: 0;
  transform: rotate(90deg);
}

.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: all 0.3s ease;
}

.menu-slide-enter-from,
.menu-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);  /* 向下滑出效果 */
}

.submenu-slide-enter-active,
.submenu-slide-leave-active {
  transition: all 0.3s ease;
}

.submenu-slide-enter-from,
.submenu-slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .floating-toolbar {
    bottom: 70px;
    right: 16px;
  }
  
  .main-button {
    width: 48px;
    height: 48px;
  }
  
  .tool-item {
    width: 44px;
    height: 44px;
  }
  
  .tool-label {
    display: none;
  }
  
  .submenu {
    right: 56px;
    min-width: 120px;
  }
}

/* 暗色模式 */
.dark .main-button {
  background: var(--vp-c-brand-1);
}

.dark .tool-item {
  background: var(--vp-c-bg-alt);
  border-color: var(--vp-c-divider);
}

.dark .submenu {
  background: var(--vp-c-bg-alt);
  border-color: var(--vp-c-divider);
}
</style>
