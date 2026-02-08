<template>
  <div v-if="wordCount > 0" class="article-metadata">
    <span class="metadata-item">
      <span class="icon">📝</span>
      <span class="text">{{ wordCount.toLocaleString() }} 字</span>
    </span>
    <span class="separator">·</span>
    <span class="metadata-item">
      <span class="icon">⏱️</span>
      <span class="text">阅读时长约 {{ readingTime }} 分钟</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData, useRoute } from 'vitepress'

const { page, frontmatter } = useData()
const route = useRoute()
const wordCount = ref(0)

// 计算字数（中文字符 + 英文单词）
const calculateWordCount = () => {
  // 获取文章内容
  if (typeof document === 'undefined') return 0
  
  const contentEl = document.querySelector('.vp-doc')
  if (!contentEl) return 0
  
  const content = contentEl.textContent || ''
  
  // 统计中文字符
  const chineseChars = (content.match(/[\u4e00-\u9fa5]/g) || []).length
  
  // 统计英文单词
  const englishWords = (content.match(/[a-zA-Z]+/g) || []).length
  
  return chineseChars + englishWords
}

// 计算阅读时间（中文约 300-400 字/分钟，英文约 200-250 词/分钟，这里取平均值）
const readingTime = computed(() => {
  const minutes = Math.ceil(wordCount.value / 300)
  return minutes < 1 ? 1 : minutes
})

// 在组件挂载和路由变化时更新字数
onMounted(() => {
  // 延迟计算，确保 DOM 已渲染
  setTimeout(() => {
    wordCount.value = calculateWordCount()
  }, 100)
})

// 监听路由变化
const updateWordCount = () => {
  setTimeout(() => {
    wordCount.value = calculateWordCount()
  }, 100)
}

// 使用 watch 监听路由变化
import { watch } from 'vue'
watch(() => route.path, updateWordCount)
</script>

<style scoped>
.article-metadata {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
  margin: 16px 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
}

.metadata-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.icon {
  font-size: 16px;
}

.separator {
  color: var(--vp-c-divider);
}

.text {
  font-weight: 500;
}

@media (max-width: 768px) {
  .article-metadata {
    font-size: 13px;
  }
  
  .icon {
    font-size: 14px;
  }
}
</style>
