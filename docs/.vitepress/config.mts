import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "XIA",
  head: [
    ['link', { rel: 'icon', href: "/favicon.ico" }],
    // SEO Meta 标签
    ['meta', { name: 'keywords', content: 'MySQL, Spring, 设计模式, Java, 技术博客, 编程, 数据库' }],
    ['meta', { name: 'author', content: 'XIA' }],
    // Open Graph 标签（社交媒体分享）
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://pinellia.cn/' }],
    ['meta', { property: 'og:site_name', content: 'XIA 技术博客' }],
    ['meta', { property: 'og:title', content: 'XIA - 个人技术博客' }],
    ['meta', { property: 'og:description', content: '探索……沉淀……成长！分享技术学习笔记和实践经验' }],
    ['meta', { property: 'og:image', content: 'https://pinellia.cn/logo.png' }],
    ['meta', { property: 'og:image:type', content: 'image/png' }],
    ['meta', { property: 'og:image:width', content: '800' }],
    ['meta', { property: 'og:image:height', content: '800' }],
    ['meta', { property: 'og:image:alt', content: 'XIA 技术博客' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@XIA' }],
    ['meta', { name: 'twitter:title', content: 'XIA - 个人技术博客' }],
    ['meta', { name: 'twitter:description', content: '探索……沉淀……成长！分享技术学习笔记和实践经验' }],
    ['meta', { name: 'twitter:image', content: 'https://pinellia.cn/logo.png' }]
  ],
  description: "探索……沉淀……成长！分享技术学习笔记和实践经验",
  
  // 用户站点不需要 base 路径
  // base: '/banxiana.github.io/',
  
  // Sitemap 配置
  sitemap: {
    hostname: 'https://pinellia.cn'
  },
  
  // 显示最后更新时间
  lastUpdated: true,
  
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    // 左上角logo
    logo: "/logo.svg",
    //本地搜索
    search: {
      provider: 'local'
    },

    // 导航栏
    nav: [
      { text: '🏡 我的主页', link: '/' },
      { 
        text: '📝 我的文章',
        items: [
          { text: '📚 面试笔记', link: '/pages/Articles/InterviewNotes/' },
          { text: '📐 设计模式', link: '/pages/Articles/DesignPattern/DesignPattern' },
          { text: '📋 Git 提交规范', link: '/pages/Articles/GitCommitConventions/GitCommitConventions' }
        ]
      },
      {
          text: '📖 我的文档',
          items: [
            { text: '🌱 Spring 小记', link: '/pages/Documents/SpringNotes/' },
            { text: '🔄 JUC 并发编程', link: '/pages/Documents/JUC/' },
            { text: '🗄️ MySQL 数据库', link: '/pages/Documents/SQL/' }
          ]
        },
      { 
        text: '🗞 杂货',
        items: [
          { text: '🐍 Python 基础教程', link: '/pages/Groceries/MAGAOPythonNotesS1' }
        ]
      },
      { text: '🎵 音乐站', link: '/pages/Music/' }
    ],

    sidebar: [
      {
        text: '📝 我的文章',
        items: [
          { 
            text: '面试笔记',
            link: '/pages/Articles/InterviewNotes/',
            collapsed: false,
            items: [
              {
                text: 'Java 技术栈',
                collapsed: true,
                items: [
                  { text: 'Java 基础', link: '/pages/Articles/InterviewNotes/Java/JavaBasic/JavaBasic' },
                  { text: 'Java 集合框架', link: '/pages/Articles/InterviewNotes/Java/JavaCollection/JavaCollection' },
                  { text: 'Java 并发编程', link: '/pages/Articles/InterviewNotes/Java/JavaConcurrency/JavaConcurrency' },
                  { text: 'JVM 虚拟机', link: '/pages/Articles/InterviewNotes/Java/JVM/JVM' }
                ]
              },
              {
                text: '中间件技术',
                collapsed: true,
                items: [
                  { text: 'Redis 笔记', link: '/pages/Articles/InterviewNotes/Redis/RedisNotes' }
                ]
              },
              {
                text: '数据库技术',
                collapsed: true,
                items: [
                  { text: 'MySQL 笔记', link: '/pages/Articles/InterviewNotes/MySQL/MySQLNotes' }
                ]
              }
            ]
          },
          { 
            text: '设计模式',
            link: '/pages/Articles/DesignPattern/DesignPattern',
            collapsed: false,
            items: [
              { 
                text: '创建型设计模式',
                collapsed: false,
                items: [
                  { text: '工厂模式', link: '/pages/Articles/DesignPattern/CreationalPattern/FactoryPattern/FactoryPattern' },
                  { text: '单例模式', link: '/pages/Articles/DesignPattern/CreationalPattern/SingletonPattern/SingletonPattern' },
                  { text: '建造者模式', link: '/pages/Articles/DesignPattern/CreationalPattern/BuilderPattern/BuilderPattern' },
                  { text: '原型模式', link: '/pages/Articles/DesignPattern/CreationalPattern/PrototypePattern/PrototypePattern' }
                ]
              },
              { 
                text: '结构型设计模式',
                collapsed: false,
                items: [
                  { text: '适配器模式', link: '/pages/Articles/DesignPattern/StructuralPattern/AdapterPattern/AdapterPattern' },
                  { text: '桥接模式', link: '/pages/Articles/DesignPattern/StructuralPattern/BridgePattern/BridgePattern' },
                  { text: '过滤器模式', link: '/pages/Articles/DesignPattern/StructuralPattern/FilterPattern/FilterPattern' },
                  { text: '组合模式', link: '/pages/Articles/DesignPattern/StructuralPattern/CompositePattern/CompositePattern' },
                  { text: '装饰器模式', link: '/pages/Articles/DesignPattern/StructuralPattern/DecoratorPattern/DecoratorPattern' },
                  { text: '外观模式', link: '/pages/Articles/DesignPattern/StructuralPattern/FacadePattern/FacadePattern' },
                  { text: '享元模式', link: '/pages/Articles/DesignPattern/StructuralPattern/FlyweightPattern/FlyweightPattern' },
                  { text: '代理模式', link: '/pages/Articles/DesignPattern/StructuralPattern/ProxyPattern/ProxyPattern' }
                ]
              },
              { 
                text: '行为型设计模式',
                collapsed: false,
                items: [
                  { text: '责任链模式', link: '/pages/Articles/DesignPattern/BehavioralPattern/ChainOfResponsibilityPattern/ChainOfResponsibilityPattern' }
                ]
              }
            ]
          },
          { text: 'Git 提交规范', link: '/pages/Articles/GitCommitConventions/GitCommitConventions' }
        ]
      },
      {
        text: '📖 我的文档',
        items: [
          { 
            text: 'Spring 小记',
            link: '/pages/Documents/SpringNotes/',
            collapsed: false,
            items: [
              {
                text: 'Spring MVC',
                collapsed: false,
                items: [
                  { text: 'ResponseBodyEmitter 使用', link: '/pages/Documents/SpringNotes/SpringMVC/ResponseBodyEmitter' }
                ]
              }
            ]
          },
          { 
            text: 'JUC 并发编程',
            link: '/pages/Documents/JUC/',
            collapsed: false,
            items: [
              {
                text: '并发工具',
                collapsed: false,
                items: [
                  { text: 'CountDownLatch', link: '/pages/Documents/JUC/tools/CountDownLatch' },
                  { text: 'CyclicBarrier', link: '/pages/Documents/JUC/tools/CyclicBarrier' },
                  { text: 'Semaphore', link: '/pages/Documents/JUC/tools/Semaphore' }
                ]
              }
            ]
          },
          { 
            text: 'MySQL 数据库',
            link: '/pages/Documents/SQL/',
            collapsed: false,
            items: [
              {
                text: '🎯 基础篇',
                collapsed: true,
                items: [
                  { text: '01：基础指令', link: '/pages/Documents/SQL/01：基础指令' },
                  { text: '02：函数', link: '/pages/Documents/SQL/02：函数' },
                  { text: '03：约束', link: '/pages/Documents/SQL/03：约束' },
                  { text: '04：多表查询', link: '/pages/Documents/SQL/04：多表查询' }
                ]
              },
              {
                text: '🚀 进阶篇',
                collapsed: true,
                items: [
                  { text: '05：事务', link: '/pages/Documents/SQL/05：事务' },
                  { text: '06：存储引擎', link: '/pages/Documents/SQL/06：存储引擎' },
                  { text: '07：索引', link: '/pages/Documents/SQL/07：索引' },
                  { text: '08：性能分析', link: '/pages/Documents/SQL/08：性能分析' },
                  { text: '09：SQL优化', link: '/pages/Documents/SQL/09：SQL优化' }
                ]
              },
              {
                text: '💎 高级篇',
                collapsed: true,
                items: [
                  { text: '10：视图', link: '/pages/Documents/SQL/10：视图' },
                  { text: '11：存储', link: '/pages/Documents/SQL/11：存储' },
                  { text: '12：触发器', link: '/pages/Documents/SQL/12：触发器' },
                  { text: '13：锁', link: '/pages/Documents/SQL/13：锁' },
                  { text: '14：InnoDB', link: '/pages/Documents/SQL/14：InnoDB' }
                ]
              },
              {
                text: '🔧 运维篇',
                collapsed: true,
                items: [
                  { text: '15：MySQL管理', link: '/pages/Documents/SQL/15：MySQL管理' },
                  { text: '16：日志', link: '/pages/Documents/SQL/16：日志' },
                  { text: '17：主从复制', link: '/pages/Documents/SQL/17：主从复制' },
                  { text: '18：分库分表', link: '/pages/Documents/SQL/18：分库分表' }
                ]
              }
            ]
          }
        ]
      },
      {
        text: '🗞 杂货',
        items: [
          { text: 'Python 基础教程', link: '/pages/Groceries/MAGAOPythonNotesS1' }
        ]
      }
    ],

    // 右上角交际
    socialLinks: [
      { icon: 'github', link: 'https://github.com/BanXiaNa' }
    ],

    //返回顶部文字修改
    returnToTopLabel:'返回顶部',
    
    // 右侧大纲标题
    outlineTitle: '目录',
    
    // 大纲显示层级
    outline: {
      level: [1, 6],
      label: '目录'
    },
    
    // 最后更新时间文本
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'short'
      }
    },

    //页脚
    footer: {
      message: "Contact me: 1943284256@qq.com",
      // 自动更新时间
      copyright: `©${new Date().getFullYear()} XIA All rights reserved.`,
    },
  }
})
