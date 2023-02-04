# Base64 编码

## 基本规则

1. 标准 Base64 只有 64 个字符（英文大小写、数字和+、/）以及用作后缀等号；
2. Base64 是把 3 个字节变成 4 个可打印字符，所以 Base64 编码后的字符串一定能被 4 整除（不算用作后缀的等号）；
3. 等号一定用作后缀，且数目一定是 0 个、1 个或 2 个。这是因为如果原文长度不能被 3 整除，Base64 要在后面添加\0 凑齐 3n 位。为了正确还原，添加了几个\0 就加上几个等号。显然添加等号的数目只能是 0、1 或 2；

### Java 实现

```java
public class CustomBase64Encoder {

    /**
     * 索引表
     */
    private static final char[] sBase64 = {
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
            'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
            'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
            'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
            'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
            'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
            'w', 'x', 'y', 'z', '0', '1', '2', '3',
            '4', '5', '6', '7', '8', '9', '+', '/'
    };

    /**
     * 将 byte[] 进行 Base64 编码并返回字符串
     * @param src 原文
     * @return 编码后的字符串
     */
    public static String encode(byte[] src) {
        if (src == null) {
            return null;
        }

        byte[] dst = new byte[(src.length + 2) / 3 * 4];

        int index = 0;

        // 每次将 3 个字节编码为 4 个字节
        for (int i = 0; i < (src.length / 3 * 3); i += 3) {
            int bits = (src[i] & 0xff) << 16 | (src[i + 1] & 0xff) << 8 | (src[i + 2] & 0xff);
            dst[index++] = (byte) sBase64[(bits >>> 18) & 0x3f];
            dst[index++] = (byte) sBase64[(bits >>> 12) & 0x3f];
            dst[index++] = (byte) sBase64[(bits >>> 6) & 0x3f];
            dst[index++] = (byte) sBase64[bits & 0x3f];
        }

        // 处理剩下的 1 个或 2 个字节
        if (src.length % 3 == 1) {
            int bits = (src[src.length - 1] & 0xff) << 4;
            dst[index++] = (byte) sBase64[(bits >>> 6) & 0x3f];
            dst[index++] = (byte) sBase64[bits & 0x3f];
            dst[index++] = '=';
            dst[index] = '=';
        } else if (src.length % 3 == 2) {
            int bits = (src[src.length - 2] & 0xff) << 10 | (src[src.length - 1] & 0xff) << 2;
            dst[index++] = (byte) sBase64[(bits >>> 12) & 0x3f];
            dst[index++] = (byte) sBase64[(bits >>> 6) & 0x3f];
            dst[index++] = (byte) sBase64[bits & 0x3f];
            dst[index] = '=';
        }

        return new String(dst);
    }
}
```
