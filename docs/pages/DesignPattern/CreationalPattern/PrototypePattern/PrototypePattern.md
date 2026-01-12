# 原型模式

[![GitHub](https://img.shields.io/badge/GitHub-源码实现-181717?style=flat-square&logo=github)](https://github.com/BanXiaNa/DesignPattern/tree/master/CreationalPattern/PrototypePattern)
[![Java](https://img.shields.io/badge/Java-实现语言-ED8B00?style=flat-square&logo=java)](https://github.com/BanXiaNa/DesignPattern/tree/master/CreationalPattern/PrototypePattern)

## 📖 概述

先说这玩意干啥用的：当我们有一个非常复杂的对象需要被频繁的创建的时候，比如这个对象的创建需要持久层的大量配合，显而易见，这种玩意创建比较消耗资源，我们可以先创建一个出来，然后通过拷贝，复制出一个一模一样的类供别的类使用，以减少重新创建这个类的消耗。

听起来很简单，就是需要一个对象的时候，就发送出去一个复制体就行了呗。
实际也很简单，就是需要理解深拷贝和浅拷贝的区别而已。

## 🔗 相关资源

- **📂 [完整源码](https://github.com/BanXiaNa/DesignPattern/tree/master/CreationalPattern/PrototypePattern)** - 查看原型模式的完整 Java 实现
- **📋 [项目主页](https://github.com/BanXiaNa/DesignPattern)** - 返回设计模式项目主页

---

## 🔍 核心概念

### 深拷贝 vs 浅拷贝

深拷贝和浅拷贝的区别就是对于引用对象是否被重新创建，显而易见，重新创建引用对象更加"深"，这里也是使用深拷贝作为类的复制方法。

## 💡 实现示例

**栗子：**

**Order**：我们让这个类继承 `Cloneable` 接口以获得克隆的能力，然后我们写一个克隆的方法，返回这个类的克隆对象，这听起来很简单，有了克隆的能力之后，直接返回 `super.clone()` 岂不是美滋滋。

然而这种方式是浅拷贝，也就是引用对象没有被真正的复制，如果更改了副本的引用对象，原型的引用也会被更改，这在一些情况下是不被允许的，所以我们可以对引用对象再进行克隆，这是最...高效的方法（？

## ✨ 模式优势

- **🚀 性能提升**：避免重复的复杂对象创建过程
- **🔒 数据保护**：只允许拿到副本进行更改而不破坏原型
- **💾 资源节约**：减少持久层交互和资源消耗
- **🎯 只读实现**：通过副本机制实现对象的只读访问

## 🎯 适用场景

- 对象创建成本较高（如需要数据库查询、网络请求等）
- 需要频繁创建相似对象
- 需要保护原始对象不被修改
- 系统需要独立于产品的创建、构成和表示

## 💭 总结

这玩意能大幅度提升某些场景下类的构建效率，而且只允许拿到副本进行更改而不破坏原型的方式也是对只读的一种实现。