import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "XIA",
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  description: "A Small Blog",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    // 左上角logo
    logo: "/logo.png",
    //本地搜索
    search: {
      provider: 'local'
    },


    // 导航栏
    nav: [
      { text: '🏡 我的主页', link: '/' },
      { text: '📚 我的笔记',
        items: [
            { text: 'HTML', link: '/markdown-examples' },
            { text: 'CSS', link: '/css/css-intro' },
            { text: 'JavaScript', link: '/javascript/javascript-intro' },
        ]
      },
      { text: '🗞 杂货', link: '/links'}
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
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
