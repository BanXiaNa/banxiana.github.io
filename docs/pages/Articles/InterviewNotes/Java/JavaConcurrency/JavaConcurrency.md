# Java 并发笔记

## 什么是 Java 的 CAS（Compare-And-Swap）操作？ 

CAS 是并发操作的基石，是一种原子操作，他会检测目标内存是否是预期值，如果是的话就更改为新值，如果不是的话就自旋重试

这种操作优势很明显，他不需要做加锁这种开销大的操作就能保证线程安全，缺点也很明显：

- ABA问题：如果一个A值被修改成了B，然后又被改成了A，这时候再去操作是发现不了的，因为值已经变回去了，但是确是被操作过的
- 自旋开销：在搞并发情况下，自旋会发生的比较频繁，CPU的开销比较大
- 只能保证单个变量操作的原子性，多个不能保证

## CAS 总线风暴是什么？怎么优化的？

lock 前缀的指令会将写缓冲区的数据立刻刷新到缓存，在多处理器架构下，处理器会通过嗅探总线的方式来判断自己的缓存是否过期。如果有一个CPU刷新主存就会通知其他的CPU缓存过期

在高并发场景下，大量的 CAS 去修改一个变量，总线上的缓存一致性流量就会暴涨，这个时候总线就会成为瓶颈，这个就是总线风暴

常用的解决思路就是维护一个 Cell，每个线程更新不同的 Cell，减少竞争，最后汇总

## ABA问题是什么，怎么避免的？

ABA 问题是 CAS 在并发的时候遇到的常见问题，具体来说就是一个变量从A变成B再变为A，CAS无法检测到这种变化，误以为是原值，然后产生错误操作的情况

常用解决思路是引入版本号，这样即使值相同，也会因为版本号的不同区分出来。

## 为什么说 Unsafe 类不推荐直接使用？

Unsafe 的操作可以直接操作内存，绕过 JVM 的类型检查，相当于在没有保护措施的情况下去干活，用得不好会导致内存泄漏，而且这玩意不是在 JDK 的标准 API 里面，随时可能改动，可以使用 VarHandle 作为替代方案

## 什么是 Java 中的锁自适应自旋？ 

自适应自旋是针对 synchronized 的重型锁的一种优化手段，核心目的就是为了减少阻塞唤醒带来的成本，具体来说就是 JVM 维护了上一次自旋的结果，如果这次发生了竞争失败的情况，就去查询这个，如果上次很容易就自旋成功了，那么这次也去自旋，如果上次失败了，就减少自旋的次数，如果一直失败就直接进入阻塞状态，防止浪费 CPU 资源

自适应自旋只发生在重量级锁上，轻量级锁 CAS 失败之后不会发生自旋，而是调用 inflate 进行膨胀

本质上就是通过历史数据预测未来，如果 CAS 在一个锁上很快就成功，那么就说明这个锁很快会被释放，CAS 带来的开销小于阻塞 + 唤醒的成本，就多自旋几圈。反过来也一样，本质上和怠速停车一样

## 自旋次数太多会有什么问题？

CPU 会空转，在这段空转的时间内，处理不了其他的工作，白白浪费性能，还会耽误其他线程执行，因此可以设置最大自旋次数，防止一直自旋浪费性能

## 自适应自旋怎么判断上次自旋是否成功的？

JVM 在 ObjectMonitor 维护自旋的统计信息，最近几次自旋是否拿到锁了，如果最近的情况不乐观，就减少甚至不让线程自旋

## Java的锁升级机制是什么

1.6 给 Synchronized 增加了锁的升级机制，根据不同的场景使用不同的锁，有意思的是，并没有锁的降级机制

- **偏向锁：**偏向锁的使用场景就是"只有一个线程访问"，线程首次访问的时候，JVM记录下这个线程的 ID 到 Mark Word 里面，之后，这个线程再来访问，就可以直接获取控制权，而不需要 CAS 操作，如果有其他的线程来竞争资源，偏向锁就不适合该场景了，就会升级成轻量级锁
  值得一提的是，现代应用场景下，并发度高，偏向锁命中概率持续降低，15 默认禁用偏向锁，18 移除偏向锁
- **轻量级锁：**轻量级锁的使用场景是"多个线程交替访问，不产生竞争"。创建的时候要在线程的私有栈内创建一个 Lock Record，他会备份 MarkWord 的数据和锁对象的引用，之后 CAS 将对象头指向这个 MarkWord，如果成功就说明设置成功，如果失败就说明发生竞争，轻量级锁将不适用于当前场景，将会膨胀成重量级锁
- **重量级锁：**当轻量级锁的 CAS 失败之后，锁膨胀为重量级锁，这个时候使用互斥量来保证运行，其核心是 ObjectMonitor，底层就是使用互斥量来实现线程的阻塞和唤醒

## Java 的 synchronized 是怎么实现的？ 

Synchronized 主要依赖于对象头 Mark Word 和 Monitor 对象监视器

其对于方法和代码块的实现方式不同

- 修饰方法的时候会在方法的访问标志加上 ACC_SYNCHRONIZED 标志，当线程进入被 ACC_SYNCHRONIZED 标记的方法前，会尝试去获取这个对象的监视器锁，成功了才会继续执行，失败就去等待了
- 修饰代码块时，编译器会在上下分别加上 monitorenter 和 monitorexit 表示监视器锁获取和监视器锁释放，monitorexit 会在正常退出和异常退出分别被加入，以保证所有情况都能正常解锁。当线程执行的时候读取到 monitorenter 时尝试获取对象的 Monitor 锁，成功就进入临界区工作，失败就进入阻塞队列，执行 monitorexit 进行锁的释放并且唤醒一部分在等待队列的线程

不管作用于方法还是代码块，本质上都是获取某个对象的 Monitor 锁

- 代码块加锁：获取锁对象的 Monitor 锁
- 实例方法：获取实例对象的 Monitor 锁
- 静态方法：获取类对象的 Monitor 锁

## 为什么 synchronized 不需要手动解锁，底层是怎么保证的？

编译器在生成字节码文件的时候会自动加上 monitorenter 和 monitorexit，并且还在异常出口处也加上了 monitorexit，保证了在执行的时候会正常的获取锁和释放锁，不会缺漏

## 锁升级过程中，偏向锁撤销为什么要在安全点进行？

因为 撤销偏向锁要遍历栈，找到持有这个锁的栈帧，修改他的 Lock Record，如果这个时候有线程在运行，数据就会乱掉，得在大家都安全的时候进行更改，这也是废弃的原因之一，撤销的开销太大

## 轻量级锁的 Lock Record 里存的是什么？为什么要拷贝 Mark Word？

存放的是 Lock Record 里面主要是 Mark Word 的拷贝和锁对象的指针，拷贝 Mark Word 的原因是撤销锁的时候会用到，在重入的时候，也会创建一个新的 Lock Record，但是不会去拷贝 Mark Word，如果撤销锁的时候发现 Mark Word 是 null，就直接释放，以此判断是否重入

## synchronized 能降级吗？比如从重量级锁降回轻量级锁？

并不能，这套体系设计上没考虑过降级的情况，但是 GC 可以在一个重量级锁的队列中没有线程等待的时候进行降级，但这个也并不是运行时的降级

## Java 中 ReentrantLock 的实现原理是什么？ 

## 说说 AQS 吧？

## 说说 CLH 队列锁？

CLH 队列锁是为了解决大量线程去自旋竞争锁的时候产生的总线风暴问题的。

CLHLock 作为 Java 中一种可行的 CLH FIFO队列锁被广泛应用，其维护着一个数据结构：QNode

QNode 里面只有一个布尔类型的变量 locked，他表示当前线程是否在等待（使用）锁，也就是说，当他处于 true 的时候，这个线程是没有完成工作的，也就不能释放锁。

QNode 会扮演三种角色

- tail：指向该队列的尾节点，用于新节点的插入操作，使用 AtomicReference 包裹，保证修改的原子性
- myPred：本线程私有的属性，表示前驱节点的锁的持有状态
- myNode：本线程的私有属性，表示自己锁的持有状态

工作流程：

- **加锁：**当一个线程想要锁的时候，他会把自己的 locked 设置成 true，然后利用 tail 获得自己的前驱并把 tail 修改为自己，然后自己就盯着自己的前驱的 QNode 属性就行了。
- **解锁：**解锁的步骤可以总结为：获取自己的 QNode，将自己的 QNode 设置为 false，表示自己已经退出临界区，释放锁，然后他会更新自己的 myNode 引用，将其指向自己的前驱 QNode，防止死锁

至于为什么必须在释放锁的时候更新一下 myNode 的引用：
我们假设这样一种情况：

- 我们的最后一个A节点忙完了自己的工作，将自己的 QNode 置为 false，表示自己不持有锁了，下班了。
- 突然发现自己还有工作，回来了，又要加锁
- 这个时候，他会获取到 tail 指向的 QNode，然后将自己的前驱引用这个 QNode，将然后将 tail 的引用标更新为自己的 QNode
- 然后将自己的 QNode 的值设置为 true，表示自己想要锁，然后自己就去等待前驱的 QNode

问题来了，当 A 节点第一次忙自己的工作的时候，tail 就是指向他的 QNode 的，因此，他下一次来的时候，获取的队尾的 QNode 引用就是自己的，他以为他的前驱就是他自己！然后他自己需要锁，他又在等自己释放锁！这不就跟自己拿着手机找手机一样吗！

所以要更改自己的 Node 引用为一个新的引用啦~

## Synchronized 和 ReentrantLock 有什么区别？ 

Synchronized 是 JAVA 提供的关键字，用起来很简单，全权由 JVM 管理，而 ReentrantLock 需要自己手动获取释放锁，相对应的 Synchronized 的自由度就低很多，包括但不限于只支持非公平锁，不可中断，超时获取不支持，但是方便。

其实性能方面差不多，Synchronized 在一开始的情况下性能不如 ReentrantLock，但是经过优化之后就差不多了，使用的时候只用考虑场景问题而不用考虑性能问题

## 什么是可重入锁，怎么实现的？

可重入锁为了解决同一线程再次获取同一个锁的时候产生的锁死现象，解决方式就是采用可重入锁机制

可重入锁维护一个计数器，当同一个线程再次获取同一个锁的时候就去让这个计数器+1，退出的时候计数器就-1，直到计数器归零就释放这个锁，防止自己跟自己抢的情况出现



## AtomicLong 是什么？干什么用的？

AtomicLong 简单来说就是一个支持原子操作的 Long 类型

首先，普通的Long会有两个致命问题：

- 累加并非原子性操作：普通的Long的累加操作（++）分为三个步骤，读取，+1，写回。很显然不能保证线程安全
- 撕裂问题：普通的Long是64位的，写入操作也是分为两部分：高32位和低32位写入，这两个步骤是分开的，如果中间有线程进来读一下，就会读到错误的数据

AtomicLong 解决了这两个问题，使用 Unsafe + CAS 保证了操作的原子性和数据可见性

也就是说对于 ++操作：获取值，+1，CAS（查询内存，看看是否和旧值相同，如果相同就更新，如果不同就重试）这样就能保证安全

但是这种实现方式对于极高并发场景下会出现性能抖动：会出现大量等待的线程在自旋，这会消耗掉大部分的性能，无所谓，后面会有 **LongAdder** 和 **DoubleAdder** 出手

## 你使用过 Java 的累加器吗？ 

累加器常用的就是 LongAdder 和 DoubleAdder，相对于 Atomic，他解决了高并发下线程都在自旋的问题。

LongAdder 选择不去让线程去抢占一个变量的使用权，而是维护了一个 BaseCount 变量和一个 Cell 数组，在竞争不激烈的时候，线程会去更改 BaseCount 的值达到修改的目的，反之会在 Cell 数组找一块地方进行更新，统计的时候将所有的值加起来就行

如果想追求灵活性的话，使用 LongAccumulator 更加的灵活

## LongAdder 采用的 Cell 数组是怎么样的？讲一讲？

Cell 数组是用于防止并发场景下大家都去更新一个变量做出的缓和操作，具体来说是如果更新变量失败，就会去这个数组中找一个地方去更新，保证并发性

这个数组一开始不会创建好，只有 BaseCount 访问失败的时候才会去创建，初始长度是二，如果之后还是不够，还会触发扩容，但是不会超过CPU的核心数，因为同一时间执行的线程就这么多，过了就没意义了

另外，其用 Contended 保证不出现伪共享

## LongAdder 的 sum 方法为什么不是原子的？有没有办法拿到精确值？

因为 sum 的计算方式是将 BaseCount 和 Cell 数组的所有值求和，在高并发场景下，去对这个操作进行加锁是不利于并发的，所以得到的值也不是精确的，如果想得到精确的值可以试着自己加锁，sumThenReset 方法可以拿到精确的值，但是会清零其余的地方，适合周期总结使用

## 为什么 Cell 数组长度是 2 的幂次？

这就涉及到线程如何寻找到适合自己的 Cell 了，线程在 BaseCount 繁忙的时候去访问 getProbe 方法，去获取探针值，然后去做 `probe & (size -1)`到这里就很明确了，如果是二的幂次的话，这样就比取模快很多了

## 高并发下 LongAdder 一定比 AtomicLong 快吗？

看读写

- 写操作是比 AtomicLong 快的，因为其 BaseCount + Cell 的设计不会发生太多竞争
- 读操作就不一定了，因为 LongAdder 需要计算 BaseCount + Cell 的值，Cell 越多越慢

所以读多写少适合 AtomicLong 反之 LongAdder 合适

## LongAdder 能保证可见性吗？

BaseCount 和 Cell 的每个值都是 volatile 的，所以这些值保证可见性没问题，但是求和操作就不能保证了，因为其不是原子操作

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





















