# 责任链模式

[![GitHub](https://img.shields.io/badge/GitHub-源码实现-181717?style=flat-square&logo=github)](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/BehavioralPattern/ChainOfResponsibilityPattern)
[![Java](https://img.shields.io/badge/Java-实现语言-ED8B00?style=flat-square&logo=java)](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/BehavioralPattern/ChainOfResponsibilityPattern)

## 📖 概述

**概述：**

>责任链模式（Chain of Responsibility Pattern）为请求创建了一个接收者对象的链。这种模式给予请求的类型，对请求的发送者和接收者进行解耦。这种类型的设计模式属于行为型模式。
>
>责任链模式通过将多个处理器（处理对象）以链式结构连接起来，使得请求沿着这条链传递，直到有一个处理器处理该请求为止。
>
>责任链模式允许多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系。将这些对象连成一条链，并沿着这条链传递请求。

也就是说，我们可以构造一个链表的结构，这个链表可以对请求进行处理，节点之前互相隔离，请求和处理服务之间通过这个链条解耦，也可以添加上下文来增加联通的功能

## 🔗 相关资源

- **📂 [完整源码](https://github.com/BanXiaNa/DesignPattern/tree/master/DesignPattern/BehavioralPattern/ChainOfResponsibilityPattern)** - 查看责任链模式的完整 Java 实现
- **📋 [项目主页](https://github.com/BanXiaNa/DesignPattern)** - 返回设计模式项目主页

---

## 🔗 单例责任链

**栗子：**

**LogicHandler：** 作为责任链处理器，定义了处理方法

```java
/**
 * @Author BanXia
 * @description: 处理器
 * @Date 2026/1/20 18:47
 */
public interface LogicHandler<T, D, R> {

    /**
     *  处理
     * @param requestParameter 请求参数
     * @param dynamicContext 动态上下文
     * @return 处理结果
     * @throws Exception 处理异常
     */
    R apply(T requestParameter, D dynamicContext) throws Exception;
}
```

**LogicMapper：** 作为责任链的路由，提供了添加下一节点和获取下一节点的方法

```java
/**
 * @Author BanXia
 * @description:
 * @Date 2026/1/20 18:51
 */
public interface LogicMapper<T, D, R> {

    /**
     * 获取规则处理器
     * @param requestParameter 请求参数
     * @param dynamicContext 动态上下文
     * @return 规则处理器
     * @throws Exception 获取规则处理器异常
     */
    LogicHandler<T, D, R> getNext(T requestParameter, D dynamicContext) throws Exception;

    /**
     * 添加规则处理器
     * @param ruleHandler 规则处理器
     * @return 添加结果
     * @throws Exception 添加规则处理器异常
     */
    LogicHandler<T, D, R> addNext(LogicHandler<T, D, R> ruleHandler) throws Exception;
}
```

**AbstractLogicLink：** 作为责任链的抽象类，实现上述两个接口

```java
/**
 * @Author BanXia
 * @description: 抽象责任链类
 * @Date 2026/1/20 19:00
 */
public abstract class AbstractLogicLink<T, D, R> implements LogicHandler<T, D, R>, LogicMapper<T, D, R>{

    private LogicHandler<T, D, R> next;

    @Override
    public LogicHandler<T, D, R> addNext(LogicHandler<T, D, R> ruleHandler) throws Exception {
        return next = ruleHandler;
    }

    @Override
    public LogicHandler<T, D, R> getNext(T requestParameter, D dynamicContext) throws Exception {
        return next;
    }
}
```

**LogicLink1、LogicLink2：** 作为抽象类的实现，实现最后的处理方法

**问题：**

问题显而易见，如果我有两个责任链，而这两个责任链需要同一个节点来处理，而且这两条责任链的下一个节点还不一样，这就会产生问题了，一个节点的next会被改来改去，就废了

于是我们可以用多例责任链

## 🔄 多例责任链

多例责任链的核心就是解耦链路和执行，将这两个分开，我们可以把执行的部分放到列表中，执行的时候遍历这个列表就可以了