# 过滤器模式

[![GitHub](https://img.shields.io/badge/GitHub-源码实现-181717?style=flat-square&logo=github)](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/StructuralPattern/FilterPattern)
[![Java](https://img.shields.io/badge/Java-实现语言-ED8B00?style=flat-square&logo=java)](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/StructuralPattern/FilterPattern)

## 📖 概述

**概述：**

过滤器模式又叫标准模式，旨在通过一定的逻辑将一组对象转换成我们想要的样子，比如过滤查找条件，将每一步过滤条件组件化，进行解耦，来获得标准对象

其实这玩意是责任链模式的雏形，这个稍微加工一下就是责任链模式

## 🔗 相关资源

- **📂 [完整源码](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/StructuralPattern/FilterPattern)** - 查看过滤器模式的完整 Java 实现
- **📋 [项目主页](https://github.com/BanXiaNa/DesignPattern)** - 返回设计模式项目主页

---

## 🔧 栗子

**person：** 作为被过滤的类，也就是物料

**Criteria：** 过滤节点的接口，定义一个方法用于过滤物料

**NameCriteria 和 AgeCriteria：** 实现Criteria，分别进行名字年龄的过滤

## ✅ 优点

显而易见，我们可以不断的实现过滤接口，进行对物料的过滤，封装性好，灵活性也高