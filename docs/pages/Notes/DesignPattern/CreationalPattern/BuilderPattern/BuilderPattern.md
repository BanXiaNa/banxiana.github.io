# 建造者模式

[![GitHub](https://img.shields.io/badge/GitHub-源码实现-181717?style=flat-square&logo=github)](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/CreationalPattern/BuilderPattern)
[![Java](https://img.shields.io/badge/Java-实现语言-ED8B00?style=flat-square&logo=java)](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/CreationalPattern/BuilderPattern)

## 📖 概述

在开发过程中，我们会遇到比较复杂的对象需要被创建，这里特指需要很多对象组合到一起的复杂对象的创建。
我们发现，这些玩意在创建的过程中，仅仅是因为组合方式不同，就会显得很麻烦。

比如，要创建一个AIClient对象，他就需要一堆的子对象，比如API，模型，顾问，提示词等等等等，我们要做的就是创建这些小零件，然后把他们拼起来。
稍微解构一下就会发现，这任务分为两部分：创建基本部件。组合复杂对象。
我们发现，基本的组件是不会变的，我们可以创建一堆的API，用到那个就调哪个，但是创建出来的对象是变化的，我们没办法预测会用到什么对象，所以我们把这个拆分出来，分别实现。

## 🔗 相关资源

- **📂 [完整源码](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/CreationalPattern/BuilderPattern)** - 查看建造者模式的完整 Java 实现
- **📋 [项目主页](https://github.com/BanXiaNa/DesignPattern)** - 返回设计模式项目主页

---

## 🏗️ 模式角色

建造者模式一般有四个角色：

* **产品（Product）**：最终要创建的复杂对象。

* **抽象建造者（Builder）**：定义创建产品各个部件的抽象接口，通常包含多个 `buildPart()` 方法和一个 `getResult()` 方法。

* **具体建造者（ConcreteBuilder）**：实现抽象接口，负责具体部件的构造逻辑，并保存创建好的对象。

* **指挥者（Director）**：负责安排构建的**步骤顺序**。它不直接操作产品，而是通过 Builder 接口来完成对象的创建。

## 💡 实现示例

**栗子：**

我们现在创建一个电脑对象：computer

他的抽象建造者：ComputerBuilder 实现类：HighEndComputerBuilder、LowEndComputerBuilder

指挥者：Director

最后，调用指挥者的方法，传入指定的建造者实现类，就可以进行建造了。

## ⚠️ 注意事项

**问题：**

模板这玩意看起来很笨重，好像并不能体现自由搭配的效果，如果我们把CPU换成一个具体的CPU类就好很多，全看理解这玩意
有点过度设计的嫌疑了

会多出来很多类

而且，维护很困难，如果有一天，Builder被修改了......

**结尾：**

其实@Builder有点类似这玩意，并且更好用