# OCR `open-ocr` 搭建

## 安装

```sh
git clone https://github.com/tleyden/open-ocr.git

cd open-ocr/docker-compose

# for v1
export OPEN_OCR_INSTANCE=open-ocr
# for v2
export OPEN_OCR_INSTANCE=open-ocr-2
# v1和v2选一个推荐v2

# then up (with -d to start it as deamon)
docker-compose up -d
```

## 使用

### 使用网络图片地址

```sh
curl -X POST -H "Content-Type: application/json" -d '{"img_url":"http://bit.ly/ocrimage","engine":"tesseract"}' http://10.0.2.15:$HTTP_PORT/ocr
```

### 使用 base64 图片

```sh
curl -X POST -H "Content-Type: application/json" -d '{"img_base64":"<YOUR BASE 64 HERE>","engine":"tesseract"}' http://10.0.2.15:$HTTP_PORT/ocr
```
