# Golang Channel

要点:

- 给一个 `nil` channel 发送消息, 阻塞;
- 从 `nil` channel 接收消息, 阻塞;
- 给已关闭的 channel 发送消息 panic;
- 给已关闭的 channel 接收消息, 返回 0 值;
