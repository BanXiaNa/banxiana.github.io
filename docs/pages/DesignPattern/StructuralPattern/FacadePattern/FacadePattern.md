# 外观模式

[![GitHub](https://img.shields.io/badge/GitHub-源码实现-181717?style=flat-square&logo=github)](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/StructuralPattern/FacadePattern)
[![Java](https://img.shields.io/badge/Java-实现语言-ED8B00?style=flat-square&logo=java)](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/StructuralPattern/FacadePattern)

## 📖 概述

**概述：**

外观模式就是给用户暴露出一些简单的接口，用于隐藏系统内部的复杂逻辑功能。我们一般将用户打包成一个独立的包，用于RPC远程调用。

## 🔗 相关资源

- **📂 [完整源码](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/StructuralPattern/FacadePattern)** - 查看外观模式的完整 Java 实现
- **📋 [项目主页](https://github.com/BanXiaNa/DesignPattern)** - 返回设计模式项目主页

---

## 🔧 栗子

**IService：** 作为系统内部的接口，供门面调用

**Service：** 作为系统内部接口的实现类，实现具体复杂的功能。

**IFacade：** 作为门面层的接口，用户只需要知道这个接口就可以了

**Facade：** 作为门面接口的实现类，负责去调用系统内部的功能

## ✅ 优点

隐藏系统内部逻辑,只暴露必要的操作

## ⚠️ 缺点

违反开闭原则，对系统内部的修改可能会对外观产生修改。