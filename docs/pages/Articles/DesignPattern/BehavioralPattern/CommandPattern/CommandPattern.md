# 命令模式

[![GitHub](https://img.shields.io/badge/GitHub-源码实现-181717?style=flat-square&logo=github)](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/BehavioralPattern/CommandPattern)
[![Java](https://img.shields.io/badge/Java-实现语言-ED8B00?style=flat-square&logo=java)](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/BehavioralPattern/CommandPattern)

## 📖 概述

**概述：**

> 命令模式（Command Pattern）是一种数据驱动的设计模式，它属于行为型模式。
>
> 命令模式将一个请求封装为一个对象，从而使你可以用不同的请求对客户进行参数化，对请求排队或记录请求日志，以及支持可撤销的操作。

具体来说，它的目的是将命令的**请求者**和命令的**执行者**相互解耦，也就是加一个中间层。

我们会创建一个接口，它定义了一些命令，然后通过创建实现类来调用具体执行类的方法，请求者就通过调用这个实现类来驱动执行类的方法。

## 🔗 相关资源

- **📂 [完整源码](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/BehavioralPattern/CommandPattern)** - 查看命令模式的完整 Java 实现
- **📋 [项目主页](https://github.com/BanXiaNa/DesignPattern)** - 返回设计模式项目主页

## 🍽️ 简单栗子

**Order：** 作为具体的执行类（Receiver），它提供了一系列基础的方法供命令类使用

**IOrderCommand：** 作为命令类的接口（Command），提供了下订单和撤销订单两个操作

**OrderCommand：** 订单的命令类（ConcreteCommand），实现了 IOrderCommand 接口

## ✅ 优点

- **解耦**：请求者与执行者解耦，请求者不需要知道执行者的具体实现
- **扩展性**：新的命令可以很容易地添加到系统中
- **可撤销**：通过实现 undo 方法，支持撤销操作
- **可组合**：可以将多个命令组合成宏命令
- **可排队**：支持请求排队和日志记录

## ❌ 缺点

- **类膨胀**：每个命令都需要一个具体的命令类，命令太多时会导致类的数量急剧增加
- **复杂度**：增加了系统的复杂性，对于简单的操作可能过度设计

## 💡 适用场景

- 需要将请求调用者和请求接收者解耦
- 需要在不同的时间指定请求、排队请求、执行请求
- 需要支持撤销操作
- 需要支持修改日志