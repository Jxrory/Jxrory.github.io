# Spring @Value

## 设置默认值

### 字符串

```java
@Value("${config.url}")
private String url;
```

**设置默认值**:

```java
@Value("${config.url:http://127.0.0.1}")
private String url;
```

**设置`null`值**:

```java
// Spring EL 方式
@Value("${config.url:#{null}}")
private String url;

// 使用 @null 方式
@Value("${config.url:@null}")
private String url;
```

### 基本类型

```java
@Value("${some.key:true}")
private boolean booleanWithDefaultValue;

@Value("${some.key:42}")
private int intWithDefaultValue;

@Value("${some.key:true}")
private Boolean booleanWithDefaultValue;

@Value("${some.key:42}")
private Integer intWithDefaultValue;
```

### 数组

数组的默认值可以使用`逗号`分割。

```java
@Value("${some.key:one,two,three}")
private String[] stringArrayWithDefaults;

@Value("${some.key:1,2,3}")
private int[] intArrayWithDefaults;
```

## 参考

[Spring @Value 设置默认值](https://zhuanlan.zhihu.com/p/32337634)
[在@Value 注解中为 String 类型的字段设置 null 值](https://colobu.com/2015/09/09/set-null-for-a-string-property-by-Value/)
