# Scrapy

## 安装 `scrapy` 命令

```shell
pip install Scrapy
```

## 创建项目

项目名称 ``

```shell
scrapy startproject ScrapyLab
```

`ScrapyLab` 的目录结构:

```txt
.
├── ScrapyLab                   # 项目的 Python 模块，代码将放在此处
│   ├── __init__.py
│   ├── items.py                # 项目项定义文件
│   ├── middlewares.py          # project middlewares file
│   ├── pipelines.py            # project pipelines file
│   ├── settings.py             # project settings file
│   └── spiders                 # 一个目录，你稍后将把你的蜘蛛放在其中
│       └── __init__.py
└── scrapy.cfg                  # deploy configuration file
```

## 第一个网络爬虫

将以下代码保存放置在 `ScrapyLab/spiders/quotes_spider.py` 文件中

```py
from pathlib import Path

import scrapy


class QuotesSpider(scrapy.Spider):
    name = "quotes"

    def start_requests(self):
        urls = [
            "https://quotes.toscrape.com/page/1/",
            "https://quotes.toscrape.com/page/2/",
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        page = response.url.split("/")[-2]
        filename = f"quotes-{page}.html"
        Path(filename).write_bytes(response.body)
        self.log(f"Saved file {filename}")
```

## 如何运行爬虫

在项目的跟目录下运行如下命令

```shell
scrapy crawl quotes
```

## 命令行 - 提取(测试)数据

抓取 `https://quotes.toscrape.com/page/1/` 内容, 并返回一个交互式的 parse 方法.

```sh
scrapy shell 'https://quotes.toscrape.com/page/1/'
```

使用样式选择器

```py
response.css("div.quote")
```

使用 xpath

```py
response.xpath("//title")
```
