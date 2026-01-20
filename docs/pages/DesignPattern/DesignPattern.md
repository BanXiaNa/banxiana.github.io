# 设计模式

[![GitHub](https://img.shields.io/badge/GitHub-源码仓库-181717?style=flat-square&logo=github)](https://github.com/BanXiaNa/DesignPattern)
[![Java](https://img.shields.io/badge/Java-实现语言-ED8B00?style=flat-square&logo=java)](https://github.com/BanXiaNa/DesignPattern)

## 📖 概述

>设计模式（Design Pattern）代表了最佳的实践，通常被有经验的面向对象的软件开发人员所采用。设计模式是软件开发人员在软件开发过程中面临的一般问题的解决方案。这些解决方案是众多软件开发人员经过相当长的一段时间的试验和错误总结出来的。

>设计模式是一套被反复使用的、多数人知晓的、经过分类编目的、代码设计经验的总结。使用设计模式是为了重用代码、让代码更容易被他人理解、保证代码可靠性。毫无疑问，设计模式于己于他人于系统都是多赢的，设计模式使代码编制真正工程化，设计模式是软件工程的基石，如同大厦的一块块砖石一样。

## 🔗 相关资源

- **📂 [完整源码](https://github.com/BanXiaNa/DesignPattern)** - 查看所有设计模式的 Java 实现代码
- **📋 [项目说明](https://github.com/BanXiaNa/DesignPattern#readme)** - 详细的项目介绍和使用说明
- **🐛 [问题反馈](https://github.com/BanXiaNa/DesignPattern/issues)** - 提交 Bug 或功能建议

---

## 创建型模式

> 这些设计模式提供了一种在创建对象的同时隐藏创建逻辑的方式，而不是使用 new 运算符直接实例化对象。这使得程序在判断针对某个给定实例需要创建哪些对象时更加灵活。

☑ [工厂模式（Factory Pattern）](CreationalPattern/FactoryPattern/FactoryPattern.md)

☑ [抽象工厂模式（Abstract Factory Pattern）](CreationalPattern/FactoryPattern/FactoryPattern.md)

☑ [单例模式（Singleton Pattern）](CreationalPattern/SingletonPattern/SingletonPattern.md)

☑ [建造者模式（Builder Pattern）](CreationalPattern/BuilderPattern/BuilderPattern.md)

☑ [原型模式（Prototype Pattern）](CreationalPattern/PrototypePattern/PrototypePattern.md)

## 结构型模式

> 这些模式关注对象之间的组合和关系，旨在解决如何构建灵活且可复用的类和对象结构。

☑ [适配器模式（Adapter Pattern）](StructuralPattern/AdapterPattern/AdapterPattern.md)

☑ [桥接模式（Bridge Pattern）](StructuralPattern/BridgePattern/BridgePattern.md)

☑ [过滤器模式（Filter、Criteria Pattern）](StructuralPattern/FilterPattern/FilterPattern.md)

☑ [组合模式（Composite Pattern）](StructuralPattern/CompositePattern/CompositePattern.md)

☑ [装饰器模式（Decorator Pattern）](StructuralPattern/DecoratorPattern/DecoratorPattern.md)

☑ [外观模式（Facade Pattern）](StructuralPattern/FacadePattern/FacadePattern.md)

☑ [享元模式（Flyweight Pattern）](StructuralPattern/FlyweightPattern/FlyweightPattern.md)

☑ [代理模式（Proxy Pattern）](StructuralPattern/ProxyPattern/ProxyPattern.md)

## 行为型模式

> 这些模式关注对象之间的通信和交互，旨在解决对象之间的责任分配和算法的封装。

☑ [责任链模式（Chain of Responsibility Pattern）](BehavioralPattern/ChainOfResponsibilityPattern/ChainOfResponsibilityPattern.md)

☐ 命令模式（Command Pattern）

☐ 解释器模式（Interpreter Pattern）

☐ 迭代器模式（Iterator Pattern）

☐ 中介者模式（Mediator Pattern）

☐ 备忘录模式（Memento Pattern）

☐ 观察者模式（Observer Pattern）

☐ 状态模式（State Pattern）

☐ 空对象模式（Null Object Pattern）

☐ 策略模式（Strategy Pattern）

☐ 模板模式（Template Pattern）

☐ 访问者模式（Visitor Pattern）

## J2EE模式

> 这些设计模式特别关注表示层。这些模式是由 Sun Java Center 鉴定的。

☐ MVC 模式（MVC Pattern）

☐ 业务代表模式（Business Delegate Pattern）

☐ 组合实体模式（Composite Entity Pattern）

☐ 数据访问对象模式（Data Access Object Pattern）

☐ 前端控制器模式（Front Controller Pattern）

☐ 拦截过滤器模式（Intercepting Filter Pattern）

☐ 服务定位器模式（Service Locator Pattern）

☐ 传输对象模式（Transfer Object Pattern）