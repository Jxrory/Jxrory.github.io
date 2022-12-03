# 强大的 `dd` 命令

按字节操作文件

注意：指定数字的地方若以下列字符结尾，则乘以相应的数字：b=512；c=1；k=1024；w=2
参数注释：

1. if=文件名：输入文件名，缺省为标准输入。即指定源文件。< if=input file >
2. of=文件名：输出文件名，缺省为标准输出。即指定目的文件。< of=output file >
3. ibs=bytes：一次读入 bytes 个字节，即指定一个块大小为 bytes 个字节。
   obs=bytes：一次输出 bytes 个字节，即指定一个块大小为 bytes 个字节。
   bs=bytes：同时设置读入/输出的块大小为 bytes 个字节。
4. cbs=bytes：一次转换 bytes 个字节，即指定转换缓冲区大小。
5. skip=blocks：从输入文件开头跳过 blocks 个块后再开始复制。
6. seek=blocks：从输出文件开头跳过 blocks 个块后再开始复制。
   注意：通常只用当输出文件是磁盘或磁带时才有效，即备份到磁盘或磁带时才有效。
7. count=blocks：仅拷贝 blocks 个块，块大小等于 ibs 指定的字节数。
8. conv=conversion：用指定的参数转换文件。
   ascii：转换 ebcdic 为 ascii
   ebcdic：转换 ascii 为 ebcdic
   ibm：转换 ascii 为 alternate ebcdic
   block：把每一行转换为长度为 cbs，不足部分用空格填充
   unblock：使每一行的长度都为 cbs，不足部分用空格填充
   lcase：把大写字符转换为小写字符
   ucase：把小写字符转换为大写字符
   swab：交换输入的每对字节
   noerror：出错时不停止
   notrunc：不截短输出文件
   sync：将每个输入块填充到 ibs 个字节，不足部分用空（NUL）字符补齐。

## 示例

```sh
# 将pdf格式中的图片拷贝出来
# 使用的vscode 的 hex 查看的 pdf 字节码, 计算出的数据
dd if=./pdf-origin.pdf of=./tmp-2 bs=16 skip=32 count=29079
```
