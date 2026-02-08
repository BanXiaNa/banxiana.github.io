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

# 