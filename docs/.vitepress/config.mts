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
      { text: '🌱 Spring小记', link: '/pages/SpringNotes/' },
      { text: '📚 我的笔记',
        items: [
            { text: '设计模式', link: '/pages/Notes/DesignPattern/DesignPattern' },
            { text: 'MySQL 数据库', link: '/pages/Notes/SQL/MySQLNotes' },
        ]
      },
      { text: '🗞 杂货',
        items: [
            { text: 'Git 提交规范', link: '/pages/Groceries/GitCommitConventions' },
            { text: 'Python 基础教程', link: '/pages/Groceries/MAGAOPythonNotesS1' },
        ]
      }
    ],

    sidebar: [
      {
        text: '🌱 Spring小记',
        items: [
          { text: '概述', link: '/pages/SpringNotes/' },
          {
            text: 'Spring MVC',
            collapsed: false,
            items: [
              { text: 'ResponseBodyEmitter 使用', link: '/pages/SpringNotes/SpringMVC/ResponseBodyEmitter' }
            ]
          }
        ]
      },
      {
        text: '📚 我的笔记',
        items: [
          { 
            text: '设计模式',
            link: '/pages/Notes/DesignPattern/DesignPattern',
            collapsed: false,
            items: [
              { 
                text: '创建型设计模式',
                collapsed: false,
                items: [
                  { text: '工厂模式', link: '/pages/Notes/DesignPattern/CreationalPattern/FactoryPattern/FactoryPattern' },
                  { text: '单例模式', link: '/pages/Notes/DesignPattern/CreationalPattern/SingletonPattern/SingletonPattern' },
                  { text: '建造者模式', link: '/pages/Notes/DesignPattern/CreationalPattern/BuilderPattern/BuilderPattern' },
                  { text: '原型模式', link: '/pages/Notes/DesignPattern/CreationalPattern/PrototypePattern/PrototypePattern' }
                ]
              },
              { 
                text: '结构型设计模式',
                collapsed: false,
                items: [
                  { text: '适配器模式', link: '/pages/Notes/DesignPattern/StructuralPattern/AdapterPattern/AdapterPattern' },
                  { text: '桥接模式', link: '/pages/Notes/DesignPattern/StructuralPattern/BridgePattern/BridgePattern' },
                  { text: '过滤器模式', link: '/pages/Notes/DesignPattern/StructuralPattern/FilterPattern/FilterPattern' },
                  { text: '组合模式', link: '/pages/Notes/DesignPattern/StructuralPattern/CompositePattern/CompositePattern' },
                  { text: '装饰器模式', link: '/pages/Notes/DesignPattern/StructuralPattern/DecoratorPattern/DecoratorPattern' },
                  { text: '外观模式', link: '/pages/Notes/DesignPattern/StructuralPattern/FacadePattern/FacadePattern' },
                  { text: '享元模式', link: '/pages/Notes/DesignPattern/StructuralPattern/FlyweightPattern/FlyweightPattern' },
                  { text: '代理模式', link: '/pages/Notes/DesignPattern/StructuralPattern/ProxyPattern/ProxyPattern' }
                ]
              },
              { 
                text: '行为型设计模式',
                collapsed: false,
                items: [
                  { text: '责任链模式', link: '/pages/Notes/DesignPattern/BehavioralPattern/ChainOfResponsibilityPattern/ChainOfResponsibilityPattern' }
                ]
              }
            ]
          },
          { text: 'MySQL 数据库', link: '/pages/Notes/SQL/MySQLNotes' }
        ]
      },
      {
        text: '🗞 杂货',
        items: [
          { text: 'Git 提交规范', link: '/pages/Groceries/GitCommitConventions' },
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

    //页脚
    footer: {
      message: "Contact me: 1943284256@qq.com",
      // 自动更新时间
      copyright: `©${new Date().getFullYear()} XIA All rights reserved.`,
    },
  }
})
