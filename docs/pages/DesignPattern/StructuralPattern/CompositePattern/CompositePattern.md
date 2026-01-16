# 组合模式

[![GitHub](https://img.shields.io/badge/GitHub-源码实现-181717?style=flat-square&logo=github)](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/StructuralPattern/CompositePattern)
[![Java](https://img.shields.io/badge/Java-实现语言-ED8B00?style=flat-square&logo=java)](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/StructuralPattern/CompositePattern)

## 📖 概述

**概述：**

这玩意很简单，但是很巧妙，具体的作用就是通过一种树形的方式管理同一种类

比如员工类，我们只需要在原来的类中创建一个这个类的数组，将下一级对象放到这里，进行不断的嵌套，就可以实现树状关系展示

## 🔗 相关资源

- **📂 [完整源码](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/StructuralPattern/CompositePattern)** - 查看组合模式的完整 Java 实现
- **📋 [项目主页](https://github.com/BanXiaNa/DesignPattern)** - 返回设计模式项目主页

---

## 🔧 栗子

**Employee：** 我们在员工类中添加员工类的数组，用于描述等级关系，同样可以添加对应的方法用于操作数组

## ✅ 优点

通过一种巧妙的方式进行树状结构的管理

## ⚠️ 缺点

首先，因为本事使用的是一个类，所以泛化程度比较高，限制类型变的困难

另外，违背了单一职责的原则，子节点可能背负着不属于他的职责

最后：由于庞大的结构，庞大的递归会造成极大的系统开销