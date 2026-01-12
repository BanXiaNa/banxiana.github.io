/* .vitepress/theme/index.ts */
import DefaultTheme from 'vitepress/theme'
import './style/index.css'
import { watch, h } from 'vue'
import SeasonSwitcher from './components/SeasonSwitcher.vue'

export default {
    extends: DefaultTheme,
    
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            'layout-bottom': () => h(SeasonSwitcher)
        })
    },

    enhanceApp({app , router }) {
        // 注册季节切换器组件
        app.component('SeasonSwitcher', SeasonSwitcher)
        
        // 季节性动画效果初始化
        if (typeof window !== 'undefined') {
            // 监听路由变化，在主页显示季节动画
            watch(
                () => router.route.data.relativePath,
                () => {
                    const isHomePage = location.pathname === '/'
                    updateSeasonalEffect(isHomePage)
                },
                { immediate: true },
            )
            
            // 监听季节切换事件
            window.addEventListener('seasonChange', (event: CustomEvent) => {
                const { season } = event.detail
                handleSeasonChange(season)
            })
        }
    },
}

// 季节性动画相关变量
let canvas: HTMLCanvasElement | null = null
let ctx: CanvasRenderingContext2D | null = null
let particles: Particle[] = []
let animationId: number | null = null
let isAnimating = false
let currentSeason: Season | null = null
let manualSeason: Season | null = null // 手动选择的季节
let isManualMode = false // 是否为手动模式

// 季节枚举
enum Season {
    SPRING = 'spring',
    SUMMER = 'summer',
    AUTUMN = 'autumn',
    WINTER = 'winter'
}

// 粒子接口
interface Particle {
    x: number
    y: number
    radius: number
    speed: number
    opacity: number
    drift: number
    color?: string
    type?: string
    rotation?: number
    rotationSpeed?: number
}

// 获取当前季节（自动模式）
function getCurrentSeason(): Season {
    const month = new Date().getMonth() + 1 // 1-12
    
    if (month >= 3 && month <= 5) return Season.SPRING    // 3-5月 春季
    if (month >= 6 && month <= 8) return Season.SUMMER    // 6-8月 夏季
    if (month >= 9 && month <= 11) return Season.AUTUMN   // 9-11月 秋季
    return Season.WINTER                                   // 12-2月 冬季
}

// 获取有效季节（考虑手动模式）
function getEffectiveSeason(): Season {
    return isManualMode && manualSeason ? manualSeason : getCurrentSeason()
}

// 处理季节切换事件
function handleSeasonChange(seasonKey: string) {
    if (seasonKey === 'auto') {
        // 切换到自动模式
        isManualMode = false
        manualSeason = null
    } else {
        // 切换到手动模式
        isManualMode = true
        manualSeason = seasonKey as Season
    }
    
    // 如果当前在主页且正在动画，重新启动动画
    if (location.pathname === '/' && isAnimating) {
        stopSeasonalAnimation()
        const newSeason = getEffectiveSeason()
        startSeasonalAnimation(newSeason)
    } else if (location.pathname === '/') {
        // 如果在主页但没有动画，启动动画
        updateSeasonalEffect(true)
    }
}

// 检查用户是否偏好减少动画
function prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// 创建春季花瓣
function createSpringPetal(): Particle {
    const colors = ['#FFB6C1', '#FFC0CB', '#FFCCCB', '#FFE4E1', '#F0E68C']
    return {
        x: Math.random() * window.innerWidth,
        y: -20,
        radius: Math.random() * 4 + 2,
        speed: Math.random() * 1 + 0.3,
        opacity: Math.random() * 0.7 + 0.3,
        drift: Math.random() * 0.8 - 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 2 - 1
    }
}

// 创建夏季雨滴
function createSummerRain(): Particle {
    return {
        x: Math.random() * window.innerWidth,
        y: -10,
        radius: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 3 + 2,
        opacity: Math.random() * 0.6 + 0.4,
        drift: Math.random() * 0.3 - 0.15,
        color: '#87CEEB',
        type: 'rain'
    }
}

// 创建秋季落叶
function createAutumnLeaf(): Particle {
    const colors = ['#FF6347', '#FF8C00', '#FFD700', '#CD853F', '#D2691E']
    return {
        x: Math.random() * window.innerWidth,
        y: -20,
        radius: Math.random() * 5 + 3,
        speed: Math.random() * 0.8 + 0.4,
        opacity: Math.random() * 0.8 + 0.2,
        drift: Math.random() * 1.2 - 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 3 - 1.5
    }
}

// 创建冬季雪花
function createWinterSnow(): Particle {
    return {
        x: Math.random() * window.innerWidth,
        y: -10,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.6 + 0.4,
        drift: Math.random() * 0.5 - 0.25,
        color: '#FFFFFF'
    }
}

// 根据季节创建粒子
function createSeasonalParticle(season: Season): Particle {
    switch (season) {
        case Season.SPRING: return createSpringPetal()
        case Season.SUMMER: return createSummerRain()
        case Season.AUTUMN: return createAutumnLeaf()
        case Season.WINTER: return createWinterSnow()
    }
}

// 调整 Canvas 大小
function resizeCanvas() {
    if (!canvas) return
    
    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    
    if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.scale(dpr, dpr)
    }
}

// 绘制粒子
function drawParticle(particle: Particle, season: Season) {
    if (!ctx) return
    
    ctx.save()
    ctx.globalAlpha = particle.opacity
    
    switch (season) {
        case Season.SPRING:
            // 绘制花瓣（椭圆形）
            ctx.translate(particle.x, particle.y)
            ctx.rotate((particle.rotation || 0) * Math.PI / 180)
            ctx.fillStyle = particle.color || '#FFB6C1'
            ctx.beginPath()
            ctx.ellipse(0, 0, particle.radius, particle.radius * 0.6, 0, 0, Math.PI * 2)
            ctx.fill()
            break
            
        case Season.SUMMER:
            // 绘制雨滴（线条）
            ctx.strokeStyle = particle.color || '#87CEEB'
            ctx.lineWidth = particle.radius
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(particle.x, particle.y + particle.speed * 3)
            ctx.stroke()
            break
            
        case Season.AUTUMN:
            // 绘制叶子（多边形）
            ctx.translate(particle.x, particle.y)
            ctx.rotate((particle.rotation || 0) * Math.PI / 180)
            ctx.fillStyle = particle.color || '#FF6347'
            ctx.beginPath()
            const size = particle.radius
            ctx.moveTo(0, -size)
            ctx.quadraticCurveTo(size * 0.8, -size * 0.3, size * 0.5, size * 0.3)
            ctx.quadraticCurveTo(0, size * 0.8, -size * 0.5, size * 0.3)
            ctx.quadraticCurveTo(-size * 0.8, -size * 0.3, 0, -size)
            ctx.fill()
            break
            
        case Season.WINTER:
            // 绘制雪花（圆形）
            ctx.fillStyle = particle.color || '#FFFFFF'
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
            ctx.fill()
            break
    }
    
    ctx.restore()
}

// 动画循环
function animate() {
    if (!ctx || !canvas || !currentSeason) return
    
    // 清除画布
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    
    // 控制粒子数量
    const maxParticles = currentSeason === Season.SUMMER ? 80 : 60
    const spawnRate = currentSeason === Season.SUMMER ? 0.98 : 0.96
    
    // 随机生成新粒子
    if (particles.length < maxParticles && Math.random() > spawnRate) {
        particles.push(createSeasonalParticle(currentSeason))
    }
    
    // 更新和绘制粒子
    particles = particles.filter(particle => {
        // 更新位置
        particle.y += particle.speed
        particle.x += particle.drift
        
        // 更新旋转
        if (particle.rotation !== undefined && particle.rotationSpeed !== undefined) {
            particle.rotation += particle.rotationSpeed
        }
        
        // 绘制粒子
        drawParticle(particle, currentSeason)
        
        // 移除超出屏幕的粒子
        return particle.y < window.innerHeight + 20 && 
               particle.x > -20 && 
               particle.x < window.innerWidth + 20
    })
    
    // 继续动画
    if (isAnimating) {
        animationId = requestAnimationFrame(animate)
    }
}

// 开始季节性动画
function startSeasonalAnimation(season: Season) {
    if (isAnimating || prefersReducedMotion()) return
    
    currentSeason = season
    
    // 创建 Canvas 元素
    canvas = document.createElement('canvas')
    canvas.id = 'seasonal-canvas'
    canvas.setAttribute('aria-hidden', 'true')
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1000;
    `
    
    document.body.appendChild(canvas)
    ctx = canvas.getContext('2d')
    
    // 设置 Canvas 大小
    resizeCanvas()
    
    // 监听窗口大小变化
    window.addEventListener('resize', resizeCanvas)
    
    // 监听页面可见性变化
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopSeasonalAnimation()
        } else if (location.pathname === '/') {
            startSeasonalAnimation(getEffectiveSeason())
        }
    })
    
    // 监听用户动画偏好变化
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    mediaQuery.addEventListener('change', (e) => {
        if (e.matches) {
            stopSeasonalAnimation()
        }
    })
    
    // 开始动画
    isAnimating = true
    animate()
}

// 停止季节性动画
function stopSeasonalAnimation() {
    isAnimating = false
    currentSeason = null
    
    if (animationId) {
        cancelAnimationFrame(animationId)
        animationId = null
    }
    
    if (canvas) {
        canvas.remove()
        canvas = null
        ctx = null
    }
    
    particles = []
    window.removeEventListener('resize', resizeCanvas)
}

// 更新季节性效果
function updateSeasonalEffect(showOnHomePage: boolean) {
    const shouldShowAnimation = showOnHomePage && !prefersReducedMotion()
    
    if (shouldShowAnimation && !isAnimating) {
        const season = getEffectiveSeason()
        startSeasonalAnimation(season)
    } else if (!shouldShowAnimation && isAnimating) {
        stopSeasonalAnimation()
    }
}

// 彩虹背景动画样式
let homePageStyle: HTMLStyleElement | undefined

// 彩虹背景动画样式
function updateHomePageStyle(value: boolean) {
    if (value) {
        if (homePageStyle) return

        homePageStyle = document.createElement('style')
        homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
        document.body.appendChild(homePageStyle)
    } else {
        if (!homePageStyle) return

        homePageStyle.remove()
        homePageStyle = undefined
    }
}