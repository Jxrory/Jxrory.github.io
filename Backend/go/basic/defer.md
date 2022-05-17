# Golang defer

## 执行顺序

与**栈**相识, `先进后执行`

示例:

```go
import "fmt"

func main() {
    defer func1()
    defer func2()
    defer func3()
}

func func1() {
    fmt.Println("F1")
}

func func2() {
    fmt.Println("F2")
}

func func3() {
    fmt.Println("F3")
}
```

输出结果：

```bash
F3
F2
F1
```

## defer 与 return 先后关系

**先 return 后 defer**.

```go
func DeferFunc(i int) (t int) { // 0: 初始化 t=0
    t = i // 1: t = i = 1
    defer func() { // defer 在 return 之后
        t += 3 // 3: defer 后 t=4
    }()
    return t // 2: 返回 t=1
}

func main() {
    fmt.Println(DeferFunc(1))
}
```

输出结果：

```bash
4
```

## defer panic

遇到 panic 时，遍历本协程的 defer 链表，并执行 defer。在执行 defer 过程中:遇到 recover 则停止 panic，返回 recover 处继续往下执行。如果没有遇到 recover，遍历完本协程的 defer 链表后，向 stderr 抛出 panic 信息。

### 遇见 panic, 并不捕获异常的情况

```go
import (
    "fmt"
)

func main() {
    defer_call()

    fmt.Println("main 正常结束")
}

func defer_call() {
    defer func() { fmt.Println("defer: panic 之前1") }()
    defer func() { fmt.Println("defer: panic 之前2") }()

    panic("异常内容")  //触发defer出栈

    defer func() { fmt.Println("defer: panic 之后，永远执行不到") }()
}
```

**结果**:

```bash
defer: panic 之前2
defer: panic 之前1
panic: 异常内容
//... 异常堆栈信息
```

### 遇见 panic, 并捕获异常

```go
import (
    "fmt"
)

func main() {
    defer_call()

    fmt.Println("main 正常结束")
}

func defer_call() {

    defer func() {
        fmt.Println("defer: panic 之前1, 捕获异常")
        if err := recover(); err != nil {
            fmt.Println(err)
        }
    }()

    defer func() { fmt.Println("defer: panic 之前2, 不捕获") }()

    panic("异常内容")  //触发defer出栈

    defer func() { fmt.Println("defer: panic 之后, 永远执行不到") }()
}
```

**结果**:

```go
defer: panic 之前2, 不捕获
defer: panic 之前1, 捕获异常
异常内容
main 正常结束
```

**defer 最大的功能是 panic 后依然有效**, 所以 defer 可以保证你的一些资源一定会被关闭，从而避免一些异常出现的问题。

## defer 中包含 panic

```go
import (
    "fmt"
)

func main()  {

    defer func() {
       if err := recover(); err != nil{
           fmt.Println(err)
       }else {
           fmt.Println("fatal")
       }
    }()

    defer func() {
        panic("defer panic")
    }()

    panic("panic")
}
```

**结果**:

```bash
defer panic
```

**panic 仅有最后一个可以被 revover 捕获**。

## defer 下的函数参数包含子函数

```go
import "fmt"

func function(index int, value int) int {

    fmt.Println(index)

    return index
}

func main() {
    defer function(1, function(3, 0))
    defer function(2, function(4, 0))
}
```

**结果**:

```bash
3
4
2
1
```
