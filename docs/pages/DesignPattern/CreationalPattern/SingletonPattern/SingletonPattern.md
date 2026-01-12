# 单例模式

[![GitHub](https://img.shields.io/badge/GitHub-源码实现-181717?style=flat-square&logo=github)](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/CreationalPattern/SingletonPattern)
[![Java](https://img.shields.io/badge/Java-实现语言-ED8B00?style=flat-square&logo=java)](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/CreationalPattern/SingletonPattern)

## 📖 概述

有时候我们会有一个提供管理的类，作为工具的类，提供服务的类，这些类我们在使用的时候不需要创建多个，因为会浪费内存，并且我们创建的这一堆类并没有什么不同。
这个时候，我们希望这个类全局只有一个，并且可以访问，就可以用到单例模式了。

## 🔗 相关资源

- **📂 [完整源码](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/CreationalPattern/SingletonPattern)** - 查看单例模式的完整 Java 实现
- **📋 [项目主页](https://github.com/BanXiaNa/DesignPattern)** - 返回设计模式项目主页

---

## 🍽️ 饿汉单例

**概述：**
我们可以在程序加载的时候就创建这个实例，随用随到

**栗子：**
HungerSingleton：懒汉单例，私有化一个构造函数，使其不能被创建，然后提供一个静态方法，返回一个实例

**问题：**
程序启动的时候加载示例，如果没有被使用，那么就会造成内存的浪费，所以我们可以随用随加载，这就是懒汉实例

## 😴 懒汉单例 线程不安全

**概述：**
我们在第一次使用时创建这个实例，而不是在程序启动的时候就创建

**栗子：**
LazySingletonUnsafe：一开始不创建对应的实例，而是在调用getInstance的时候创建

**问题：**
如你所见，饿汉的 getInstance 方法是原子化的，所以线程安全
懒汉的 getInstance 方法有两个问题：
    第一是if的逻辑不是原子的
    第二是new可能会被JVM重排，可能会访问到没有分配的空间
线程不安全，多个线程可能会创建多个实例，就会出问题

## 🔒 懒汉单例 线程安全

**概述：**
解决if不是原子性的方法比较简单，加个锁：synchronized 
注意，这个synchronized不能直接加在方法上，因为会降低性能，需要加在里面，具体可以看栗子
解决new排序的问题也很简单，加个 volatile

**栗子：**
LazySingletonSafe：线程安全
使用 synchronized 加载方法上固然简单，但是每次调用这个方法就进行一次加锁解锁，太耗费性能，效率不高，我们可以把他写在方法的if内部，也就是仅仅对创建对象的语句进行加锁
在具体点可以看代码

## 💡 实现要点

- **双重检查锁定**：既保证线程安全，又提高性能
- **volatile 关键字**：防止指令重排序
- **私有构造函数**：防止外部直接实例化
- **静态内部类**：另一种优雅的懒加载实现方式