# Python 一阶段笔记

[![Python](https://img.shields.io/badge/Python-编程语言-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
[![Turtle](https://img.shields.io/badge/Turtle-图形库-green?style=flat-square)](https://docs.python.org/3/library/turtle.html)
[![MAGAO](https://img.shields.io/badge/MAGAO-码高教育-FF6B6B?style=flat-square)](https://www.magaoedu.com/)

## 📖 概述

**概述：**

这是 [码高教育](https://www.magaoedu.com/) Python 一阶段的学习笔记，主要涵盖 Python 基础语法、Turtle 图形库的使用、数据类型、控制流等内容。适合 Python 初学者快速入门。

---

## ⌨️ 常用快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl + A` | 全选 |
| `Ctrl + C` | 复制 |
| `Ctrl + V` | 粘贴 |
| `Ctrl + Z` | 撤回 |
| `Ctrl + X` | 剪切 |

---

## 📦 导入模块

```python
# 导入整个模块并起别名
import 模块名 as 小名

# 从模块中导入特定工具
from 模块名 import 工具名
```

**示例：**
```python
import turtle as t
from random import randint
```

---

## 🐢 Turtle 图形库

### 🚶 移动命令

#### 前进

```python
t.forward(前进的像素点数目)
# 简写
t.fd(前进的像素点数目)
```

#### 后退

```python
t.backward(后退的像素点数目)
# 简写
t.bk(后退的像素点数目)
```

#### 移动到指定位置

```python
t.goto(x, y)
```

---

### 🔄 转向命令

#### 左转

```python
t.left(角度)
# 简写
t.lt(角度)
```

#### 右转

```python
t.right(角度)
# 简写
t.rt(角度)
```

#### 绝对方向

```python
t.seth(角度)  # 设置画笔的绝对方向
```

---

### ⭕ 绘制圆形

```python
t.circle(半径, 角度)
```

**说明：**
- 半径的正负控制左右
- 角度的正负控制前后

---

### 🖊️ 画笔控制

#### 抬笔

```python
t.penup()
# 简写
t.pu()
t.up()
```

#### 落笔

```python
t.pendown()
# 简写
t.pd()
t.down()
```

#### 画笔粗细

```python
t.pensize(粗细值)
```

#### 画笔颜色

```python
t.pencolor(颜色)
```

---

### 🎨 颜色和填充

#### 填充颜色设置

```python
t.fillcolor(颜色)
```

#### 开始填充

```python
t.begin_fill()
```

#### 结束填充

```python
t.end_fill()
```

#### 整体颜色设置

```python
t.color(画笔颜色, 填充颜色)
# 如果只填写一个参数，则画笔和填充颜色相同
```

#### 颜色模式

```python
t.colormode(模式)
# 255 表示 RGB 模式
```

**RGB 说明：**
- R：红色（Red）
- G：绿色（Green）
- B：蓝色（Blue）

---

### ⚙️ 其他设置

#### 绘画速度

```python
t.speed(速度)
# 速度范围：1-10
```

#### 冻结窗口

```python
t.done()
```

---

## 📊 基础数据类型

| 类型 | 英文名 | 说明 |
|------|--------|------|
| 数字 | Number | 包括整数和小数 |
| 字符串 | String | 文本数据 |
| 列表 | List | 有序可变集合 |
| 元组 | Tuple | 有序不可变集合 |
| 集合 | Set | 无序不重复集合 |
| 字典 | Dictionary | 键值对集合 |

### 🔢 数字类型

- `int`：整数
- `float`：小数

### 🔄 类型转换

```python
str()    # 转换为字符串
int()    # 转换为整数
float()  # 转换为小数
```

### 🔍 查看类型

```python
type(变量/常量)
```

---

## 📝 变量命名规则

1. 必须由字母、数字、下划线组成
2. 不能以数字开头
3. 变量区分大小写
4. 不能使用关键字

**示例：**
```python
# 正确
user_name = "张三"
age1 = 18

# 错误
1age = 18      # 不能以数字开头
for = "test"   # 不能使用关键字
```

---

## 💬 输入输出

### 输出

```python
print(内容)
```

### 输入

```python
input(提示信息)
```

**示例：**
```python
name = input("请输入你的名字：")
print("你好，" + name)
```

---

## 🎲 随机数模块

### 导入随机数模块

```python
import random as r
```

### 生成 0-1 的小数

```python
r.random()
```

### 生成整数随机数

```python
r.randint(参数1, 参数2)
```

**示例：**
```python
num = r.randint(1, 100)  # 生成 1-100 的随机整数
```

### 生成单个随机字符

```python
r.choice(字符串)
```

### 生成多个随机字符

```python
r.sample(字符串, n)
```

---

## 🔁 循环结构

### for 循环

```python
for i in 遍历的内容:
    执行的代码
```

### range 函数

```python
range(start, stop, step)
```

**参数说明：**
- `start`：开始值，默认为 0
- `stop`：结束值（不包含）
- `step`：步长/间隔，默认为 1

**示例：**
```python
for i in range(5):
    print(i)  # 输出 0, 1, 2, 3, 4

for i in range(1, 10, 2):
    print(i)  # 输出 1, 3, 5, 7, 9
```

---

## ✅ 布尔类型

```python
False  # 等价于 0
True   # 等价于 1
```

---

## 🔍 比较运算符

| 符号 | 意义 | 示例 | 结果 |
|:----:|:----:|:----:|:----:|
| `>` | 大于 | `10 > 5` | `True` |
| `<` | 小于 | `50 < 10` | `False` |
| `>=` | 大于等于 | `100 >= 100` | `True` |
| `<=` | 小于等于 | `50 <= 20` | `False` |
| `!=` | 不等于 | `20 != 50` | `True` |
| `==` | 等于 | `50 == 50` | `True` |

**注意：** `==` 和 `=` 要区分，前者表示判断，后者是赋值。

---

## 🌿 条件分支

### 单分支

```python
if 条件表达式:
    代码块1
else:
    代码块2
```

**示例：**
```python
age = 18
if age >= 18:
    print("成年人")
else:
    print("未成年人")
```

### 多分支

```python
if 条件表达式1:
    代码块1
elif 条件表达式2:
    代码块2
elif 条件表达式3:
    代码块3
else:
    代码块4
```

**示例：**
```python
score = 85
if score >= 90:
    print("优秀")
elif score >= 80:
    print("良好")
elif score >= 60:
    print("及格")
else:
    print("不及格")
```

---

## 💡 学习建议

- **多练习**：编程需要大量实践，多写代码才能熟练掌握
- **理解概念**：不要死记硬背，理解每个概念的含义和用途
- **查阅文档**：遇到问题时学会查阅官方文档
- **循序渐进**：从简单到复杂，逐步提升编程能力
