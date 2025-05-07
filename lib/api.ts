import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

/**
 * API 基础配置
 * 创建 axios 实例，设置基础 URL、超时时间和默认请求头
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 请求拦截器
 * 在发送请求前自动添加 token 到请求头
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 * 处理响应数据和错误情况
 * 当遇到 401 未授权错误时，自动清除 token 并跳转到登录页
 */
api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * 用户信息接口
 * @interface User
 * @property {string} id - 用户唯一标识
 * @property {string} username - 用户名
 * @property {string} email - 用户邮箱
 * @property {string} [avatar] - 用户头像URL（可选）
 * @property {'user' | 'admin'} role - 用户角色
 * @property {string} createdAt - 创建时间
 * @property {string} updatedAt - 更新时间
 */
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

/**
 * 商品信息接口
 * @interface Product
 * @property {string} id - 商品唯一标识
 * @property {string} name - 商品名称
 * @property {string} type - 商品类型
 * @property {string} category - 商品分类
 * @property {number} price - 商品价格
 * @property {string} description - 商品描述
 * @property {string} imageUrl - 商品主图URL
 * @property {string} detail - 商品详细信息
 * @property {Object} license - 授权信息
 * @property {string[]} license.types - 授权类型列表
 * @property {Object[]} license.terms - 授权条款
 * @property {string} license.terms[].duration - 授权期限
 * @property {number} license.terms[].price - 授权价格
 * @property {string[]} restrictions - 使用限制
 * @property {string[]} images - 商品图片列表
 * @property {string} createdAt - 创建时间
 * @property {string} updatedAt - 更新时间
 */
export interface Product {
  id: string;
  name: string;
  type: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  detail: string;
  license: {
    types: string[];
    terms: {
      duration: string;
      price: number;
    }[];
  };
  restrictions: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * 购物车商品接口
 * @interface CartItem
 * @property {string} id - 购物车项唯一标识
 * @property {string} productId - 商品ID
 * @property {number} quantity - 商品数量
 * @property {Product} product - 商品详细信息
 */
export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
}

/**
 * 订单信息接口
 * @interface Order
 * @property {string} id - 订单唯一标识
 * @property {string} userId - 用户ID
 * @property {CartItem[]} items - 订单商品列表
 * @property {number} totalAmount - 订单总金额
 * @property {'pending' | 'paid' | 'completed' | 'cancelled'} status - 订单状态
 * @property {string} createdAt - 创建时间
 * @property {string} updatedAt - 更新时间
 */
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'paid' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

/**
 * API 响应类型
 * @interface ApiResponse
 * @template T - 响应数据类型
 * @property {T} data - 响应数据
 * @property {string} [message] - 响应消息（可选）
 */
interface ApiResponse<T> {
  data: T;
  message?: string;
}

/**
 * 商品相关 API
 * 提供商品的增删改查等操作
 */
export const productApi = {
  /**
   * 获取商品列表
   * @param {Object} [params] - 查询参数
   * @param {string} [params.category] - 商品分类
   * @param {string} [params.type] - 商品类型
   * @param {string} [params.sort] - 排序方式
   * @param {number} [params.limit] - 每页数量
   * @param {number} [params.page] - 页码
   * @returns {Promise<ApiResponse<{ data: Product[]; total: number }>>} 商品列表和总数
   */
  getProducts: (params?: {
    category?: string;
    type?: string;
    sort?: string;
    limit?: number;
    page?: number;
  }) => api.get('/products', { params }),
  
  /**
   * 获取商品详情
   * @param {string} id - 商品ID
   * @returns {Promise<ApiResponse<Product>>} 商品详细信息
   */
  getProduct: (id: string) => api.get(`/products/${id}`),
  
  /**
   * 获取商品分类列表
   * @returns {Promise<{ data: string[] }>} 分类列表
   */
  getCategories: () => api.get('/products/categories'),

  /**
   * 获取热门商品
   * @returns {Promise<ApiResponse<Product[]>>} 热门商品列表
   */
  getPopularProducts: () => api.get('/products/popular'),

  /**
   * 获取推荐商品
   * @returns {Promise<ApiResponse<Product[]>>} 推荐商品列表
   */
  getRecommendedProducts: () => api.get<ApiResponse<Product[]>>('/products/recommended'),

  getProductsByCategory: (category: string) => api.get(`/products/category/${category}`),

  searchProducts: (query: string) => api.get('/products/search', { params: { q: query } }),
};

/**
 * 购物车相关 API
 * 提供购物车的增删改查等操作
 */
export const cartApi = {
  /**
   * 获取购物车列表
   * @returns {Promise<ApiResponse<CartItem[]>>} 购物车商品列表
   */
  getCart: () => api.get('/cart'),
  
  /**
   * 添加商品到购物车
   * @param {string} productId - 商品ID
   * @param {number} quantity - 商品数量
   * @returns {Promise<ApiResponse<CartItem>>} 添加的购物车项
   */
  addToCart: (productId: string, quantity: number) => api.post('/cart/items', { productId, quantity }),
  
  /**
   * 更新购物车商品数量
   * @param {string} itemId - 购物车项ID
   * @param {number} quantity - 新的商品数量
   * @returns {Promise<ApiResponse<CartItem>>} 更新后的购物车项
   */
  updateCartItem: (itemId: string, quantity: number) => api.put(`/cart/items/${itemId}`, { quantity }),
  
  /**
   * 从购物车中删除商品
   * @param {string} itemId - 购物车项ID
   * @returns {Promise<ApiResponse<void>>} 删除结果
   */
  removeCartItem: (itemId: string) => api.delete(`/cart/items/${itemId}`),

  /**
   * 清空购物车
   * @returns {Promise<ApiResponse<void>>} 清空结果
   */
  clearCart: () => api.delete('/cart'),
};

/**
 * 订单相关 API
 * 提供订单的创建、查询等操作
 */
export const orderApi = {
  /**
   * 创建订单
   * @param {Object} data - 订单数据
   * @param {Object[]} data.items - 订单商品列表
   * @param {string} data.items[].productId - 商品ID
   * @param {number} data.items[].quantity - 商品数量
   * @returns {Promise<ApiResponse<Order>>} 创建的订单信息
   */
  createOrder: (data: { items: { productId: string; quantity: number }[] }) => 
    api.post<ApiResponse<Order>>('/orders', data),
  
  /**
   * 获取订单列表
   * @returns {Promise<ApiResponse<Order[]>>} 订单列表
   */
  getOrders: () => api.get<ApiResponse<Order[]>>('/orders'),
  
  /**
   * 获取订单详情
   * @param {string} id - 订单ID
   * @returns {Promise<ApiResponse<Order>>} 订单详细信息
   */
  getOrder: (id: string) => api.get<ApiResponse<Order>>(`/orders/${id}`),
  
  /**
   * 取消订单
   * @param {string} id - 订单ID
   * @returns {Promise<ApiResponse<Order>>} 更新后的订单信息
   */
  cancelOrder: (id: string) => api.post<ApiResponse<Order>>(`/orders/${id}/cancel`),

  /**
   * 更新订单状态
   * @param {string} id - 订单ID
   * @param {Order['status']} status - 新的订单状态
   * @returns {Promise<ApiResponse<Order>>} 更新后的订单信息
   */
  updateOrderStatus: (id: string, status: Order['status']) => 
    api.put<ApiResponse<Order>>(`/orders/${id}/status`, { status }),
};

/**
 * 用户相关 API
 * 提供用户的注册、登录、信息管理等操作
 */
export const userApi = {
  /**
   * 用户登录
   * @param {Object} data - 登录信息
   * @param {string} data.username - 用户名
   * @param {string} data.password - 密码
   * @returns {Promise<ApiResponse<{ token: string; user: User }>>} 登录结果，包含token和用户信息
   */
  login: (data: { username: string; password: string }) => 
    api.post<ApiResponse<{ token: string; user: User }>>('/auth/login', data),
  
  /**
   * 用户注册
   * @param {Object} data - 注册信息
   * @param {string} data.username - 用户名
   * @param {string} data.password - 密码
   * @param {string} data.email - 邮箱
   * @returns {Promise<ApiResponse<User>>} 注册结果
   */
  register: (data: { username: string; password: string; email: string }) => 
    api.post<ApiResponse<User>>('/auth/register', data),
  
  /**
   * 获取用户信息
   * @returns {Promise<ApiResponse<User>>} 用户信息
   */
  getUserInfo: () => api.get<ApiResponse<User>>('/user/info'),
  
  /**
   * 更新用户信息
   * @param {Partial<User>} data - 要更新的用户信息
   * @returns {Promise<ApiResponse<User>>} 更新后的用户信息
   */
  updateUserInfo: (data: Partial<User>) => api.put<ApiResponse<User>>('/user/info', data),
  
  /**
   * 更新用户密码
   * @param {Object} data - 密码信息
   * @param {string} data.oldPassword - 旧密码
   * @param {string} data.newPassword - 新密码
   * @returns {Promise<ApiResponse<void>>} 更新结果
   */
  updatePassword: (data: { oldPassword: string; newPassword: string }) => 
    api.put('/user/password', data),
  
  /**
   * 上传用户头像
   * @param {File} file - 头像文件
   * @returns {Promise<{ data: { avatar: string } }>} 上传结果，包含头像URL
   */
  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post<{ data: { avatar: string } }>('/user/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * 获取用户订单列表
   * @returns {Promise<ApiResponse<Order[]>>} 用户订单列表
   */
  getUserOrders: () => api.get<ApiResponse<Order[]>>('/user/orders'),
};

export default api; 