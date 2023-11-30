# linux rocm

参考： [https://rocmdocs.amd.com/en/latest/deploy/linux/quick_start.html](https://rocmdocs.amd.com/en/latest/deploy/linux/quick_start.html)

## Add Repositories

### Add the repositories

```sh
# Add the amdgpu module repository for RHEL 8.8
sudo tee /etc/yum.repos.d/amdgpu.repo <<'EOF'
[amdgpu]
name=amdgpu
baseurl=https://repo.radeon.com/amdgpu/5.7.1/rhel/7.9/main/x86_64
enabled=1
gpgcheck=1
gpgkey=https://repo.radeon.com/rocm/rocm.gpg.key
EOF
# Add the rocm repository for RHEL8
sudo tee /etc/yum.repos.d/rocm.repo <<'EOF'
[rocm]
name=rocm
baseurl=https://repo.radeon.com/rocm/yum/latest/main
enabled=1
priority=50
gpgcheck=1
gpgkey=https://repo.radeon.com/rocm/rocm.gpg.key
EOF
```

### 2. Clean cached files from enabled repositories

```sh
sudo yum clean all
```

## Install drivers

```sh
sudo yum install amdgpu-dkms
```

## Install ROCm runtimes

Install the `rocm-hip-libraries` meta-package. This contains dependencies for most common ROCm applications.

```sh
sudo yum install rocm-hip-libraries
```

## Reboot the system

```sh
sudo reboot
```
