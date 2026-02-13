# Java 并发笔记



## Java 中的 ThreadLocal 是如何实现线程资源隔离的？ 

简单来说，ThreadLocal 让每个线程拥有自己的资源，每个 Thread 中有一个 Map：ThreadLocalMap，叫做threadLocals，用来存放自己的资源。`threadLocal.get()`方法本质上就是让这个线程去自己的 ThreadLocalMap 中去找，找到了拿来用。

## 你说 Entry 的 key 是弱引用，那为什么不把 value 也设计成弱引用，这样不就不会内存泄漏了？

value 如果也弱引用，如果发生GC，就给清除了，后续就找不到数据了，ThreadLocalMap 里面的数据本来就是要给别的地方使用的，如果莫名其妙消失了，就违背了设计的初衷，所以使用者得注意 remove 的使用，防止堆积

## 为什么 ThreadLocalMap 用线性探测法而不是链地址法？

在实际开发中 ThreadLocalMap 中存放的东西数量一般很少，冲突概率不高，线性探测法简单，效率高，内存连续所以缓存友好

## Java 中的 InheritableThreadLocal 是什么？ 

InheritableThreadLocal 是 ThreadLocal 的子类，解决的是子线程继承父线程的资源问题，如果使用 ThreadLocal 作为存储，子线程就无法和父线程进行值传递，父线程设置的值子线程就拿不到，在 InheritableThreadLocal 被创建的时候，会拷贝一份父线程的值，之后父线程的更改与子线程无关

## InheritableThreadLocal 是怎么实现父子线程传值的？

inheritableThreadLocals 是除了 threadLocals 的另外一个 ThreadLocalMap 字段，在子线程被创建的时候构造函数会去扫描父线程的 inheritableThreadLocals 字段，如果里面有东西，就会把这个东西拷贝下来到子线程的 inheritableThreadLocals 中

不过这个拷贝仅仅发生在子线程刚被创建的时候，对于线程池来说，这玩意就废了，可以试一下 TransmittableThreadLocal

## 什么是 Java 的 TransmittableThreadLocal？ 

TransmittableThreadLocal 是阿里开发的工具类，专门解决线程池中线程传递值问题。其实 Thread 提供了一种解决方案：InheritableThreadLocal，但这种传递仅仅发生在子线程刚被创建的时候，这种模式不适用于线程池，因为在任务被提交到线程池的时候，线程往往已经被创建了，压根不起作用
TransmittableThreadLocal 的工作原理就是当任务提交的时候，任务对象将主线程的 ThreadLocal 作为快照保存下来，线程池的线程执行任务的时候再将这个快照还原，执行完毕之后再清理

## 为什么 InheritableThreadLocal 在线程池不管用

InheritableThreadLocal 仅仅在创建线程的时候执行构造方法，拷贝父线程的 inheritableThreadLocals，后续提交的任务只是复用已有的线程，并不会执行构造方法，父值无法传递

## TTL 和 InheritableThreadLocal 能一起用吗？会有什么问题？

可以使用，TTL本身继承自 InheritableThreadLocal ，new Thread 是 InheritableThreadLocal 的机制，而线程池则是使用 TTL 的 CRR 机制，但是，如果线程池的线程是通过 new Thread 创建的，会继承父线程的 inheritableThreadLocals ，后续有任务传递会 replay 覆盖一次，两次值可能不一样，最好统一使用 TTL

## TTL 的 holder 用 WeakHashMap 为什么能防止内存泄漏？

holder 的 key 是 TTL，也就是说，当外部对 TTL 的强引用消失之后，WeakHashMap 就能够清理掉这个key，对应的 Value 也会被清理掉，如果使用 HashMap，key 就不能正常回收，就会发生泄露，但是，弱引用还是兜底，及时 remove 才是好习惯

## 为什么 Java 中的 ThreadLocalMap 对 key 的引用为弱引用？ 

首先要明白 每一个 Thread 中维护一个 ThreadLocalMap，ThreadLocalMap 中有一个 Entity 数组，Entity 这个东西继承了用弱引用包装的 ThreadLocal 对象，然后内部有一个 Value 变量，初始化的时候将 ThreadLocal 作为弱引用，Value作为强引用

这样一来，当栈内失去了 ThreadLocal 这个 key的时候，GC会及时回收掉没有被强引用的它，然后当 ThreadLocalMap  被操作的时候，比如查找的时候，如果发现失效的Entity，或者是扩容的时候，又会清理掉失效的 Entity，这样就完成了对内存的清理

即使是这样，也只是尽力而为，也不能保证所有的 Entity 被及时的清理，所以还是记得使用 remove 更彻底

## 既然弱引用Key会导致内存泄漏，为什么不直接用强引用然后在某个时机统一清理？

强引用手动清理的最大问题就是无法保证时机，万一清理完毕之后，马上又要使用刚刚被清理的 ThreadLocal，就麻烦了，其次就是，如果使用弱引用，key 是会被及时清理的，发生短暂泄露的只是 Value 罢了，即使是这样，也比强引用好得多

## ThreadLocalMap 为什么用线性探测法而不是链表法处理哈希冲突？

ThreadLocalMap 在实际使用中，通常不会存放太多的值，在如此稀少的情况下，使用前者的好处就大于后者，首先就是缓存命中率高，其次就是清理过期的 Entity 的时候可以顺便整理数组

## 如果我把 ThreadLocal 定义成 static 的，还会有内存泄漏问题吗？

static 的对象会被类加载器强引用，因此不会被回收，也就不会出现 key 为 null 的情况，也就不会发生泄露，但是如果 Value 很大，就会一直待在内存里，所以，及时 remove 才是上上策。

## InheritableThreadLocal 的引用设计和 ThreadLocal 一样吗？

一样的，因为 InheritableThreadLocal 继承 ThreadLocal 存放的位置还是 ThreadLocalMap，Entity 也没有被修改引用方面，区别只是当 Thread 被创建的时候，会扫描父线程的 inheritableThreadLocals，拷贝给子线程

## 为什么不直接使用 WeekHashMap 替代  ThreadLocalMap ？

- 性能：ThreadLocalMap 的 key 永远是 ThreadLocal，不需要处理复杂的 Key 类型，也不需要实现复杂的 equals 判断，他的哈希算法是为 ThreadLocal 量身定做的，分布更加均匀
- 由于实际使用中 ThreadLocal 存量比较小，使用开放寻址法更为优秀，空间利用率和缓存命中率都比较优秀

## InheritableThreadLocal 的拷贝是深拷贝还是浅拷贝？

浅拷贝，也就是说对于可变对象，子线程拿到的也是引用，如果想改为深拷贝，可以重写 childValue 方法

## 为什么 JDK 不直接在 ThreadLocal 里支持父子线程传递？

ThreadLocal 被发明的本意就是线程隔离，继承关系，在很多场景下是不需要的，而且如果支持的话，使用不当可能造成数据污染，所以选择单独提供一个 InheritableThreadLocal 用于继承数据

## TransmittableThreadLocal 的性能开销大吗？

有的有的，因为在每一次任务提交的时候都要遍历所有的 TransmittableThreadLocal 对象制作快照，任务执行的时候需要进行快照的恢复和清理，所以会有开销

## 如果子线程修改了 InheritableThreadLocal 的值，父线程能感知到吗？

- 如果子线程获得的是非引用对象，就不会感知，因为本质上是两个对象
- 如果获得的是引用对象，如果修改引用，则不会有感知，如果是修改的是对象的内容，则能感知到，因为 InheritableThreadLocal 使用的是浅拷贝来获取父对象的值

## 线程池场景下 InheritableThreadLocal 有什么问题？

有大问题，InheritableThreadLocal 的机制是在被创建的时候去扫描父线程的 inheritableThreadLocals 字段，并拿到这里面东西的副本，后续不再访问，线程池里面的线程是提前创建好的，执行任务时所用的线程只是对线程池中线程的复用，并不会达到继承当时父线程数据的效果，可以使用 TransmittableThreadLocal 来实现对线程池的友好





















