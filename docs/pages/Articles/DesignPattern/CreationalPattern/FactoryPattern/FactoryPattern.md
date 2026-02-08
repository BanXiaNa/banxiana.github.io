# 工厂模式

[![GitHub](https://img.shields.io/badge/GitHub-源码实现-181717?style=flat-square&logo=github)](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/CreationalPattern/FactoryPattern)
[![Java](https://img.shields.io/badge/Java-实现语言-ED8B00?style=flat-square&logo=java)](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/CreationalPattern/FactoryPattern)

## 📖 概述

简而言之：
在一个项目中，创建同一个类的代码可能均匀地分布在很多类中，如果这个类发生了改变，比如入参改变，我们就需要更改每一个创建类的代码，麻烦而且不优雅。
所以就可以创建一个专门创建别的类的类，我们把这个类称之为工厂类。

## 🔗 相关资源

- **📂 [完整源码](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/CreationalPattern/FactoryPattern)** - 查看工厂模式的完整 Java 实现
- **📋 [项目主页](https://github.com/BanXiaNa/DesignPattern)** - 返回设计模式项目主页

---

## 🏭 简单工厂模式 [Simple Factory Pattern]

**概述：**
我们要创建奖品的对象，有三个奖品，就可以创建一个奖品工厂来专门创建这三个奖品的对象

**栗子：**
奖品对象：po 下的三个类，他们都实现Prize接口
简单工厂类： factory下的类

**问题：**
如果我们要添加一个四等奖，我们就必须修改工厂类，这很显然是不健康的，违背了开闭原则。下面的工厂方法模式就可以解决这个问题

## ⚙️ 工厂方法模式 [Factory Method Pattern]

**概述：**
通过创建一个工厂的接口，提供一个创建具体对象的方法，让子类决定创建什么产品实例。

**栗子：**
奖品对象：我们创建了两种奖品对象，分别是CCPC奖品和ICPC奖品
工厂类：我们创建了CCPC奖品工厂和ICPC奖品工厂，他们都实现的奖品工厂接口，并实现创建具体奖品对象的方法

**好处：**
这样要创建新的类的时候，就不需要修改工厂类，只需要创建新的工厂类，就可以创建新的奖品对象了

**问题：**
如果我们要颁发CCPC的奖品，我们就创建一个CCPC的工厂，但是如果我们的工厂因为不可抗力发生变化了，我们的使用者也会跟着发生变化，这显然不优雅，抽象工厂方式可以解决这个问题

## 🏗️ 抽象工厂模式 [Abstract Factory Pattern]

**概述：**
定义一个接口用于创建工厂，然后通过挑选工厂去创建对应的类

**栗子：**
奖品对象：我们在po目录下创建了两个产品族，ACM文件夹下有ACM的一等奖、二等奖、三等奖，OI文件夹下有OI的一等奖、二等奖、三等奖，它们都实现Prize接口

抽象工厂接口：IFactory接口定义了创建产品族的方法

具体工厂类：ACMFactory专门创建ACM系列的奖品，OIFactory专门创建OI系列的奖品

主工厂类：Factory类根据PrizeType的竞赛类型选择对应的具体工厂

**好处：**
- 保证了产品族的一致性：使用ACM工厂创建的都是ACM系列产品
- 易于扩展产品族：要添加新的竞赛类型（如NOI、蓝桥杯），只需要创建新的产品族和对应的工厂
- 客户端代码与具体产品解耦：客户端只需要知道抽象工厂接口，不需要关心具体的产品实现

**使用场景：**
当系统需要创建一系列相关或相互依赖的对象时，比如不同品牌的UI组件、不同数据库的连接组件等

## 💭 总结

说实话这玩意真复杂，但是思想就是这么个思想
可以搭配Spring的自动装配，把工厂放到一个Map里面，通过一个另外的工厂类导出来就可以用了