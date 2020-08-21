#### 浏览器一般有三类 web Worker：

1. Dedicated Worker：  
    专用的 worker，只能被创建它的 JS 访问，创建它的页面关闭，它的生命周期就结束了。
2. Shared Worker：  
    共享的 worker，可以被同一域名下的 JS 访问，关联的页面都关闭时，它的生命周期就结束了。
3. ServiceWorker：  
    是事件驱动的 worker，生命周期与页面无关，关联页面未关闭时，它也可以退出，没有关联页面时，它也可以启动，  
    ```
        Dedicated worker 或 shared worker 最主要的能力，一是后台运行 JS，不影响 UI 线程，二是使用消息机制实现并行，
        可以监听 onmessage 事件。    
        所以dedicated worker 和 shared worker 专注于解决“耗时的 JS 执行影响 UI 响应”的问题，    
        而 service worker 则是为解决“Web App 的用户体验不如 Native App”的普遍问题而提供的一系列技术集合，必然部分处理逻辑会牵扯到 UI 线程，从而在启动 service worker 的时候，UI 线程的繁忙也会影响其启动性能。
    ```