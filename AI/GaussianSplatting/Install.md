# GaussianSplatting 安装使用教程

## 前期准备

### 硬件要求

- CUDA GPU Compute Capability 7.0+；
- 24GB 显存；

### 软件要求

- Conda
- C++编译器（Visual Studio 2019 for Windows）
- CUDA SDK 11 for PyTorch extensions, 需要在安装Visual Studio后在安装CUDA（11.6 存在已知问题）
- C++ Compiler and CUDA SDK must be compatible

## 安装启动

```powershell
# Gaussian splatting 的安装目录
$GAUSSIAN_SPLATTING="C:\Users\Public\Tools\GaussianSplatting"
mkdir -p $GAUSSIAN_SPLATTING
```

### 安装（克隆仓库）

```powershell
cd $GAUSSIAN_SPLATTING
git clone https://github.com/graphdeco-inria/gaussian-splatting --recursive
```

**配置环境**

```powershell
cd $GAUSSIAN_SPLATTING\gaussian-splatting

SET DISTUTILS_USE_SDK=1 # Windows only
conda env create --file environment.yml
conda activate gaussian_splatting
```

## 使用

### 准备工作

- 对着物体进行各个方向的拍照；

- 照片数据存放在 `$GAUSSIAN_SPLATTING\Data\cup\input`;

```powershell
mkdir -p $GAUSSIAN_SPLATTING\Data\cup\input
```

### 处理照片

#### 安装 `COLMAP-3.8-windows-cuda`

软件下载地址：[colmap](https://github.com/colmap/colmap/releases)

解压后放在 `$GAUSSIAN_SPLATTING` 中。

在 `Path` 环境变量增加 colmap `%GAUSSIAN_SPLATTING%\COLMAP-3.8-windows-cuda`

NOTICE：需要配置 `$GAUSSIAN_SPLATTING` 环境变量

#### 生成云点图

```powershell
cd $GAUSSIAN_SPLATTING\gaussian-splatting
python convert.py -s ..\Data\cup
```

### 训练数据

```batch
python train.py -s ..\Data\cup -m ..\Data\cup\output
```

等待处理完成

## 查看模型

下载[查看器viewers](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/binaries/viewers.zip)

解压放在 `$GAUSSIAN_SPLATTING\viewers`

```powershell
cd $GAUSSIAN_SPLATTING
.\viewers\bin\SIBR_gaussianViewer_app -m .\Data\cup\output\
```







参考：[https://github.com/graphdeco-inria/gaussian-splatting](https://github.com/graphdeco-inria/gaussian-splatting)

