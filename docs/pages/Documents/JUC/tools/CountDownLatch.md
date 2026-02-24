# CountDownLatch

> [CountDownLatch (Java SE 21 & JDK 21)](https://java.cunzaima.cn/jdk21/doc-zh/api/java.base/java/util/concurrent/CountDownLatch.html)

CountDownLatch 主要完成的工作就是让一后置线程去等待前置线程执行

它内部的 Sync 类继承了 AbstractQueuedSynchronizer，status在其中表示还剩余多少个前置线程在工作，后置线程在前置线程没有完成工作的时候在 CLH 队列中等待

其提供了几个核心方法用于实现这一目的：

- 初始化：初始一个 CountDownLatch 需要给其提供一个 int 变量，表示后置线程还需要等到多少个前置线程完成工作，相当于倒计时
- await：让当前线程等待计数器减至 0，一般是后置线程去等待，也可以设置超时时间，超过这个时间就自动执行
- countDown：让计数器 -1，通常用于前置线程

唤醒方式很有意思，当计数器减至 0 之后，他首先会唤醒目前的处在头部的线程，被唤醒之后，他会先将队列的头结点指向自己，然后将前驱的引用置位空，然后清空内部存储的线程，然后唤醒后续节点，然后将自己前驱的节点对自己的引用置为空，也就是彻底切断与前驱的关系，这样一个接一个的唤醒，就可以让所有在队列中的后置线程工作了

CountDownLatch 内部并没有提供将 status 增加的操作，这也就是意味着他是一次性的，你想要再次完成一次计数，你必须要重新创建一个出来