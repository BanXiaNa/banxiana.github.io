import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "XIA",
  head: [['link', { rel: 'icon', href: "https://banxia-log.oss-cn-beijing.aliyuncs.com/public/logo.bmp" }]],
  description: "A Small Blog",
  
  // 用户站点不需要 base 路径
  // base: '/banxiana.github.io/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    // 左上角logo
    logo: "https://banxia-log.oss-cn-beijing.aliyuncs.com/public/logo.bmp",
    //本地搜索
    search: {
      provider: 'local'
    },

    // 导航栏
    nav: [
      { text: '🏡 我的主页', link: '/' },
      { text: '📚 我的笔记',
        items: [
            { text: '设计模式', link: '/pages/DesignPattern/DesignPattern' },
        ]
      },
      { text: '🗞 杂货', link: '/links'}
    ],

    sidebar: [
      {
        text: '📚 我的笔记',
        items: [
          { text: '设计模式总览', link: '/pages/DesignPattern/DesignPattern' },
          { 
            text: '创建型模式',
            collapsed: false,
            items: [
              { text: '工厂模式', link: '/pages/DesignPattern/CreationalPattern/FactoryPattern/FactoryPattern' },
              { text: '单例模式', link: '/pages/DesignPattern/CreationalPattern/SingletonPattern/SingletonPattern' },
              { text: '建造者模式', link: '/pages/DesignPattern/CreationalPattern/BuilderPattern/BuilderPattern' },
              { text: '原型模式', link: '/pages/DesignPattern/CreationalPattern/PrototypePattern/PrototypePattern' }
            ]
          },
          { 
            text: '结构型模式',
            collapsed: false,
            items: [
              { text: '适配器模式', link: '/pages/DesignPattern/StructuralPattern/AdapterPattern/AdapterPattern' }
            ]
          }
        ]
      }
    ],

    // 右上角交际
    socialLinks: [
      { icon: 'github', link: 'https://github.com/BanXiaNa' }
    ],

    //返回顶部文字修改
    returnToTopLabel:'返回顶部',

    //页脚
    footer: {
      message: "Contact me: 1943284256@qq.com",
      // 自动更新时间
      copyright: `©${new Date().getFullYear()} XIA All rights reserved.`,
    },
  }
})
