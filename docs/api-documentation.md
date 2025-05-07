# 焕遗 IP交易平台 API 文档

## 目录
1. [基础信息](#基础信息)
2. [认证接口](#认证接口)
3. [用户接口](#用户接口)
4. [商品接口](#商品接口)
5. [购物车接口](#购物车接口)
6. [订单接口](#订单接口)

## 基础信息

### 基础URL
```
http://localhost:3001/api
```

### 请求头
所有需要认证的接口都需要在请求头中携带 token：
```
Authorization: Bearer <token>
```

### 响应格式
所有接口响应格式统一为：
```json
{
  "data": {}, // 响应数据
  "message": "操作成功" // 响应消息
}
```

## 认证接口

### 用户登录
- **URL**: `/auth/login`
- **方法**: `POST`
- **请求体**:
```json
{
  "username": "string",
  "password": "string"
}
```
- **响应**:
```json
{
  "data": {
    "token": "string",
    "user": {
      "id": "string",
      "username": "string",
      "email": "string",
      "avatar": "string",
      "role": "user" | "admin",
      "createdAt": "string",
      "updatedAt": "string"
    }
  }
}
```

### 用户注册
- **URL**: `/auth/register`
- **方法**: `POST`
- **请求体**:
```json
{
  "username": "string",
  "password": "string",
  "email": "string"
}
```
- **响应**:
```json
{
  "data": {
    "id": "string",
    "username": "string",
    "email": "string",
    "role": "user",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

## 用户接口

### 获取用户信息
- **URL**: `/user/info`
- **方法**: `GET`
- **响应**:
```json
{
  "data": {
    "id": "string",
    "username": "string",
    "email": "string",
    "avatar": "string",
    "role": "user" | "admin",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

### 更新用户信息
- **URL**: `/user/info`
- **方法**: `PUT`
- **请求体**:
```json
{
  "username": "string",
  "email": "string"
}
```
- **响应**: 同获取用户信息

### 更新密码
- **URL**: `/user/password`
- **方法**: `PUT`
- **请求体**:
```json
{
  "oldPassword": "string",
  "newPassword": "string"
}
```
- **响应**:
```json
{
  "message": "密码更新成功"
}
```

### 上传头像
- **URL**: `/user/avatar`
- **方法**: `POST`
- **请求体**: `FormData`
  - `avatar`: File
- **响应**:
```json
{
  "data": {
    "avatar": "string"
  }
}
```

## 商品接口

### 获取商品列表
- **URL**: `/products`
- **方法**: `GET`
- **查询参数**:
  - `category`: string (可选)
  - `type`: string (可选)
  - `sort`: string (可选)
  - `limit`: number (可选)
  - `page`: number (可选)
- **响应**:
```json
{
  "data": {
    "data": [
      {
        "id": "string",
        "name": "string",
        "type": "string",
        "category": "string",
        "price": number,
        "description": "string",
        "imageUrl": "string",
        "detail": "string",
        "license": {
          "types": ["string"],
          "terms": [
            {
              "duration": "string",
              "price": number
            }
          ]
        },
        "restrictions": ["string"],
        "images": ["string"],
        "createdAt": "string",
        "updatedAt": "string"
      }
    ],
    "total": number
  }
}
```

### 获取商品详情
- **URL**: `/products/:id`
- **方法**: `GET`
- **响应**: 单个商品对象

### 获取商品分类
- **URL**: `/categories`
- **方法**: `GET`
- **响应**:
```json
{
  "data": ["string"]
}
```

### 获取热门商品
- **URL**: `/products/popular`
- **方法**: `GET`
- **响应**: 商品数组

### 获取推荐商品
- **URL**: `/products/recommended`
- **方法**: `GET`
- **响应**: 商品数组

## 购物车接口

### 获取购物车
- **URL**: `/cart`
- **方法**: `GET`
- **响应**:
```json
{
  "data": [
    {
      "id": "string",
      "productId": "string",
      "quantity": number,
      "product": {
        // 商品详情
      }
    }
  ]
}
```

### 添加商品到购物车
- **URL**: `/cart`
- **方法**: `POST`
- **请求体**:
```json
{
  "productId": "string",
  "quantity": number
}
```
- **响应**: 购物车项对象

### 更新购物车商品数量
- **URL**: `/cart/:id`
- **方法**: `PUT`
- **请求体**:
```json
{
  "quantity": number
}
```
- **响应**: 购物车项对象

### 删除购物车商品
- **URL**: `/cart/:id`
- **方法**: `DELETE`
- **响应**:
```json
{
  "message": "删除成功"
}
```

### 清空购物车
- **URL**: `/cart`
- **方法**: `DELETE`
- **响应**:
```json
{
  "message": "清空成功"
}
```

## 订单接口

### 创建订单
- **URL**: `/orders`
- **方法**: `POST`
- **请求体**:
```json
{
  "items": [
    {
      "productId": "string",
      "quantity": number
    }
  ]
}
```
- **响应**:
```json
{
  "data": {
    "id": "string",
    "userId": "string",
    "items": [
      {
        "id": "string",
        "productId": "string",
        "quantity": number,
        "product": {
          // 商品详情
        }
      }
    ],
    "totalAmount": number,
    "status": "pending" | "paid" | "completed" | "cancelled",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

### 获取订单列表
- **URL**: `/orders`
- **方法**: `GET`
- **响应**: 订单数组

### 获取订单详情
- **URL**: `/orders/:id`
- **方法**: `GET`
- **响应**: 单个订单对象

### 取消订单
- **URL**: `/orders/:id/cancel`
- **方法**: `POST`
- **响应**: 更新后的订单对象

### 更新订单状态
- **URL**: `/orders/:id/status`
- **方法**: `PUT`
- **请求体**:
```json
{
  "status": "pending" | "paid" | "completed" | "cancelled"
}
```
- **响应**: 更新后的订单对象 