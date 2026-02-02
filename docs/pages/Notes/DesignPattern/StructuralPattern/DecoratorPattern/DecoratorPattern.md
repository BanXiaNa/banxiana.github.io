# 装饰器模式

[![GitHub](https://img.shields.io/badge/GitHub-源码实现-181717?style=flat-square&logo=github)](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/StructuralPattern/DecoratorPattern)
[![Java](https://img.shields.io/badge/Java-实现语言-ED8B00?style=flat-square&logo=java)](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/StructuralPattern/DecoratorPattern)

## 📖 概述

**概述：**

>装饰器模式（Decorator Pattern）允许向一个现有的对象添加新的功能，同时又不改变其结构。这种类型的设计模式属于结构型模式，它是作为现有的类的一个包装。
>装饰器模式通过将对象包装在装饰器类中，以便动态地修改其行为。
>这种模式创建了一个装饰类，用来包装原有的类，并在保持类方法签名完整性的前提下，提供了额外的功能。

## 🔗 相关资源

- **📂 [完整源码](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/StructuralPattern/DecoratorPattern)** - 查看装饰器模式的完整 Java 实现
- **📋 [项目主页](https://github.com/BanXiaNa/DesignPattern)** - 返回设计模式项目主页

---

## 🎯 场景

需要通过创建大量子类来扩展类的功能的时候，比如，我们有手机类，然后还想给手机加个壳子的功能，我们就需要创建手机类的数目*壳子类的数目的类才能完成这个工作

需要动态的添加或者撤销对象功能的时候

## 🏗️ 结构

**原来类的接口：** Component

**原来类：** Concrete Component

**抽象装饰器：** Decorator，需要继承原来的接口

**具体的装饰器：** Concrete Decorator：在继承的同时添加功能，在被装饰类被触发前/后触发

## 🔧 栗子

**Phone：** 作为原接口，定义了显示手机的价格和显示手机的功能两个方法

**OPPO 和 VIVO：** 实现原接口，作为被装饰的类

**Shell：** 这是一个继承了手机接口的抽象手机壳类，作为手机壳，足以装饰手机类了

**RedShell 和 YellowShell：** 继承了Shell，增加了新功能

## ✅ 优点

- **低耦合**：装饰类和被装饰类可以独立变化，互不影响。
- **灵活性**：可以动态地添加或撤销功能。
- **替代继承**：提供了一种继承之外的扩展对象功能的方式。

## ⚠️ 缺点

- **复杂性**：多层装饰可能导致系统复杂性增加。