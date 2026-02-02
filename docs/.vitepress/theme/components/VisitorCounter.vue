<template>
  <div class="visitor-counter">
    <span id="busuanzi_container_site_pv" style="display: none;">
      👀 你是第 <span id="busuanzi_value_site_pv"></span> 位来看的人！
    </span>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  // 加载不蒜子统计脚本
  const script = document.createElement('script')
  script.async = true
  script.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
  document.head.appendChild(script)
  
  // 等待脚本加载完成后显示统计并设置初始值
  script.onload = () => {
    setTimeout(() => {
      const container = document.getElementById('busuanzi_container_site_pv')
      const valueElement = document.getElementById('busuanzi_value_site_pv')
      
      if (container && valueElement) {
        // 获取原始访问量
        const originalCount = parseInt(valueElement.textContent || '0')
        // 设置初始偏移量为 83
        const offset = 83
        // 更新显示的访问量
        valueElement.textContent = String(originalCount + offset)
        // 显示容器
        container.style.display = 'inline'
      }
    }, 100)
  }
})
</script>

<style scoped>
.visitor-counter {
  text-align: center;
  padding: 20px 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
  border-top: 1px solid var(--vp-c-divider);
  margin-top: 20px;
}

.visitor-counter span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

#busuanzi_value_site_pv {
  font-weight: bold;
  color: var(--vp-c-brand-1);
  font-size: 16px;
}
</style>
