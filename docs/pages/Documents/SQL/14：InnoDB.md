# InnoDB

## 逻辑存储结构

![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/InnoDB%E9%80%BB%E8%BE%91%E5%AD%98%E5%82%A8%E7%BB%93%E6%9E%84.png)

---

## 架构

作为MySQL5.5之后的默认引擎，自然有过人之处，擅长事务处理，具有崩溃恢复特性�?

架构图：左侧是内存架构，右侧是磁盘架�?

![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/InnoDB%E6%9E%B6%E6%9E%84.png)

### 内存架构

**Buffer_pool**：缓冲池

�?作为主内存的区域，里面缓存的是经常操作的数据，在执行操作时，先操作缓冲区的数据（如果没有，就去磁盘），然后再以一定的	频率刷新到磁盘，减少磁盘IO开销，加快处理速度

�?底层以page页为单位，采用链表数据结构管理page，根据状态，page分为三种类型
�?1：free page 空闲page：未被使用�?
�?2：clean page 被使用的page：数据没有被修改�?
�?3：dirty page 脏page：被使用过的page，数据被修改过，因为缓冲区的滞后性，导致了磁盘和缓冲区数据的不一�?

**Change Buffer**：更改缓冲区

�?主要针对非唯一的一二级索引，在执行DML时，如果数据不存在于 Buffer_pool 中，不会直接的操作磁盘，而是将变更的数据存放�?Change_Buffer中，在未来数据被读取时，再将数据合并恢复到Buffer_pool中。再将合并后的数据刷新到磁盘中�?

�?**意义**：和聚集索引不同，二级索引通常不是唯一的，针对二级索引的修改通常是随机的，会影响到不相邻的二级索引页，如果每一�?都操作磁盘，就会造成大量的IO浪费，所以，我们在Change Buffer中进行合并操作，一齐刷新到磁盘中�?

**Adaptive Hash Index**：自适应哈希索引

�?由于InnoDB引擎不支持哈希索引，但是哈希索引效率远远高于B+树索引，所以在查询的过程中，InnoDB引擎就会监控对各个表的索	引查询，如果建立哈希索引可以提升速度，就建立哈希索引，称之为自适应哈希索引！！�?

�?无需人工干预，由系统生成�?

�?参数：adaptive_hash_index 哈希开�?

**Log Buffer**：日志缓冲区

�?用来保存要写入到磁盘中的日志。（redo log , undo log）默认大小为16KB，会定期刷新到磁盘。如果需要进行大量的事务。增加缓	冲区大小是一个减少IO开销不错的方法�?

�?参数：Innodb_log_buffer_size：缓冲区大小
�?		innodb_flush_log_at_trx_commit 刷新时机
�?		0：每秒刷新一�?
�?		1：每次事务提交刷新一�?
�?		2：上两�?

---

### 磁盘结构

**System Tablespace**：系统表空间

�?对于8.0之后的系统表空间，存放的是Change Buffer的数据，默认存储用户在系统表空间创建的表的数据和索引。如果每张表的独�?表空间关闭，所有表的数据和索引都在系统表空间�?

�?参数：Innodb_data_dile_path

**File-Per-Table Tablespaces**：独立表空间

�?每个表的独立表空间，默认开启，开启之后，表的存储就不存储到系统表空间�?

�?参数：Innodb_file_per_table

**General Tablespaces**：通用表空�?

�?需要手动创建，在创建表的时候，可以使用这个空间存储�?

�?创建�?

```sql
create tablespace tablespace_name
    add datafile 'file_name'
    engine 'engine_name';
```

�?指定�?

```sql
create table table_name tablespace tablespace_name;
```

**Undo Tablespaces**：撤销表空�?

�?会默认创建两个空间文件，undo001，undo002。主要存储undo Log 日志

**Temporary Tablespaces�?*：临时表空间

�?存储用户创建的临时表

**Doublewrite Buffer Files**：双写缓冲区

�?�?Buffer pool 刷新到磁盘的数据会首先写入到双写缓冲区中，可以在系统崩溃时恢复数�?

**Redo Log**：重做日�?

�?用来实现事务的持久性，由两部分组成：重做日志缓冲（Redo Log Buffer），重做日志文件（Redo Log），前者在内存中，后者在	磁盘中。当事务提交之后会把信息存放在日志中，用于在刷新脏读页到磁盘，发生错误时，进行数据恢�?

---

### 后台线程

作用：将缓冲池中的数据在合适的时机刷新到磁盘文件中�?

**Master Thread**：核心后台线�?
	用于调度其他的线程，负责将缓冲池的数据异步刷新到磁盘中，脏页的刷新，合并插入缓存，undo页的回收

**IO Thread**�?
	在InnoDB中使用了大量�?*AIO**来处理IO请求，可以极大的提高效率，IO Thread用来负责这些IO请求的回调�?
![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/IO%20Thread%20%E7%9A%84%E7%BA%BF%E7%A8%8B%E7%B1%BB%E5%9E%8B.png)

�?**AIO**：异步非阻塞IO

**Purge Thread**�?
	主要用于回收事务已经提交的undo Log，在事务提交之后，undo Log可能不会使用了，用这个线程回�?

**Page cleaner Thread**�?
	协助master Thread 进行脏页刷新，减轻主线程的工作压力，减少阻塞

---

## 事务原理

我们通过事务的四大特性来解释事务的原�?

**持久�?*�?

�?redo Log 实现

�?**redo Log**：重做日�?

�?用来实现事务的持久性，由两部分组成：重做日志缓冲（Redo Log Buffer），重做日志文件（Redo Log），前者在内存中，后者在	磁盘中。当事务提交之后会把信息存放在日志中，用于在刷新脏读页到磁盘，发生错误时，进行数据恢�?

在数据页从内存中被修改开始，这个数据页就变成脏页了，我们要把脏页写入到磁盘中，在这个过程中，如果出现问题导致写入失败，就会产生磁盘数据页和内存数据页不同步问题，持久性就不能保证了�?

解决方法：我们可以通过重做日志将事务修改的信息存放到重做日志缓冲中，在脏页写入磁盘之前，将重做日志缓冲先写入到重做日志文件中，然后再开始脏页的写入，一旦写入发生错误，就可以调用重做日志文件中的内容将数据恢复。保证了事务的持久�?

问题来了：你这个重做日志缓冲写入到重做日志文件的过程中发生错误时怎么办呢？既然会发生错误，那这玩意还有什么用呢？
解答来了：由于脏页写入到磁盘中大部分都是随机写入，效率低下，时间段较长，而日志写入是追加写入，效率高，时间短，出现错误概	率低，就可以优化了，当然，点子背，那也没办法，只能依靠别的方式了�?

**原子�?*�?

�?undoLog 实现

�?**undo Log**：回滚日�?

�?记录的是数据被修改之前的信息，作用有两个，回滚和MVCC
�?那么，既然要回滚，是不是也需要一个工具来实现这个数据->回滚的操作呢，毕竟数据不会自己写入到文件中。答案是并不用，redo 	Log存放的是物理数据，记录了改变后真正的数据值，而undo Log存放的是一条与当前操作相反的逻辑，如果删除，那我就插入，�?现百分百自主回滚！！�?

�?undo Log 销毁：在事务结束的时候，不需要回滚的情况下，也不会立即删�?undo Log ，因为这些日志可能会用于 MVCC
�?undo Log 存储：采用段的方式进行管理和记录，存储在rollback segment 回滚段中，包�?024个undo Log �?

原子性最大的问题就是事务中只要有指令失败，就全部失败，那么前面执行成功的指令就要撤销，完成撤销工作的的就是undo Log�?

**一致�?*�?


意味：无论数据更新成功还是失败，数据都保持一致的状态！
不是。持久性和原子性都实现了，一致性也就得到了保证（？

**隔离�?*

由锁和MVCC实现

---

## MVCC 多版本并发控�?

### 概念�?

**当前�?*：会读取数据的最新版本，并保证读取过程中不被其他指令修改

```sql
# 下面两条语句都可以实现当前读
select ... lock in share mode (共享�?;
select ... for update; (update , insert , delete 都是排它�?
```

**快照�?*：简单的select就是快照读，快照是数据的可见版本，有可能是历史版，不加锁�?非阻塞读�?

�?下面是几种隔离方式对快照读的影响�?
�?	Read Committed：每次select都生成一个快照读
�?	Repeatable Read：开启事务之后，第一个select会生成一个快�?
�?	Serializable：快读会退化成当前�?

**MVCC**：维护一个数据的多个版本，使得读写没有冲突，快照读为其实现提供了一个非阻塞的读功能，MVCC实现需要依赖数据库记录�?三个隐藏字段，undo Log，readView�?

### 实现原理

#### 隐藏字段

![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/MVCC%E9%9A%90%E8%97%8F%E5%AD%97%E6%AE%B5.png)

DB_TRX_ID：每次有事务修改本段时，会将本次事务的ID赋值给该字�?
DB_ROLL_PTR：配合实现回�?
DB_ROW_ID：如果有主键，就不生成该字段

#### undo_log版本�?

回滚日志在insert时，产生的回滚记录只有在回滚的时候需要，事务完成，就可以被删�?
在update，delete时，产生的回滚日志不仅仅在回滚的时候需要，在快照读的时候也需要，不会被立刻删�?

不同的事务对同一行数据进行操作的时候，会在undo_log中生成一条版本链，版本链由隐藏字段中的回滚指针指向时间段更早的那一次记录，以便于实现数据恢�?

![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/%E7%89%88%E6%9C%AC%E9%93%BE%E5%9B%BE%E8%A7%A3.png)

对于事务五的查询操作，查询到的数据到底是哪一个版本是依靠readview控制�?

---

#### readview：读视图

读视图为快照读功能的执行提供了数据依据，记录并维护当前活跃事务的ID
包含四个核心字段�?[](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/readview%20%E8%AF%BB%E8%A7%86%E5%9B%BE%E6%A0%B8%E5%BF%83%E5%AD%97%E6%AE%B5.png)

在可重复读的隔离环境下，读视图会在每个事务第一次执行快照读的之前被创建，用于向快照读展示可以展示的数据，保证数据一致�?
在RC隔离级别，由于每一次读取都是一次新的快照读，所以每一次都会生成一个readview�?

访问规则�?
![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/%E7%89%88%E6%9C%AC%E9%93%BE%E8%AE%BF%E9%97%AE%E8%A7%84%E5%88%99.png)

RC模式的实现原理：![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/RC%E6%A8%A1%E5%BC%8F%E4%B8%8Breadview%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86.png)

RR模式的实现原理：![](https://banxia-log.oss-cn-beijing.aliyuncs.com/MySQL/RR%E6%A8%A1%E5%BC%8F%E4%B8%8Breadview%E7%9A%84%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86.png)

### 总结

实现MVCC要依靠隐藏字段提供当前事务的ID信息，Undo log中的版本链提供历次更新数据事务的ID，ReadView提供的当前活跃事务的ID信息，综合三者来判断快照读应该读取到的版�?

MVCC+�?就可以保持数据的隔离性！！！

---

# 