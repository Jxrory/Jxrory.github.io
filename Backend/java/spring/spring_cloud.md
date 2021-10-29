# Spring Cloud

## 服务注册发现 - Eureka

## 负载均衡之 - Ribbon

### Ribbon 的几种负载均衡算法

> `RoundRobinRule`：轮询策略。Ribbon 默认采用的策略。若经过一轮轮询没有找到可用的 provider，其最多轮询 10 轮。若最终还没有找到，则返回 null。
>
> `RandomRule`: 随机策略，从所有可用的 provider 中随机选择一个。
>
> `RetryRule`: 重试策略。先按照 RoundRobinRule 策略获取 provider，若获取失败，则在指定的时限内重试。默认的时限为 500 毫秒。

## 服务调用映射 - Open Feign

## 熔断和降级 - Hystrix

## 微服务网关 - Gateway

## 消息总线 - Bus
