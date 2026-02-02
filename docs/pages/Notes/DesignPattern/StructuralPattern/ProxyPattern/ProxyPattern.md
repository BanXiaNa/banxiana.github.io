# 代理模式

[![GitHub](https://img.shields.io/badge/GitHub-源码实现-181717?style=flat-square&logo=github)](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/StructuralPattern/ProxyPattern)
[![Java](https://img.shields.io/badge/Java-实现语言-ED8B00?style=flat-square&logo=java)](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/StructuralPattern/ProxyPattern)

## 📖 概述

**概述：**

> 在代理模式（Proxy Pattern）中，一个类代表另一个类的功能，这种类型的设计模式属于结构型模式。
>
> 代理模式通过引入一个代理对象来控制对原对象的访问。代理对象在客户端和目标对象之间充当中介，负责将客户端的请求转发给目标对象，同时可以在转发请求前后进行额外的处理。
>
> 在代理模式中，我们创建具有现有对象的对象，以便向外界提供功能接口。

比如，我们要给现在的类加一个权限控制，我们就可以使用代理模式

## 🔗 相关资源

- **📂 [完整源码](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/StructuralPattern/ProxyPattern)** - 查看代理模式的完整 Java 实现
- **📋 [项目主页](https://github.com/BanXiaNa/DesignPattern)** - 返回设计模式项目主页

---

## 🏗️ 静态代理

**概述：**

稍微细考一下就可以做到这一点，我们可以创建一个实现了我们要控制类的接口，然后，让代理类去引用被代理的对象，在实现接口的方法中调用源对象的方法，然后在方法执行前就加上权限控制就可以了，这个和装饰器模式有点类似，但是他们强调的逻辑不一样，后面会讲述

**栗子：**

**IUserService：** 创建一个接口作为代理接口

**UserService：** 继承代理接口，作为被代理的对象

**StaticProxy：** 继承代理接口，引用被代理的对象作为构造的参数

**问题：**

这玩意的问题很明显，我们有多少个接口，就得创建多少个代理对象，这显然不是很健康，而且，接口更新之后，我们就得挨个的更新代理对象，这更不健康了，于是就有了动态代理

## ⚡ 动态代理

**概述：**

是什么东西如此方便且优雅呢，当然是我们JDK的API啦

我们需要写一个继承 InvocationHandler 的类，然后实现它的方法，在里面编写我们要添加的功能，这个方法有三个参数：
**proxy：** 代理对象
**method：** 当前执行的方法
**args：** 当前方法执行的参数

调用的时候使用 Proxy.newProxyInstance 方法，这个方法同样也有一堆的参数：
**loader：** 代理对象的类加载器，一般要被代理对象的类加载器
**interfaces：** 代理对象要实现的接口，同上，也是用被代理对象的
**h：** 我们创建的执行类

然后就可以美美使用了

**栗子：**

**DynamicProxy：** 作为代理对象的执行器，实现 InvocationHandler 接口

## ✅ 优点

优点就是静态的缺点

## ⚠️ 缺点

我们很容易就发现，这玩意只能支持接口代理，这是来自设计的桎梏

## 🔄 和装饰器模式的区别

其实看起来很像，都是往类上添加功能，但是强调的本质还是不一样的，装饰器强调的主要是往类上加东西，扩展本来的功能，比如给订单加一个自动计费的功能，而代理模式更强调控制，比如入参检查，权限校验之类的