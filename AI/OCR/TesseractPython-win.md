# Tesseract OCR for Python

## Tesseract 安装 - Windows

Windows Tesseract下载地址：[https://digi.bib.uni-mannheim.de/tesseract/](https://digi.bib.uni-mannheim.de/tesseract/)

NOTICE: 安装时选择下中文数据集，也可以手动下载其它语言包，可以到这里https://tesseract-ocr.github.io/tessdoc/Data-Files下载

安装完成后，添加到环境变量`PATH`中，我的安装路径是：`C:\Program Files\Tesseract-OCR`，将traineddata文件放在 C:\Program Files\Tesseract-OCR\tessdata 目录

命令行窗口输入：tesseract ，查看是否安装成功.

```sh
$ tesseract
Usage:
  tesseract --help | --help-extra | --version
  tesseract --list-langs
  tesseract imagename outputbase [options...] [configfile...]

OCR options:
  -l LANG[+LANG]        Specify language(s) used for OCR.
NOTE: These options must occur before any configfile.

Single options:
  --help                Show this help message.
  --help-extra          Show extra help for advanced users.
  --version             Show version information.
  --list-langs          List available languages for tesseract engine.
```

## 安装pytesseract

```sh
pip install pytesseract
# Pillow库，用于图像处理
pip install Pillow
```

## 使用

### 简单示例

```py
import pytesseract
try:
    from PIL import Image
except ImportError:
    import Image

# 列出支持的语言
print(pytesseract.get_languages(config=''))

print(pytesseract.image_to_string(Image.open('test.png'), lang='chi_sim+eng'))
```

### 获取文字位置信息

image_to_boxes() 方法返回识别到的字符及字符边框信息。image_to_data() 返回单词及单词位置信息。

## 参数解析

```py
# 在 `config` 中可以设置命令行参数
text = pytesseract.image_to_string(image, config="-l chi_sim+eng --oem 3 --psm 6")
```

### 图片分割模式（PSM）

tesseract有13种图片分割模式（page segmentation mode，psm）：

- 0 — Orientation and script detection (OSD) only. 方向及语言检测（Orientation and script detection，OSD)
- 1 — Automatic page segmentation with OSD. 自动图片分割
- 2 — Automatic page segmentation, but no OSD, or OCR. 自动图片分割，没有OSD和OCR
- 3 — Fully automatic page segmentation, but no OSD. (Default) 完全的自动图片分割，没有OSD
- 4 — Assume a single column of text of variable sizes. 假设有一列不同大小的文本
- 5 — Assume a single uniform block of vertically aligned text. 假设有一个垂直对齐的文本块
- 6 — Assume a single uniform block of text. 假设有一个对齐的文本块
- 7 — Treat the image as a single text line. 图片为单行文本
- 8 — Treat the image as a single word. 图片为单词
- 9 — Treat the image as a single word in a circle. 图片为圆形的单词
- 10 — Treat the image as a single character. 图片为单个字符
- 11 — Sparse text. Find as much text as possible in no particular order. 稀疏文本。查找尽可能多的文本，没有特定的顺序。
- 12 — Sparse text with OSD. OSD稀疏文本
- 13 — Raw line. Treat the image as a single text line, bypassing hacks that are Tesseract-specific. 原始行。将图像视为单个文本行。

### OCR引擎模式（OEM）

有4种OCR引擎模式：

- 0 — Legacy engine only.
- 1 — Neural nets LSTM engine only.
- 2 — Legacy + LSTM engines.
- 3 — Default, based on what is available.

参考：

- [https://hiyongz.github.io/posts/python-notes-for-ocr-with-tesseract/](https://hiyongz.github.io/posts/python-notes-for-ocr-with-tesseract/)