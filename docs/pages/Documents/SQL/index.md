# MySQL 学习笔记

[![MySQL](https://img.shields.io/badge/MySQL-数据库-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![SQL](https://img.shields.io/badge/SQL-查询语言-CC2927?style=flat-square&logo=microsoftsqlserver&logoColor=white)](https://www.mysql.com/)

欢迎来到 MySQL 学习笔记！本文档系统地整理了 MySQL 数据库的核心知识点，从基础到进阶，帮助你全面掌握 MySQL。

---

## 📚 目录导航

### 🎯 基础篇

<div class="doc-links">

#### [01：基础指令](./01：基础指令.md)
- DDL（数据定义语言）
- DML（数据操作语言）
- DQL（数据查询语言）
- DCL（数据控制语言）

#### [02：函数](./02：函数.md)
- 字符串函数
- 数值函数
- 日期函数
- 流程控制函数

#### [03：约束](./03：约束.md)
- 约束类型
- 外键约束
- 外键行为

#### [04：多表查询](./04：多表查询.md)
- 内连接
- 外连接
- 自连接
- 联合查询
- 子查询

</div>

---

### 🚀 进阶篇

<div class="doc-links">

#### [05：事务](./05：事务.md)
- 事务操作
- ACID 特性
- 并发事务问题
- 事务隔离级别

#### [06：存储引擎](./06：存储引擎.md)
- InnoDB
- MyISAM
- Memory
- 引擎选择

#### [07：索引](./07：索引.md)
- 索引结构
- 索引分类
- 索引语法
- 索引使用原则
- 索引设计原则

#### [08：性能分析](./08：性能分析.md)
- SQL 执行频率
- 慢查询日志
- Profile 分析
- Explain 执行计划

#### [09：SQL优化](./09：SQL优化.md)
- 插入优化
- 主键优化
- Order By 优化
- Group By 优化
- Limit 优化
- Count 优化
- Update 优化

</div>

---

### 💎 高级篇

<div class="doc-links">

#### [10：视图](./10：视图.md)
- 视图创建与管理
- 检查选项
- 视图更新
- 视图作用

#### [11：存储](./11：存储.md)
- 存储过程
- 变量
- 流程控制
- 游标
- 条件处理程序
- 存储函数

#### [12：触发器](./12：触发器.md)
- 触发器概念
- 触发器创建
- 触发器管理

#### [13：锁](./13：锁.md)
- 全局锁
- 表级锁
- 行级锁
- 间隙锁与临键锁

#### [14：InnoDB](./14：InnoDB.md)
- 逻辑存储结构
- 架构详解
- 事务原理
- MVCC 机制

</div>

---

### 🔧 运维篇

<div class="doc-links">

#### [15：MySQL管理](./15：MySQL管理.md)
- 系统数据库
- 常用工具

#### [16：日志](./16：日志.md)
- 错误日志
- 二进制日志
- 查询日志
- 慢查询日志

#### [17：主从复制](./17：主从复制.md)
- 主从复制概述
- 复制原理
- 主从搭建

#### [18：分库分表](./18：分库分表.md)
- 拆分策略
- 垂直拆分
- 水平拆分
- Mycat 中间件

</div>

---

## 🎓 学习建议

### 初学者路线
1. 从基础篇开始（01-04）
2. 掌握基本的增删改查操作
3. 理解多表查询和关联关系

### 进阶开发者
1. 重点学习进阶篇（05-09）
2. 深入理解事务和索引
3. 掌握性能分析和优化技巧

### 高级开发者
1. 学习高级篇（10-14）
2. 理解 InnoDB 引擎原理
3. 掌握锁机制和 MVCC

### 运维工程师
1. 重点关注运维篇（15-18）
2. 掌握日志管理
3. 学习主从复制和分库分表

---

## 📖 快速查找

| 想要了解... | 推荐章节 |
|------------|---------|
| 基本 SQL 语法 | 01 基础指令 |
| 如何写复杂查询 | 04 多表查询 |
| 为什么查询慢 | 08 性能分析 |
| 如何优化查询 | 07 索引 + 09 SQL优化 |
| 事务是什么 | 05 事务 |
| 锁的机制 | 13 锁 |
| InnoDB 原理 | 14 InnoDB |
| 数据库备份 | 15 MySQL管理 + 16 日志 |
| 读写分离 | 17 主从复制 |
| 数据量太大 | 18 分库分表 |

---

## 💡 提示

- 每个章节都是独立的，可以按需查阅
- 建议配合实际操作加深理解
- 遇到问题可以查看对应章节的详细说明

---

<style>
.doc-links {
  margin: 1rem 0;
}

.doc-links h4 {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.doc-links h4 a {
  font-size: 1.1rem;
  font-weight: 600;
}

.doc-links ul {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.doc-links li {
  margin: 0.3rem 0;
  color: var(--vp-c-text-2);
}
</style>
