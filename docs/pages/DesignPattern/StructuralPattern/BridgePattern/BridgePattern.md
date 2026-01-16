# 桥接模式

[![GitHub](https://img.shields.io/badge/GitHub-源码实现-181717?style=flat-square&logo=github)](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/StructuralPattern/BridgePattern)
[![Java](https://img.shields.io/badge/Java-实现语言-ED8B00?style=flat-square&logo=java)](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/StructuralPattern/BridgePattern)

## 📖 概述

**概述：**

如果我们有一个类需要从两个维度去扩展功能，最直接的方法就是创建两个维度乘积的类的数目，但是基于组合优于继承的思想，我们肯定不能这么做，这么做不仅会大大增加类的数目，也会增加开发成本

比如现在有两个手机，OPPO和VIVO手机，两个手机都能启动腾讯云和阿里云，我们这个时候如果采用继承的方式，就会产生四个新类，而且，随着手机和软件的种类越多，这种子类会越来越多，肯定不是最好的解决方案

动动脑子就不难发现，我们可以将两个维度拆开，用一个维度去引用另外一个维度，这样就不用创建这么多的子类了，也不用花费很高的成本进行后期的维护，我们只需要在类变更的时候更改一下引用就可以了

## 🔗 相关资源

- **📂 [完整源码](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/StructuralPattern/BridgePattern)** - 查看桥接模式的完整 Java 实现
- **📋 [项目主页](https://github.com/BanXiaNa/DesignPattern)** - 返回设计模式项目主页

---

## 🔧 栗子

**App：** 作为被桥接的接口，提供功能

**Ali 和 Tencent：** 作为被桥接接口的实现，实现功能

**Phone：** 作为桥接器，引用APP并提供基本操作

**OPPO 和 VIVO：** 作为实现Phone的实现类

## ✅ 优点

显而易见，我们不需要花很多时间去创建过多的子类，只需要在桥接器创建的时候引用抽象的接口就可以了，相当于将抽象和实现分开，提高灵活性