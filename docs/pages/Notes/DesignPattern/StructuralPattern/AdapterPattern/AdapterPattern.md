# 适配器模式

[![GitHub](https://img.shields.io/badge/GitHub-源码实现-181717?style=flat-square&logo=github)](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/StructuralPattern/AdapterPattern)
[![Java](https://img.shields.io/badge/Java-实现语言-ED8B00?style=flat-square&logo=java)](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/StructuralPattern/AdapterPattern)

## 📖 概述

**概述：**

有时候我们希望使用的接口并不是已经提供好的接口，但是功能类似，就像内存卡不能直接插到只有USB的电脑一样，适配器模式就是充当这个读卡器的存在

首先要明确的是，我们要对两个接口做适配，这里拿USB的 TypeC To TypeA 来举例子，就像扩展坞一样

我们创建接口：TypeA、TypeC和他们的实现类，来模拟两个不同的接口

## 🔗 相关资源

- **📂 [完整源码](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/StructuralPattern/AdapterPattern)** - 查看适配器模式的完整 Java 实现
- **📋 [项目主页](https://github.com/BanXiaNa/DesignPattern)** - 返回设计模式项目主页

---

## 🏗️ 类适配器

通过创建一个继承TypeC的功能并且实现TypeA的类来达到适配的目的

**栗子：**

创建 ClassAdapter 对象，让他继承 TypeC 的实现类，然后去实现 TypeA 的接口，然后在实现的方法里调用继承自 TypeC 的方法就可以了

## 🔧 对象适配器

OK，如果你嫌弃类适配器要做继承还要做实现太麻烦的话，反正目的是调用TypeC的方法，我直接在适配器里面声明一个TypeC 的对象不就行了

**栗子：**

创建 ObjectAdapter 类，实现 TypeA 方法，在类内部，声明一个TypeC的实现类，然后调用方法

当然我们可以更加灵活一点，在适配器的构造方法传入 TypeC的对象更棒

## ⚙️ 接口适配器

有时候我们并不需要对TypeC的所有方法都实现，这些不需要实现的方法也不会被用到。但是前面二者显然不能做到这一点，我们可以创建一个抽象类，对TypeA的所有方法提供一个空方法，然后这个抽象类的子类就可以选择性的实现这些方法

**栗子：**