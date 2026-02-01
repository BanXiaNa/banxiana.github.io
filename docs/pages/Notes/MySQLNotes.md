# MySQL 学习笔记

[![MySQL](https://img.shields.io/badge/MySQL-数据库-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![SQL](https://img.shields.io/badge/SQL-查询语言-CC2927?style=flat-square&logo=microsoftsqlserver&logoColor=white)](https://www.mysql.com/)

---

# CMD 指令

```cmd
mysql -u root -p
```

---

# SQL 指令分类

​	**DDL**：数据定义语言，用来定义数据库对象（数据库，表，字段）
​	**DML**：数据操作语言，用来对数据库表的数据进行增删改
​	**DQL**：数据查询语言，用来对数据库表的数据进行查询
​	**DCL**：数据控制语言，用来创建用户，维护权限

---

# DDL：

## 查询所有数据库

```mysql
show databases;
```

---

## 查询使用数据库

```mysql
select database();
```

---

## 创建数据库	

```mysql
create database [if not exists] [数据库名称] [default charset 字符集] [collate 排序方式] ;
```

[if not exists]：查看数据库是否存在，如果存在就创建数据库，不存在就不创建，防止数据库已经存在然后报错
[default charset 字符集]：常用字符集：utf8mb4
[collate 排序方式]：默认排序方式

---

## 删除数据库

```mysql
drop database [if exists] 数据库名称;
```

[if exists]：查询数据库是否存在，如果存在就删除，不存在就不删除，防止数据库不存在就报错

---

## 使用数据库

```mysql
use 数据库
```

---

## 查询表

```mysql
show tables;
```

---

## 创建表

```mysql
create table 表名(
		字段1 字段1类型 [comment 注释],
		...
		字段n 字段n类型 [comment 注释]
		)[comment 注释];
```

---

## 查询表信息

```mysql
desc 表名;
```

---

## 查询建表语句

```mysql
show create table 表名;
```

---

## 修改表名

```mysql
alter table 旧表名 rename to 新表名;
```

---

## 添加字段

```mysql
alter table 表名 add 字段名 类型 [comment 注释] [约束];
```

---

## 修改字段数据类型

```mysql
alter table 表名 modify 字段名 类型 [comment 注释] [约束];
```

---

## 修改字段名和数据类型

```mysql
alter table 表名 change 旧字段名 新字段名 类型 [comment 注释] [约束];
```

---

## 删除表

```mysql
drop table [if exists] 表名;
```

---

## 格式化表

```mysql
truncate table 表名称;
```

---

# DML：

## 给指定字段添加数据

```mysql
insert into 表名 [(字段1,字段2,......,字段n)] values (数据1,数据2,......,数据n)[，(数据1,数据2,......,数据n)，(数据1,数据2,......,数据n)];
```

**(字段1,字段2,......,字段n)**：表示给指定字段添加信息，缺省默认为所有字段。

**[，(数据1,数据2,......,数据n)，(数据1,数据2,......,数据n)]**：表示同时添加多个数据

**注意**：字符串和日期要用单引号括起来。

---

## 修改字段数据

```mysql
update 表名称 set 字段名称 = 新数据[,字段名称 = 新数据] where [筛选条件];
```

可以修改多个字段，用逗号隔开。
筛选条件缺省默认为整张表的数据。

---

## 删除数据

```sql
delete from 表名 where [筛选条件];
```

---

# DQL：

查询指令较多且复杂，通过模块化来讲解。

---

## 基本格式

**select [distinct] 字段区 from 表名称 [分组区] [排序区] [分页区] [where 判断条件];**

**distinct**：去重查询

---

## 字段区：

### 普通字段

字段1 [[as] 别名1],字段2 [[as] 别名2],字段3 [[as] 别名3]...
字段名称可以用通配符*表示

### 聚合函数

将字段的一列数据作为一个整体，进行纵向计算
格式：聚合函数(字段名)
计数：count
平均数：avg
最大/小：max/min
求和：sum

---

## 分组区

**分组查询**：通过一个字段将表划分成不同的组，然后进行查询

group by 分组字段 [having 判断依据]

**having**：判断依据：他的优先级要后于where

---

## 排序区

order by 排序依据的字段 排序规则 [,排序依据的字段 排序规则];

如果有多个排序依据，则遵循优先规则

### 排序规则：
****

升序：缺省默认 asc
降序：desc

---

## 分页区

limit x,y;

x : 从第几行开始
y : 每页显示的数目

小细节 x = y*(页数-1)

---

## **判断条件**：

基础的运算符
区域筛选：between 小值 and 大值
精准匹配：in (值)
模糊匹配：like(' _ 或者 %')
支持逻辑运算符

---

# DCL：

用户一般存放在mysql数据库中的 user表中

---

## 创建用户

```mysql
create user '用户名'@'主机名' identified by '密码';
```

主机名通配符 %
本地主机名 localhost

---

## 修改密码

```mysql
alter user '用户名'@'主机名' identified with mysql_native_password by '新密码';
```

---

## 删除用户

```mysql
drop user '用户名'@'主机名';
```

---

## 权限

| 所有权限           | all    |
| ------------------ | ------ |
| 查询数据           | select |
| 插入数据           | insert |
| 修改数据           | update |
| 删除数据           | delete |
| 修改表             | alter  |
| 删除数据库/表/视图 | create |

---

## 查询权限

```mysql
show grants for '用户名'@'主机名';
```

---

## 授予权限

```mysql
grant all on 数据库名.表名 to '用户名'@'主机名';
```

---

## 撤销权限

```mysql
revoke all on 数据库名.表名 from '用户名'@'主机名';
```

---

# 函数

## 字符串函数

### 聚合

```mysql
concat('字符串','字符串','字符串');
```

函数可以传入多个字符串，最后输出一个字符串

---

### 小写

```mysql
lower('字符串');
```

---

### 大写

```mysql
upper('字符串');
```

---

### 左/右填充

```mysql
select l(r)pad(源字符串,最终长度,填充字符串);
```

---

### 规整字符串

```mysql
select trim(字符串);
```

---

### 输出字串

```mysql
select substring(字符串,开始位置,字串长度);
```

小提示：开始位置是1

---

## 数值函数：

### 向上取整

```mysql
ceil(x);
```

---

### 向下取整

```mysql
floor(x);
```

---

### 取模

```mysql
mod(x/y);
```

---

### 返回0-1的随机数

```sql
rand();
```

---

### 返回x四舍五入的值，保留y位小数

```mysql
round(x,y);
```

---

## 日期函数：

### 当前日期

```mysql
curdate();
```

---

### 当前时间

```mysql
curtime();
```

---

### 当前日期和时间

```mysql
now();
```

---

### 当前date的年份

```mysql
year(date);
```

---

### 当前date的月份

```mysql
month(date);
```

---

### 当前date的日期

```mysql
day(date);
```

### 当前date之后的时间

```mysql
date_add(date,interval 数目 时间单位);
```

**时间单位**：年：year 月：month 日：day

---

### 起止时间差

```mysql
datediff(date1,date2);
```

---

## 流程控制函数：

### 三目运算符

```mysql
if(bool,值1,值2);
```

---

### 检测空的三目运算符

```mysql
ifnull(检测字段,缺省字符串);
```

如果检测的字符串为空的话，就返回缺省字符串

---

### 多分支语句

####  布尔匹配型

```mysql
case when bool then 返回字段 [when bool  then 返回字段] else 保底字段 end;
```

本质就是如果bool为真，就返回相应的字段，else是都不符合就返回的保底返回字段
相当于if - else if - else 组合

---

#### 值匹配型

case 字段

```mysql
case 字段 when 检测字段 then 返回字段 [when 检测字段 then 替换字段] else 兜底字段 end;
```

本质就是如果字段和检测字段相匹配的话，就返回对应的字段，else是都不符合就返回相同保底的字段
相当于Switch - case - final 语句

---

# 约束

约束表中的字段，用于限制表中存储数据的规范
目的是保证数据存储的的规范，保证其有效

---

## 约束类型：

| 约束名   | 详细                                                         | 字段        |
| -------- | ------------------------------------------------------------ | ----------- |
| 非空约束 | 添加字段的数据不能是空的                                     | not null    |
| 唯一约束 | 保证添加字段的数据不能重复                                   | unique      |
| 默认约束 | 保存数据时，如果存在没指定的值，则采用默认值<br />注意：如果传递值为null的话，则不采用默认值，采用null | default     |
| 检查约束 | 保证字段的值满足一定条件                                     | check       |
| 主键约束 | 主键是一行数据的唯一标识，有且只能存在一个                   | primary key |
| 外键约束 | 用来在两张表的数据之间建立连接，保证数据的一致性             | foreign key |

---

## 外键约束

用来在两张表的数据之间建立连接，保证数据的一致性，完整性。
我们一般使用外键去关联主键，外键隶属主键，主键受外键制约

### 添加外键

```mysql
alter table 外键表表名 add constraint 外键名称 foreign key (字段名) references 主表(主表字段名);
```

除了用单独的指令，也可以在创建表时就指定外键：

```mysql
CREATE TABLE 表名 (
    列1 数据类型,
    列2 数据类型,
    ...
    [CONSTRAINT 外键名称] FOREIGN KEY (列名) REFERENCES 另一个表名(另一个表的列名)
);
```

---

### 删除外键

```mysql
alter table 外键表 drop foreign key 外键名称;
```

---

## 外键行为：

| 默认行为 | 如果父表的主键绑定了副键，则禁止进行更改             | no action / restrict |
| -------- | ---------------------------------------------------- | -------------------- |
| 级联行为 | 如果父表的主键被修改，副键也会一同被修改             | cascade              |
| 置空行为 | 如果主键被删除，则副键会被置为null（如果他允许的话） | set null             |
| 缺省行为 | 主键变更，副键设为缺省值。                           | set default          |

---

### 指令

    ~~~（添加外键指令）+ on update 行为 on delete 行为;

---

# 多表查询

可以查询多张有关联的表结构，会产生大量的无效的笛卡尔积

---

## 内连接

分为显式内连接和隐式内连接。

### 隐式内连接

```mysql
select 查询字段 from 表1,表2 where 通常是主副键的一致性;
```

利用主副键的一致性进行筛选无效的笛卡尔积

### 显式内连接

```mysql
select 查询字段 from 主表 inner join 副表 on 筛选条件 where 筛选条件;
```

---

## 外连接

分为左外连接和有右连接，会分别完全显示这个表的内容，即使另外一个表没有所对应的信息

左外连接：以左表为主表

```mysql
select 查询字段 from 主表 left join 副表 on 筛选条件 where 筛选条件;
```

右外连接：以右表为主表

```mysql
select 查询字段 from 副表 right join 主表 on 筛选条件 where 筛选条件;
```

---

## 自连接

自己和自己进行筛选，可以内连接，也可以外连接
select 查询字段 from 表1 别名1 , 表1 别名2 where 筛选条件;

---

## 联合查询

可以塞在两个查询语句中间，使得结果进行简单的合并：union all
缺点很明显，就是这个只能进行简单的结果的叠加，不能去重，那么，怎么解决呢----去掉all
限制：所合并的查询的字段必须相同

---

## 子查询

子查询是指嵌套在其他语句中的查询语句
子查询可以嵌套在insert,update,delete,select中
根据结果不同，可以分为四类：

| 标量子查询 | 子查询结果为单个的值 |
| ---------- | -------------------- |
| 列子查询   | 子查询结果为一列     |
| 行子查询   | 子查询结果为一行     |
| 表子查询   | 查询结果为多行多列   |

---
### 标量子查询

用于查询查询一个数据之后的查询，可以放在where后，记得要加括号

```mysql
select 字段 from 主表 where (select 字段 from *表 where 匹配条件) = 匹配条件;
```

常用操作符：算数运算符进行比较

---

### 列子查询

返回结果是一列
常用操作符：in，not in，any，sum，all
	(not) in : (不)在
	any 子查询返回的列表中，有任意一个满足条件就好
	some 和any一样，二者通用
	all 子查询返回的所有列表值都必须全部满足

---

### 行子查询

返回一行
常用操作符 = != (not)in

```mysql
select 字段名 from 表名 where (字段1,字段2...字段n) = (select 字段1,字段2...字段n from 表名 where 判断条件);
```

本质就是用括号将多个字段整合到一起，进行判断是否符合

---

### 表子查询

主要对多行多列的表进行查询
常用操作符：in

```mysql
select 字段名 from 表名 where (字段1,字段2...字段n) in (select 字段1,字段2...字段n from 表名 where 判断条件);
```

---

# 事务

定义：事务是一堆操作的集合，在操作时，一般一齐提交给系统进行处理，所以这些操作一般会一起成功或者一起失败
如果中途失败的话，就要进行事务的回滚，一般事务会默认自动提交

## 事务操作

### 查看事务提交方式

```mysql
select @@autocommit;
```

 默认提交方式是1：自动提交
	0：手动提交

### 提交事务

commit;

### 回滚事务

rollback;

---

## 四大特性（ACID）

​    原子性：事务是不可分割的最小操作单元，要么全部成功，要么全部失败
​		 如果执行结果不一致，就会导致数据不一致，数据库的数据就会出错
​    一致性：事务完成时，必须使所有数据保持一致状态
​    隔离性：数据库系统提供隔离特性，保证事务不受外部并发操作影响的独立环境执行
​    持久性：事务一旦提交或者回滚，对数据库的数据的改变就是永久的

---

## 并发事务问题：

​    数据库涉及数据的修改还有操作的并发，就会产生一些常见问题，常见的：脏读，不可重复读，幻读
​    脏读：一个事务读取到另外一个事务没有提交的数据
​    不可重复读：一个事务先后读取同一条记录，但读取到的数据不相同
​    幻读：一个事务在读取一行数据时，数据不存在，但是插入时，数据又存在了

---

## 事务的隔离级别：

为了防止并发产生的问题，MYSQL设计了一系列的隔离等级
越安全的隔离方式，性能越低

| 事务隔离级别          | 脏读 | 不可重复读 | 幻读 |
| --------------------- | ---- | ---------- | ---- |
| read uncommitted      | 1    | 1          | 1    |
| reda committed        | 0    | 1          | 1    |
| repeatable read(默认) | 0    | 0          | 0    |
| serializable          | 0    | 0          | 0    |

0代表不会发生

**Repeatable Read**：可重复读

​	确保了在同一事务中多次读取相同记录的结果是一致的。
​	可以通过在读取记录时对其加锁来实现的，一旦某个事务读取了某条记录，那么在该事务完成之前，其他事务是无法修改该记录的。
​	Mysql使用了MVCC来实现这个操作，数据在被读取时会被创建一个快照，当这个事务中的其他读取操作进行时，只能读取到当前快	照的数据，从而保证了可重复读的特性，又不会导致阻塞

### 查看事务隔离级别

```mysql
select @@transaction_isolation;
```

### 修改事务的隔离级别

```mysql
set 范围 transaction isolation level {read uncommitted , reda committed , repeatable read , serializable} ;
```

范围：session 设置当前会话窗口
	global 对全部的会话窗口有效

---

# 存储引擎

是存储数据，建立索引，更新，查询数据等技术的实现方式
存储引擎是基于表层次的，所以也可以算作表类型
MYSQL有很多存储引擎，不存在最好的操作引擎，各种引擎适用于不同的数据存储场合
如果在建立表的时候没有指定存储引擎，则会选择默认引擎：InnoDB

## 指定存储引擎

```mysql
create table 表名称 (
    ... ...
    ...
    )engine = 引擎名称;
```

---

## 查看SQL当前可使用引擎

```mysql
show engines;
```

---

## 存储引擎特点

### InnoDB：兼顾高性能和高可靠性

DML操作遵循ACID模型，支持事务
行级锁，提高并发性能
支持外键FOREIGN KEY约束，保证数据完整性和可靠性
会创建 表名.ibd 文件，存储表结构，数据，索引

---

## MyISAM：早期的默认引擎

不支持事务，不支持外键。
支持表锁，不支持行锁
访问速度快
会创建 .MYD .MYI .sdi
	.MYD 存储数据
	.MYI 存储索引
	.sdi 存储表结构和信息

---

## Memory：此引擎将数据存放在内存中，所以断电后数据会丢失，所以只能作为临时表使用

访问速度快
支持hash索引
创建 .sdi 文件 存放表结构信息

---

## 引擎选择

对事务的完整性要求较高，在并发情况下要求数据一致的情况下选择InnoDB
对数据的插入和读取为主：MyISAM
访问速度快，存储数据量小：Memory

---

# 索引

在数据日益增多，数据库会变得越来越臃肿，查询的成本也逐步提高，为了降低查询成本，出现了索引
索引是一种用于查询的有序的数据结构

优点：
	可以高效的查询数据，降低IO成本
	通过索引排序，降低CPU消耗

缺点：
	索引需要空间
	降低更新效率

---

## 索引结构

| 索引结构                  | 描述                                       |
| ------------------------- | ------------------------------------------ |
| B+Tree                    | 最常见的索引结构，大部分引擎支持           |
| Hash索引                  | 使用哈希表实现，不支持范围查询             |
| R-Tree索引（空间索引）    | 特殊类，通常用在地理类型的数据上，使用较少 |
| Full-Text索引（全文索引） | 是一种通过建立倒排索引，快速匹配文档的方式 |

---

## 支持情况

![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/%E5%BC%95%E6%93%8E%E6%94%AF%E6%8C%81%E7%B4%A2%E5%BC%95%E6%83%85%E5%86%B5.png)

---

## 索引分类

![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/%E7%B4%A2%E5%BC%95%E5%88%86%E7%B1%BB.png)

**主键索引**：如果创建主键列，就自动创建主键索引
**唯一索引**：避免值重复，如果字段有唯一约束，就会创建唯一索引
**常规索引**：特指的，快速定位数据
**全文索引**：阿巴阿巴

### 存储形式分类

![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/%E7%B4%A2%E5%BC%95%E7%9A%84%E5%AD%98%E5%82%A8%E7%BB%93%E6%9E%84%E5%88%86%E7%B1%BB.png)

主要是通过叶子结点存储的数据区的内容分类的
聚集索引的data区存储的是整行的数据，指针区是id，
但是，查找并不会一直通过查找主键来确定一行数据，也不能将每一个字段做成一个聚集索引，会导致行数据被多次存储，浪费空间
所以就出现了二级索引，二级索引的叶子结点是id，指针可以是各行数据，通过二级索引我们可以找到对应的id，就可以再通过聚集索引来查找数据，这就是为什么聚集索引叫做聚集索引

问题出现了：如果一个表没有主键字段，不就不能生成聚集索引了吗？
![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/%E8%81%9A%E9%9B%86%E7%B4%A2%E5%BC%95%E9%80%89%E5%8F%96%E8%A7%84%E5%88%99.png)

超级数据库提供了超级方法！！！

---

## 索引语法

### 创建

```mysql
create [unique | fulltext] index Index_name on Table_name (index_col_name [,...]);
```

**unique**：唯一索引，该字段必须有唯一字段标志
**fulltext**：全文索引
	如果二者都没有，就会默认创建一个常规索引
**Index_name**：索引名称
**Table_name**：表名称
**index_col_name**：字段名称，可以关联多个字段，如果没关联，就被称为单列索引，关联了就被称为组合索引，多列索引

---

### 查看

```mysql
show index from Table_name;
```

可以查看整张表的索引

---

### 删除

```mysql
drop index Index_name on table_name;
```

删除指定表的指定索引

---

# 性能分析

## 查询SQL语句使用频率

```mysql
show [global | session] status like 'com_______';
```

**globle**：全局
**session**：当前会话

---

## 慢查询日志

对于那些超过了指定默认运行时间的指令，SQL会记录到慢查询日志中，通过查询这个日志，我们可以针对性的对其进行头花

### 查看慢查询日志是否打开

```mysql
show variables like 'slow_query_log';
```

### 打开日志

/etc/my.cnf文件下添加

```
# 慢查询日志开启
low_query_log=1
# 设置超时时间
long_query_time=2
```

日志名称：localhost-show.log

---

## Profile

慢查询日志只能记录超过限定时间的SQL，不能查询所有语句的耗时，Profile就可以满足

### 查看是否支持profile操作

```mysql
select @@have_profiling;
```

---

### 查看是否开启

```mysql
select @@profiling;
```

---

### 开启profile

```mysql
set [session | global] profiling = 1;
```

**session**：当前会话
**global**：全局会话

---

### 查看profile

```mysql
show profiles;
```

---

### 查看指定语句耗时

里面有各种阶段的耗时，可以通过这个进行更加细节的优化

```mysql
show profile cpu for query query_id;
```

---

## explain执行计划

可以查看select执行过程中的细节

### 调用

在任意的查询语句之前加上 desc | explain 就可以查看该语句的执行计划

### 字段含义

**ID**：查询序号，执行查询语句的执行循序，ID相同，从上到下，ID不同，值越大越先执行
**select_type**：查询类型。意义不大，可以自行搜索
**type**：连接类型：性能由好到差依次是：null，system，Const，eq_ref，ref，range，Index，All
	在优化中，我们一般想要连接类型尽量靠前
**possible_key**：可能用到的索引
**key**：实际使用的索引
**key_len**：索引使用的字节数目
**rows**：可能要查询的行数
**filtered**：返回行数占据查询行数的百分比
**extra**：额外信息

# 索引使用原则

## 最左前缀法则

对于多列索引，查询时想要使用多列索引，查询的字段必须是使用前缀的，如果不使用左侧字段，则不会使用此索引
例如，一个索引构建的字段有name,gender,age三个字段，
如果只查询age字段，就不会使用这个索引，因为缺少前缀
如果查询name,gender字段，name字段会调用索引，gender不会调用索引，因为gender缺少前缀
总结下来：因为数据结构的原因，对于一个多列索引，必须先查询前面的，后面的才能被查询
注意：where中的字段的排序方式不会影响法则的使用

---

## 范围查询

使用返回查询的字段，查询右侧的列索引失效。
例如，一个索引构建的字段有name,gender,age三个字段，
如果查询name,gender>30,age字段，那么age将会失效
如果使用>=就不会失效

---

## 计算问题

如果字段被计算，则不能使用索引
例如，一个索引构建的字段有name,gender,age三个字段，
如果查询 substring(name,3,1)就不会使用name索引

---

## 引号问题

如果字符串不加引号，索引将会失效

---

## 模糊查询问题

尾部模糊就不会失效，头部模糊就会失效
和前面的范围查询问题一样，因为没有明确的起点

---

## or问题

如果查询的条件用or链接，如果前后有无索引字段，就不会使用索引
因为如果存在没有索引的字段，就要全表扫描了，既然要扫描了，再用一遍索引反而是浪费时间

---

## 数据分布影响

如果MySQL评估全表扫描比索引效率更高，则放弃使用索引
为什么会放弃呢：MySQL优化器决定的，不是很懂

---

## MySQL提示

就是在SQL中加入提示，告诉数据库使用或者不使用某个索引，达到人为优化的目的
插入位置：where之前

### 提示词

**建议使用**：use Index (索引名)
**禁止使用**：ignore Index (索引名)
**必须使用**：force Index (索引名)

---

## 覆盖索引

对于联合索引，我们在查询时，尽量只查询索引内部的字段，这样仅仅查询索引表就可以获取信息，
如果查询到了索引外部的字段，就需要实行回表查询，就多查询ID索引表，降低了性能

---

## 前缀索引

为什么需要前缀索引：在一些表中，字段类型为字符串的时候，如果字符串比较长，做成索引的话，查询起来就会浪费磁盘的IO资源
我们可以只对字符串的前部分建立前缀索引，提高查询效率

### 创建

```mysql
create [unique | fulltext] index Index_name on Table_name (index_col_name(n) [,...]);
```

**n**：字段前缀

---

## 单列索引的效率比联合索引效率低

所以我们推荐使用联合索引

---

# 索引的设计原则

1：数据量比较大：超过100w，访问频繁的表，我们一般认为要创建索引
2：尝尝针对 查询条件 where，排序 order by，分组 group by 操作建立索引
3：选择区分度高的字段建立索引，尽量建立唯一索引，区分度越高，效率越高
4：字符串字段，如果字符串比较长，建立前缀索引
5：尽量使用联合索引，使用覆盖索引，节省空间，避免回表查询，提高效率
6：控制索引数量，避免冗余索引
7：如果不能存在NULL值，创建表的时候记得标记，更方便优化器进行优化

---

# SQL优化

## 插入优化

### insert

#### 批量插入

批量插入可以避免频繁地与数据库建立连接，用一次链接就插入大量的数据可以大大的提升效率

```mysql
insert into 表名 [(字段1,字段2,......,字段n)] values (数据1,数据2,......,数据n)[，(数据1,数据2,......,数据n)，(数据1,数据2,......,数据n)];insert 
```

---

#### 手动提交事务

因为每执行一条插入语句，mysql就会自动的开启一个事务，语句结束就提交事务，即使我们使用批量插入，还是会造成大量的浪费，避免这种情况，我们需要手动的开启和提交事务。

```mysql
start transaction ;
insert ... ;
insert ... ;
insert ... ;
commit ;
```

可以节省事务方面的开销

---

#### 主键顺序插入

对于有主键的表格，建议按照主键的顺序插入数据

---

### load

对于大量数据的插入，insert就不适用了，我们可以使用load大量的去加载本地文件的数据

使用load需要对数据库进行操作：

```mysql
# 客户端连接服务端 加上参数 --local-infile
MySQL --local-infile -u root -p
# 设置全局参数 local-infile开关，开启从本地文件导入数据的开关
set global local_infile = 1;
# 使用load语句导入数据
load data local infile "文件路径/文件名" into table '表名' fields terminated by '字段分隔符'
	lines terminated by '行分隔符';
```

---

## 主键优化

### 数据组织方式

表数据都是根据主键顺序存放的，这种存储结构叫做索引组织表

因为聚集索引的默认索引是主键索引，索引下挂的数据是行数据

---

### 页分裂&页合并

数据按照主键存储，如果插入或者删除不是顺序的，为了维护数据表，就会调用这两个操作，会造成性能损耗。

---

### 设计原则：

1：尽量降低主键的长度
2：主键尽量顺序插入，避免出现页分裂的情况
3：尽量不使用UUID作为主键，如身份证号
4：业务尽量避免对主键的修改，因为维护索引会造成大量的性能开支

---

## order by 优化

首先，排序分为两种排序操作：using filesort 和 using Index

**using filesort**：通过索引或者全表扫描，获取到数据之后，在缓冲区sort Buffer 中完成排序操作。不是通过索引直接读取到排好序的数据都叫做filesort排序

**using Index**：很显然，直接诶读取到排好序的数据的操作叫做Index排序，操作效率高

### 设计原则：

1：根据排序的字段建立适合的索引
2：尽量使用覆盖索引
3：注意创建的规则细节（asc/ desc）
4：不可避免出现filesort时，可以调节缓冲区大小，默认为256k

---

## group by 优化

好像也没什么注意的，就是要建立联合索引，满足最左前缀法则之类的

---

## limit 分页查询 优化

因为数据结构是B+树的原因，分页查询如果页数比较靠后，就会从开头进行遍历操作，相当浪费时间。

可以创建覆盖索引，通过联合查询或者子查询来解决问题

---

## count优化

这个对于不同的引擎，count的效率也会不同
**MyISAM** 引擎把一个表的总行数存在了磁盘上，count( * )会直接返回
**InnoDb** 引擎执行count( * )会把表的所有数据读取出来，然后计数

count原理：count会对结果集进行一步步地判断，如果结果不是null，累计值就加一，最后返回累计值

count( * )：数据库做了优化，不会取出一行行的数据，所以尽量使用 count( * )

---

## update优化

update在更新数据的时候，为了数据的安全，会对数据进行加锁操作。
数据的加锁操作是根据索引添加的行锁，如果索引失效，就会升级为表锁
如果更新数据的条件可以调用索引查找到，就只对当前行进行加行锁，如果条件不能够用索引查询，就只能对整张表进行加锁，此时，数据库的并发性能就会大大降低。
因此，数据库在更新数据时，筛选条件应该尽量依靠索引，避免行锁升级为表锁。

---

# 视图

视图作为表存在于数据库，但是并不存储数据，而是存储查询逻辑，每次调用视图的时候，就执行一遍这个封装好的逻辑。

## 创建视图

```mysql
create [or replace] view view_name as select...;
```

**or replace**：如果这个视图存在就更新

---

## 查询创建语句

```MySQL
show create view view_name;
```

---

## 查询视图

 视图在数据库中是作为表出现的，因此查询操作和查询表的语句相同

---

## 修改视图

```mysql
# 方法一：
create or replace view view_name as select ...;
# 方法二
alter view view_name as select...;
```

---

## 删除视图

```mysql
drop view [if exists] view_name [,vire_name];
```

---

## 检查选项

视图是以表的形式呈现的，，那自然也可以进行增删改查，当然，视图存储的是逻辑，如果加入了数据，会加入到基表，而不是视图，如果添加了视图查询不到的条目，就会出现问题。
为了解决问题，就诞生了检查选项用来检查操作是否合法

### 添加检查选项

在创建视图语句之后加上 with [cascade  | local] check option 视图就会检查更新，阻止不符合视图创建规范的SQL执行。
另外，MySQL允许根据视图创建视图，因此，检查范围成了问题。为了确定检查的范围，mysql加入了两个范围限定
**cascade**：级联，如果在子视图加入了这个条件，通过子视图更新基表的操作会检查父视图的规范。
**local**：局部检查，如果父视图没有定义条件，就不检查

---

## 视图的更新

视图可以更新基表的条件：视图的数据必须是和基表是一对一对应的关系，如果数据经过了函数加工，就不能通过视图更新基表

例如：聚合函数，筛选函数，分组，等函数

---

## 视图作用

这个玩意有什么用呢？：

**简单**：简化操作，对于复杂度语句，使用频次比较高的语句都适合转化为视图去呈现。
**安全**：可以只对用户授予视图权限，使得用户只能看到视图所展示的数据，可以保护数据
**数据独立**：屏蔽基表的变化对视图的影响（可以取别名，只查看某些字段）

---

# 存储过程

---类似于函数的思想

在操作数据库的时候，每条语句都会建立一次链接，这造成了很大的开销，我们可以把一些SQL存储到数据库本身，外部调用仅仅掉用这个SQL集合就可以实现一系列操作，我们把这个集合叫做存储过程。

**特点**：

​	1：封装，复用
​	2：可以接受参数，返回结果
​	3：减少网络开支

## 创建

```mysql
create procedure procedure_name ([参数])
begin
    存储体语句;
end;
```

---

## 使用

```mysql
call procedure_name([参数]);
```

---

## 查询

```mysql
# 根据主机名查看
select * from information_schema.ROUTINES
    where ROUTINE_SCHEMA = '数据库名称';
# 根据存储过程名查看
show create procedure p1;
```

---

## 删除

```mysql
drop procedure if exists procedure_name;
```

---

## 变量

### 系统变量

由mysql数据库创建，不是由用户定义的，属于服务器层面，分为全局变量【global】和回话变量【session】用 @@变量名 表示；

#### 查看系统变量

```mysql
show [global | session(默认)] variables [like ...];
# 也可以指定变量查找
select @@ [global | session] 系统变量名;
```

---

#### 设置系统变量

```mysql
set [@@] [global | session] 系统变量名 = 值;
```

---

### 用户变量

用户变量不需要提前声明，在使用的时候直接用 @变量名 就可以使用，作用域为当前会话

#### 赋值

```mysql
# 方法一
set @var_name [:]= 值 [,@var_name = 值];
# 方法二
select @var_name [:]= 值 [,@var_name = 值];
# 方法三
select 字段名 into @Var_name from table_name;
```

---

#### 使用

```mysql
select @var_name [,@var_name];
```

如果使用了一个没有初始化的变量，就会返回一个负值

---

### 局部变量

局部变量需要声明才能使用，生命周期在一段 begin和end中。

#### 声明：

```mysql
declare var_name 变量类型 [default];
```

**default**：指定变量默认值；

---

#### 赋值

```mysql
# 方法一
set @var_name [:]= 值 [,@var_name = 值];
# 方法二
select @var_name [:]= 值 [,@var_name = 值];
# 方法三
select 字段名 into @Var_name from table_name;
```

---

## if

### 结构

```
if 条件 then
	结果
elseif 条件 then
	结果
else
	结果
end if;
```

## 参数

![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/%E5%8F%82%E6%95%B0%E7%B1%BB%E5%9E%8B.png)

### 示例

```mysql
create procedure p2(in s int,out str varchar(10),inout teacher_name varchar(10))
begin
    set teacher_name := concat(substring(teacher_name,1,1),'老师');
    if s >= 60 then
        set str := '及格';
    else
        set str := '及格';
    end if;
end;

set @teacher_name = '王天正';
call p2(60,@str,@teacher_name);
select @str,@teacher_name;
```

---

## case

### 结构

```mysql
# 结构一：通过比较值是否相等，判断执行哪一条语句
case 值
	when 值 SQL
	[when 值 SQL]
	[else SQL]
end case;
# 结构一：通过判断每条分支表达式的值，来决定执行哪一条语句
case
	when 表达式 SQL
	[when 表达式 SQL]
	[else SQL]
end case;
```

---

## 循环

### while

while别看长得像do-while 其实就是while

```mysql
while 条件 do 
	SQL...
end while;
```

---

### repeat

其实是do-while....不对！repeat是满足条件就退出，而不是满足条件就继续执行！！！

```mysql
repeat
	SQL...
	until 条件
end repeat;
```

---

### loop + leave + iterate

**loop**：可以理解成简单的无限循环
**leave**：break
**iterate**：continue

```mysql
[标记名:]loop
	SQL...
end loop [标记名];
```

```mysql
# 离开当前标记
leave 标记名
# 执行下一次标记
iterate 标记名
```

---

## 游标 cursor

从目前看来，存储过程所返回的变量只有SQL基础的数据类型所创建的变量，但是很多时候，我们拿到的数据并不是单个的数据，通常作为一个表出现，这就出现了多对一的矛盾，为了解决这个矛盾，出现了游标

### 声明

```mysql
declare 游标名称 cursor for 查询语句;
```

注意，声明游标语句必须存在在变量之后

### 开启

```mysql
open 游标名称
```

### 获取

```mysql
fetch 游标名称 into 变量 [,变量];
```

### 关闭

```mysql
close 游标名称
```

----

## 条件处理程序 handler

在读取游标数据时，一般情况下会用到无限循环去读取，当游标为空的时候，我们再去读取就会报错，有没有不报错解决办法呢，
答案是没有，但是我们可以对错误进行处理，不让错误出现

就诞生了条件处理程序，感觉和java和py的错误处理差不错

### 创建

```
declare handler_action handler for condition_value [,condition——value] statement;
```

**handler_action**：发现错误后执行的操作
	**exit**：直接退出
	**continue**：继续执行(?)

**handler_action**：捕捉错误
	sqlstate + 状态码
	sqlwarning 以01开头的状态码
	not found 以02开头的状态码
	sqlexception 上面二者的补集

对于上述的错误码，在SQL的官方文档有记载，不过让他先出错再修理可能更有效率（？

**statement**：执行的SQL

---

# 存储函数

存储函数是存储过程的特殊表现形式，
存储函数被要求是有返回值的存储过程，并且参数全部是 in 类型

```mysql
create function 存储函数名称(参数列表)
returns 返回值类型 [characteristic]
begin
	SQL...
    return 返回值;
end;
```

**characteristic**：
	**deterministic**：相同的数据会产生相同的结果
	**no sql**：不包含SQL语句
	**reads sql data**：包含读取数据的语句，但不包含写入数据的语句

---

# 触发器

触发器是和表有关的数据库对象，和名字一样，触发器会在**某些条件下**被触发，执行预先写好的SQL指令集。
**某些条件下**：指的是一些特殊语句，比如插入，更新，删除等，可以在执行之前触发，也可以在执行之后触发
通过这些特性，我们可以做到对数据库中的数据变化进行记录，可以写写日志什么的，
mysql的触发器还只支持**行级触发**，不支持**语句触发**
**行级触发**：指的是当表中的一行数据被操作时，触发器就会触发
**语句触发**：指的是通过语句触发的触发器

## 触发器记录的数据

![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/%E8%A7%A6%E5%8F%91%E5%99%A8%E8%AE%B0%E5%BD%95%E7%9A%84%E6%95%B0%E6%8D%AE.png)

**注意**，触发器记录的数据是一行的数据，所以可以用 old.字段 / new.字段的形式调用本次触发器监听的结果

## 创建

```mysql

create trigger trigger_name
    after | before -- 前触发还是后触发
    insert | update | delete -- 触发器生效的SQL
    on table_name -- 触发器生效的表名 
    for each row -- 啊哈哈，因为MySQL只支持这一种触发器，所以这里只有一种写法了
    begin 
        SQL...
    end;
```

---

## 查看

```mysql
show triggers;
```

---

## 删除

```mysql
drop trigger [schema_name.]trigger_name;
```

**schema_name**：指定数据库，如果没有指定，就默认当下的数据库

---

# 锁

保护数据在高并发情况下可靠的对象

按照粒度分：
**全局锁**：锁定所有表
**表级锁**：锁定整张表
**行级锁**：锁定对应的行

## 全局锁

对整个数据库加锁，整个数据库处于制只读状态，DML和DDL语句在执行中，都将处于阻塞状态，只有DQL可以执行。

典型的操作是做全库的逻辑备份，对所有的表进行锁定，获取一致性的视图，保证数据的可靠性
下面对备份情况做一个示例

```mysql
# 加锁
flush tables with read lock ; -- 全局锁加锁
```

```cmd
# 备份
mysqldump -u 用户名 -p 密码 数据库名称 >数据库名称.sql
# 该指令会将数据库备份到数据库.sql中
```

```mysql
# 解锁
unlock tables ;
```

这玩意不适用于中文名（？

### 缺点

缺点很明显了
如果在主库备份，业务基本暂时GG
如果在从库备份，从库不能及时同步主库，容易造成主从不一致

### 解决

在 InnoDB 引擎中，我们可以在备份时加入参数 --single-transaction 来实现不加锁完成备份

```cmd
mysqldump --single-transaction -u 用户名 -p 密码 数据库名称 >数据库名称.sql
```

---

## 表级锁

对整张表加锁，整张表处于制只读状态，DML和DDL语句在执行中，都将处于阻塞状态，只有DQL可以执行。
粒度大，发生冲突概率高，并发度低，应用在MyISAM，InnoDB，BDB存储引擎

主要分为：**表锁**，**元数据锁 （Meta data lock）**，**意向锁**。

---

### 表锁

分为：**表共享读锁**，**表独占写锁**

```mysql
# 加锁
lock tables table_name read/writer; 
# 解锁
unlock tables; \ 关闭客户端
```

**表共享读锁**：
	自己可以读，自己不可以写。别人可以读，别人不可以写
**表独占写锁**：
	自己可以读，自己可以写，别人不可以读，别人不可以写 （太屌了

---

### 元数据锁 （Meta data lock）

元数据是什么呢？元数据可以简单理解为就是表结构，如果这张表有尚未提交的事务，那么就不能对表结构，也就是元数据进行修改。
MDL由系统自动控制，无须显式调用，在访问的时候就会自动加上，用于维护数据一致性。为了规避DML和DDL的冲突

MySQL在5.5引进了MDL，在执行增删改查的时候，加入MDL读锁（共享锁）在修改元数据（表结构）时，加入MDL写锁（排他锁）

加锁类型：

![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/MDL%E5%8A%A0%E9%94%81%E7%B1%BB%E5%9E%8B.png)

DDL，DQL，DCL在执行时系统都会对其进行加锁，但是DDL修改了元数据，导致其锁是独享的，也就是说，DDL在执行时，DQL和DCL都不能执行。DQL和DCL在执行时，DDL不能执行。，因为增删改查的过程中禁止元数据被修改。

---

### 意向锁

在一个行级锁被加载之后，表级锁就不能添加了，表级锁在添加时需要扫描整张表，如果全部的行都没被加锁，表级锁就可以加锁。反之不能加锁。但是这样效率太低了，所以我们发明了意向锁，在任意一个行级锁被加载的时候，意向锁也被加载了，这样，表级锁在被加载之前就只用扫描意向锁就可以判断整张表有没有行锁被加载，大大的提高了效率。

意向共享锁（IS）：和表兼容锁兼容，和表排它锁互斥
意向排他锁（IX）：和表锁互斥，和意向锁兼容

```mysql
# 查看意向锁加锁情况
select object_schema,object_name,index_name,lock_data,lock_mode,lock_data
    from performance_schema.data_locks;
```

---

## 行级锁

对整行加锁，整行处于制只读状态，DML和DDL语句在执行中，都将处于阻塞状态，只有DQL可以执行。
锁粒度最小，发生锁冲突概率低。并发度高，应用在InnoDB中
InnoDB基于索引组织的，行级锁是通过对索引项的加锁实现的

行级锁分为三类：**行锁**，**间隙锁**，**临间锁**

---

### 行锁

防止事务对其进行delete和update操作，在RC，RR都支持

分为两种：
**共享锁**（S）：允许其他事务获取共享锁，不允许其他事务获取本行的排它锁；
**排它锁**（X）：阻止其他事务获取S和X；

行锁加锁类型：

![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/%E8%A1%8C%E9%94%81%E5%8A%A0%E9%94%81%E7%B1%BB%E5%9E%8B.png)

那么就诞生了一个问题，如果是通过索引精确的对一行数据进行操作，那么可以加行锁，因为其他行的数据一定不会用到，但是如果不能通过索引精确的锁定被操作行，这时候，行锁就会升级为行锁，降低性能

---

### 间隙锁/临间锁

因为二者功能有相同的地方，放在一起写

**间隙锁**：锁住B+树下链表的数据间隙，防止Insert对其进行操作，产生幻读，在RR支持
**临间锁**：锁住数据和他前面的间隙Gap，在RR级别支持

1：通过唯一索引进行等值查询，给不存在的记录加锁，就会优化为间隙锁
	假如ID行从4直接跳到了10，那么对7进行操作，会直接锁住5-9的空间，此时，对6的加锁操作将会被阻塞，间隙锁会对整个间隙进	行加锁。
2：通过普通索引进行的等值查询，向右遍历，直到不满足条件时，对这段间隙加间隙锁
	因为普通索引并不是唯一的，在加锁查询时，可能会有相同的索引被添加，如果这个时候被添加了，其他的事务再查询只能查询到刚	刚被添加的索引，会产生错误，因此系统会向前加锁间隙，向后寻找第一个不符合查找条件的索引之前的间隙进行加锁，防止相同的	索引插入
3：唯一索引上面的范围查询也会被加上临间锁
	和上面的情况一样，符合条件的是一个范围，如果这个范围内部有新的索引被插入，就会引起数据的不可靠。
	假如ID从4开始，我们查询ID大于4的时候，就会加一个从四开始到正无穷的临间锁，因为这个范围都被查询了，这个范围内部也不	允许有索引插入

---

# InnoDB

## 逻辑存储结构

![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/InnoDB%E9%80%BB%E8%BE%91%E5%AD%98%E5%82%A8%E7%BB%93%E6%9E%84.png)

---

## 架构

作为MySQL5.5之后的默认引擎，自然有过人之处，擅长事务处理，具有崩溃恢复特性。

架构图：左侧是内存架构，右侧是磁盘架构

![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/InnoDB%E6%9E%B6%E6%9E%84.png)

### 内存架构

**Buffer_pool**：缓冲池

​	作为主内存的区域，里面缓存的是经常操作的数据，在执行操作时，先操作缓冲区的数据（如果没有，就去磁盘），然后再以一定的	频率刷新到磁盘，减少磁盘IO开销，加快处理速度

​	底层以page页为单位，采用链表数据结构管理page，根据状态，page分为三种类型
​	1：free page 空闲page：未被使用。
​	2：clean page 被使用的page：数据没有被修改过
​	3：dirty page 脏page：被使用过的page，数据被修改过，因为缓冲区的滞后性，导致了磁盘和缓冲区数据的不一致

**Change Buffer**：更改缓冲区

​	主要针对非唯一的一二级索引，在执行DML时，如果数据不存在于 Buffer_pool 中，不会直接的操作磁盘，而是将变更的数据存放在	Change_Buffer中，在未来数据被读取时，再将数据合并恢复到Buffer_pool中。再将合并后的数据刷新到磁盘中。

​	**意义**：和聚集索引不同，二级索引通常不是唯一的，针对二级索引的修改通常是随机的，会影响到不相邻的二级索引页，如果每一次	都操作磁盘，就会造成大量的IO浪费，所以，我们在Change Buffer中进行合并操作，一齐刷新到磁盘中、

**Adaptive Hash Index**：自适应哈希索引

​	由于InnoDB引擎不支持哈希索引，但是哈希索引效率远远高于B+树索引，所以在查询的过程中，InnoDB引擎就会监控对各个表的索	引查询，如果建立哈希索引可以提升速度，就建立哈希索引，称之为自适应哈希索引！！！

​	无需人工干预，由系统生成。

​	参数：adaptive_hash_index 哈希开关

**Log Buffer**：日志缓冲区

​	用来保存要写入到磁盘中的日志。（redo log , undo log）默认大小为16KB，会定期刷新到磁盘。如果需要进行大量的事务。增加缓	冲区大小是一个减少IO开销不错的方法。

​	参数：Innodb_log_buffer_size：缓冲区大小
​			innodb_flush_log_at_trx_commit 刷新时机
​			0：每秒刷新一次
​			1：每次事务提交刷新一次
​			2：上两者

---

### 磁盘结构

**System Tablespace**：系统表空间

​	对于8.0之后的系统表空间，存放的是Change Buffer的数据，默认存储用户在系统表空间创建的表的数据和索引。如果每张表的独立	表空间关闭，所有表的数据和索引都在系统表空间。

​	参数：Innodb_data_dile_path

**File-Per-Table Tablespaces**：独立表空间

​	每个表的独立表空间，默认开启，开启之后，表的存储就不存储到系统表空间了

​	参数：Innodb_file_per_table

**General Tablespaces**：通用表空间

​	需要手动创建，在创建表的时候，可以使用这个空间存储表

​	创建：

```mysql
create tablespace tablespace_name
    add datafile 'file_name'
    engine 'engine_name';
```

​	指定：

```mysql
create table table_name tablespace tablespace_name;
```

**Undo Tablespaces**：撤销表空间

​	会默认创建两个空间文件，undo001，undo002。主要存储undo Log 日志

**Temporary Tablespaces：**：临时表空间

​	存储用户创建的临时表

**Doublewrite Buffer Files**：双写缓冲区

​	从 Buffer pool 刷新到磁盘的数据会首先写入到双写缓冲区中，可以在系统崩溃时恢复数据

**Redo Log**：重做日志

​	用来实现事务的持久性，由两部分组成：重做日志缓冲（Redo Log Buffer），重做日志文件（Redo Log），前者在内存中，后者在	磁盘中。当事务提交之后会把信息存放在日志中，用于在刷新脏读页到磁盘，发生错误时，进行数据恢复

---

### 后台线程

作用：将缓冲池中的数据在合适的时机刷新到磁盘文件中。

**Master Thread**：核心后台线程
	用于调度其他的线程，负责将缓冲池的数据异步刷新到磁盘中，脏页的刷新，合并插入缓存，undo页的回收

**IO Thread**：
	在InnoDB中使用了大量的**AIO**来处理IO请求，可以极大的提高效率，IO Thread用来负责这些IO请求的回调。
![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/IO%20Thread%20%E7%9A%84%E7%BA%BF%E7%A8%8B%E7%B1%BB%E5%9E%8B.png)

​	**AIO**：异步非阻塞IO

**Purge Thread**：
	主要用于回收事务已经提交的undo Log，在事务提交之后，undo Log可能不会使用了，用这个线程回收

**Page cleaner Thread**：
	协助master Thread 进行脏页刷新，减轻主线程的工作压力，减少阻塞

---

## 事务原理

我们通过事务的四大特性来解释事务的原理

**持久性**：

由 redo Log 实现

​	**redo Log**：重做日志

​	用来实现事务的持久性，由两部分组成：重做日志缓冲（Redo Log Buffer），重做日志文件（Redo Log），前者在内存中，后者在	磁盘中。当事务提交之后会把信息存放在日志中，用于在刷新脏读页到磁盘，发生错误时，进行数据恢复

在数据页从内存中被修改开始，这个数据页就变成脏页了，我们要把脏页写入到磁盘中，在这个过程中，如果出现问题导致写入失败，就会产生磁盘数据页和内存数据页不同步问题，持久性就不能保证了。

解决方法：我们可以通过重做日志将事务修改的信息存放到重做日志缓冲中，在脏页写入磁盘之前，将重做日志缓冲先写入到重做日志文件中，然后再开始脏页的写入，一旦写入发生错误，就可以调用重做日志文件中的内容将数据恢复。保证了事务的持久性

问题来了：你这个重做日志缓冲写入到重做日志文件的过程中发生错误时怎么办呢？既然会发生错误，那这玩意还有什么用呢？
解答来了：由于脏页写入到磁盘中大部分都是随机写入，效率低下，时间段较长，而日志写入是追加写入，效率高，时间短，出现错误概	率低，就可以优化了，当然，点子背，那也没办法，只能依靠别的方式了。

**原子性**：

由 undoLog 实现

​	**undo Log**：回滚日志

​	记录的是数据被修改之前的信息，作用有两个，回滚和MVCC
​	那么，既然要回滚，是不是也需要一个工具来实现这个数据->回滚的操作呢，毕竟数据不会自己写入到文件中。答案是并不用，redo 	Log存放的是物理数据，记录了改变后真正的数据值，而undo Log存放的是一条与当前操作相反的逻辑，如果删除，那我就插入，实	现百分百自主回滚！！！

​	undo Log 销毁：在事务结束的时候，不需要回滚的情况下，也不会立即删除 undo Log ，因为这些日志可能会用于 MVCC
​	undo Log 存储：采用段的方式进行管理和记录，存储在rollback segment 回滚段中，包含1024个undo Log 段

原子性最大的问题就是事务中只要有指令失败，就全部失败，那么前面执行成功的指令就要撤销，完成撤销工作的的就是undo Log了

**一致性**：


意味：无论数据更新成功还是失败，数据都保持一致的状态！
不是。持久性和原子性都实现了，一致性也就得到了保证（？

**隔离性**

由锁和MVCC实现

---

## MVCC 多版本并发控制

### 概念：

**当前读**：会读取数据的最新版本，并保证读取过程中不被其他指令修改

```mysql
# 下面两条语句都可以实现当前读
select ... lock in share mode (共享锁);
select ... for update; (update , insert , delete 都是排它锁)
```

**快照读**：简单的select就是快照读，快照是数据的可见版本，有可能是历史版，不加锁， 非阻塞读取

​	下面是几种隔离方式对快照读的影响：
​		Read Committed：每次select都生成一个快照读
​		Repeatable Read：开启事务之后，第一个select会生成一个快照
​		Serializable：快读会退化成当前读

**MVCC**：维护一个数据的多个版本，使得读写没有冲突，快照读为其实现提供了一个非阻塞的读功能，MVCC实现需要依赖数据库记录的	三个隐藏字段，undo Log，readView。

### 实现原理

#### 隐藏字段

![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/MVCC%E9%9A%90%E8%97%8F%E5%AD%97%E6%AE%B5.png)

DB_TRX_ID：每次有事务修改本段时，会将本次事务的ID赋值给该字段
DB_ROLL_PTR：配合实现回滚
DB_ROW_ID：如果有主键，就不生成该字段

#### undo_log版本链

回滚日志在insert时，产生的回滚记录只有在回滚的时候需要，事务完成，就可以被删除
在update，delete时，产生的回滚日志不仅仅在回滚的时候需要，在快照读的时候也需要，不会被立刻删除

不同的事务对同一行数据进行操作的时候，会在undo_log中生成一条版本链，版本链由隐藏字段中的回滚指针指向时间段更早的那一次记录，以便于实现数据恢复

![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/%E7%89%88%E6%9C%AC%E9%93%BE%E5%9B%BE%E8%A7%A3.png)

对于事务五的查询操作，查询到的数据到底是哪一个版本是依靠readview控制的

---

#### readview：读视图

读视图为快照读功能的执行提供了数据依据，记录并维护当前活跃事务的ID
包含四个核心字段：![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/readview%20%E8%AF%BB%E8%A7%86%E5%9B%BE%E6%A0%B8%E5%BF%83%E5%AD%97%E6%AE%B5.png)

在可重复读的隔离环境下，读视图会在每个事务第一次执行快照读的之前被创建，用于向快照读展示可以展示的数据，保证数据一致性
在RC隔离级别，由于每一次读取都是一次新的快照读，所以每一次都会生成一个readview。

访问规则：
![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/%E7%89%88%E6%9C%AC%E9%93%BE%E8%AE%BF%E9%97%AE%E8%A7%84%E5%88%99.png)

RC模式的实现原理：![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/RC%E6%A8%A1%E5%BC%8F%E4%B8%8Breadview%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86.png)

RR模式的实现原理：![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/RR%E6%A8%A1%E5%BC%8F%E4%B8%8Breadview%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86.png)

### 总结

实现MVCC要依靠隐藏字段提供当前事务的ID信息，Undo log中的版本链提供历次更新数据事务的ID，ReadView提供的当前活跃事务的ID信息，综合三者来判断快照读应该读取到的版本

MVCC+锁 就可以保持数据的隔离性！！！

---

# MySQL管理

## 系统数据库

在MySQL安装之后。会出现四个基础的数据库，由于每个版本带有的基础数据库不同，这里只展示8.0的数据库，![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/MySQL8.0%E8%87%AA%E5%B8%A6%E6%95%B0%E6%8D%AE%E5%BA%93.png)

---

## 常用工具

### mysql：经典客户端工具

此 mysql 并非 彼 mysql，这个不是指的是 mysql 服务，而是 mysql 客户端，可以使用脚本指令操作数据库，而不需要进行数据库服务登录。适用于脚本语言。![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/mysql%E5%AE%A2%E6%88%B7%E7%AB%AF%E6%8C%87%E4%BB%A4.png)

记得指定 database 

---

### mysqladmin：管理操作工具

mysqladmin 主要用来执行管理操作的客户端程序，可以用来检测服务器的配置和状态，创建库和删除库等

```cmd
# 这个客户端的指令参数有点多，可以通过 --help查看帮助文档
mysqladmin --help
```

查看这个帮助文档，也不知道有啥，也不知道有没有中文的，懒得翻译了，随用随问AI吧

---

### mysqlbinlog：二进制日志查看工具

MySQL会生成二进制日志保存二进制信息。如果想要查看这些日志，需要这个日志管理工具![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/mysqlbinlog%E7%AE%80%E5%8D%95%E7%94%A8%E6%B3%95.png)

这里不细看，在运维篇比较详细

---

### mysqlshow：客户端查询工具

可以快速查询到有什么数据库，数据库的表，表的列，索引，统计信息等。![mysqlshow简单用法](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/mysqlshow%E7%AE%80%E5%8D%95%E7%94%A8%E6%B3%95.png)

---

### mysqldump：数据库备份工具

主要用于数据库的备份和数据迁移，备份内容有创建表，插入表的语句![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/mysqldump%E7%AE%80%E5%8D%95%E7%94%A8%E6%B3%95.png)

---

### mysqlimport / sourec 数据库导入工具

用来配合 mysqldump -T 输出的文件进行数据导入![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/mysqlimport%20%E7%AE%80%E5%8D%95%E7%94%A8%E6%B3%95.png)![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/source%20%E7%AE%80%E5%8D%95%E7%94%A8%E6%B3%95.png)

---

# 日志

## 错误日志

见名知义，错误日志存放的是数据库在开始，结束，运行过程中出现错误时，记录相关信息的日志，如果数据库出现错误，停止运行，崩溃，建议首先查看错误日志。

```mysql
# 存放目录：/var/log/mysqlld.log
# 查看指令：
show variables like '%log_error%';
# 查看之后，log_error之后记录的是错误日志的路径
```

---

## 二进制日志

二进制日志记录了所有的DDL，DML语句，不包括查询语句，
简单来说，包含的就是对库表的修改，元数据的修改，数据内容的修改
在MySQL8.x版本，二进制日志默认开启

#### 作用：

1：灾难的数据恢复
2：主从复制

```mysql
# 查看二进制日志参数\
show variables like '%log_bin%';
# log_bin 是否开启
# log_bin_basename 文件位置，文件名
# log_bin_index 日志索引文件
...
```

#### 格式

二进制日志可以有多种记录方式：![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/%E4%BA%8C%E8%BF%9B%E5%88%B6%E6%97%A5%E5%BF%97%E7%9A%84%E6%A0%BC%E5%BC%8F.png)

```mysql
# 查询参数方式
show variables like '%binlog_format%';
```

![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/%E4%BA%8C%E8%BF%9B%E5%88%B6%E6%97%A5%E5%BF%97%E6%9F%A5%E7%9C%8B%E6%96%B9%E5%BC%8F.png)

那么问题就来了：二进制日志太多，时间线太长，怎么办：我们可以删除

![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/%E5%88%A0%E9%99%A4%E4%BA%8C%E8%BF%9B%E5%88%B6%E6%97%A5%E5%BF%97%E6%96%B9%E5%BC%8F.png)

---

## 查询日志

二进制日志中包含的是DML和DDL语句，查询日志包含所有的语句
由于记录语句太多，查询语句一般不默认开启，要手动开启

```mysql
# 查看参数
show variables like '%general%';
```

开启方法：![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/%E6%9F%A5%E8%AF%A2%E6%97%A5%E5%BF%97%E5%BC%80%E5%90%AF%E6%96%B9%E6%B3%95.png)

---

## 慢查询日志

之前了解过，指的是记录那些超过预定耗时的语句，所以叫慢查询日志。默认不开启

开启：![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/%E6%85%A2%E6%9F%A5%E8%AF%A2%E6%97%A5%E5%BF%97%E5%BC%80%E5%90%AF%E6%96%B9%E6%B3%95.png)

默认情况下，慢查询日志不会记录管理语句，也不会记录不使用索引的语句，但是可以开启：![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/%E5%A6%82%E4%BD%95%E6%9B%B4%E6%94%B9%E6%85%A2%E6%9F%A5%E8%AF%A2%E6%97%A5%E5%BF%97%E7%9A%84%E8%AE%B0%E5%BD%95%E8%A7%84%E5%88%99.png)

# 主从复制

## 概述

将主库的二进制日志导出，写入一个新的数据库，就是主从复制，提供二进制日志的数据库叫做主库，接受二进制日志的叫做从库

### 作用：

1：主库出现问题，可以切换到从库进行服务
2：实现读写分离，降低主库压力
3：可以在从库中进行备份，避免备份期间影响服务

---

## 原理

主从复制的原理是基于二进制日志（binlog）

首先，主库会导出一份binlog，以供从库接收
然后，从库会创建IOThread，用于发送请求，读取主库导出的binlog，并写入到一份中继日志（Relay log）中
然后，从库会创建SQLThread 用于将中继日志的信息写入到数据库中

## 搭建

首先，搭建需要两台服务器。一台搭载主库，一台搭载从库
然后，需要关闭两台服务器的防火墙或者开放指定端口![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/%E5%BC%80%E6%94%BE%E7%AB%AF%E5%8F%A3%E5%92%8C%E5%85%B3%E9%97%AD%E9%98%B2%E7%81%AB%E5%A2%99.png)
然后，配置主库：修改文件：![主库配置](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/%E4%B8%BB%E5%BA%93%E9%85%8D%E7%BD%AE.png)
然后：配置主库：创建账户：![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/%E5%88%9B%E5%BB%BA%E4%B8%BB%E5%BA%93%E8%B4%A6%E6%88%B7.png)
然后：查看主库二进制日志坐标：![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/%E4%B8%BB%E5%BA%93%E4%BA%8C%E8%BF%9B%E5%88%B6%E6%97%A5%E5%BF%97%E5%9D%90%E6%A0%87.png)
然后：修改从库文件：![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/%E4%BB%8E%E5%BA%93%E6%96%87%E4%BB%B6%E4%BF%AE%E6%94%B9.png)如果想禁用超级管理员权限，需要加入：super_read_only=1
然后，在从库设置主库配置：![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/%E4%BB%8E%E5%BA%93%E9%85%8D%E7%BD%AE.png)
然后：开启从库同步操作：|
![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/%E4%BB%8E%E5%BA%93%E5%BC%80%E5%90%AF%E6%93%8D%E4%BD%9C.png)
然后：还可以检查从库状态：
![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/%E4%BB%8E%E5%BA%93%E5%90%8C%E6%AD%A5%E7%8A%B6%E6%80%81.png)

---

# 分库分表

随着服务器的发展，应用数据量也会日益增多，若采用单个数据库存储，会存在以下瓶颈：
1：IO瓶颈：热点数据太多，存放热点数据的缓存区不足，就会使用磁盘，产生大量IO，速度大大降低，请求数据太多，网络延迟。带宽不足，造成严重的IO瓶颈。
2：CPU瓶颈：排序，分组，连接查询，聚合统计会消耗掉大量的CPU资源，请求次数太多，CPU性能出现瓶颈

为了减轻这两个瓶颈产生的影响，我们发明了分库分表操作

核心思想就是通过将数据库的数据分散到不同数据库的操作来减轻这种影响，提升性能

---

## 拆分策略

### 垂直拆分

#### 垂直分库

以表为依据，根据业务不同将不同的表拆分到不同的表中

特点：
	每个表的结构不一样
	每个表的数据不一样
	表的并集是全部数据

#### 垂直分表

以字段为依据，依据不同的字段将数据拆分到不同的表中

特点：
	每个表的结构不一样
	每个表的数据也不一样，一般通过主键实现数据配对
	所有表的数据的并集是全量数据

### 水平拆分

#### 水平分库

按照字段数据为依据，将数据拆分到不同的数据库中
也就是说，不同的数据库中的表结构相同，数据被拆分到不同的表中

特点：
	数据的表结构都一样
	表中的数据不一样
	所有数据的并集就是全数据

#### 水平分表

和水平分库差不多。也是将数据分配到不同的表中

特点：
	表结构一样
	数据不一样
	并集是全部数据 

---

## Mycat

mycat是数据库连接的中间件，可以像使用mysql一样使用这个中间件，开发者感知不到mycat的存在
mycat伪装了MySQL的协议， 用户可以无缝更换mycat

优势：
	性能稳定
	强大的技术团队
	体系完善
	社区活跃
























































































































































































































































































































































































































































# 不知道是啥的知识点

使得该字段自动增加数字：auto_increment
        可以用于编号的自动增加

    查看配置参数：show variables like '参数';
        InnoDB的表文件共用：innodb_file_per_table



---

## 页合并阈值

merge_threshold：合并阈值，在创建表或者索引时指定

























