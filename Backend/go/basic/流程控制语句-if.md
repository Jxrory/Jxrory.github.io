# 流程控制语言 if

表达式外无需小括号 ( ) ，而大括号 { } 则是 `必须` 的

## if 基本形态

```go
func main() {
    x := 0
    if x > 0 {
        fmt.Println("x > 0")
    } else {
        fmt.Println("x <= 0")
    }
}
```

## if + 简短语句

if 语句可以在条件表达式前执行一个简单的语句。

该语句声明的变量**作用域仅在 if 之内**。

```go
func main() {
    if x := 2; x > 0 {
        fmt.Println("x > 0")
    } else {
        fmt.Println("x <= 0")
    }
}
```
