# 享元模式

[![GitHub](https://img.shields.io/badge/GitHub-源码实现-181717?style=flat-square&logo=github)](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/StructuralPattern/FlyweightPattern)
[![Java](https://img.shields.io/badge/Java-实现语言-ED8B00?style=flat-square&logo=java)](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/StructuralPattern/FlyweightPattern)

## 📖 概述

**概述：**

如果我们的系统中存在这很多相同的类，这些类的堆积可能会造成内存的溢出，我们就可以使用享元模式进行对类对象的管理。

享元就是共享元素，我们可以将一些可以重复利用的数据或者是创建/开销太大的类保存起来，谁要用就分配给谁，防止开销太大造成太大的压力

核心就是创建一个Map对象用来管理这些类，然后通过一个工厂来获取这些对象，如果有就拿出来返回，没有的就进行创建

## 🔗 相关资源

- **📂 [完整源码](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/StructuralPattern/FlyweightPattern)** - 查看享元模式的完整 Java 实现
- **📋 [项目主页](https://github.com/BanXiaNa/DesignPattern)** - 返回设计模式项目主页

---

## 🔧 栗子

**GraphicsCard：** 作为抽象享元，提供一个接口用于定义方法，这里采用显卡

**NVIDIA：** 作为具体享元，实现接口，其有一定的唯一标识，这里用型号，方便后续享元工厂操作

**Shop：** 作为享元工厂，其内部维护一个HashMap，用于将前面提到的唯一标识符作为K，将对象存储起来，需要加载这种对象的时候，需要从享元工厂中通过标识符进行获取，Map有就返回，没有就进行创建后返回

## ✅ 优点

显而易见，这玩意通过共享，减小了内存开销，提高了创建对象的效率

## ⚠️ 缺点

处理不当可能会引发线程安全问题