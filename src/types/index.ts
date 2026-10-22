export type SportCategory = 'all' | 'football' | 'running' | 'gym' | 'tennis' | 'outdoor' | 'basketball';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: SportCategory;
  imageUrl: string;
  description: string;
  features: string[];
  sizes: string[];
  colors: ProductColor[];
  rating: number;
  reviewCount: number;
  sourceUrl?: string;
  sourcePlatform?: string;
  isImported?: boolean;
  importedAt?: string;
  importedBy?: string;
  inStock: boolean;
  stockCount: number;
  tags?: string[];
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: 'customer' | 'seller' | 'admin';
  address?: string;
  city?: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipping' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  userId?: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  note?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  paymentMethod: 'cod' | 'vietqr' | 'momo';
  status: OrderStatus;
  createdAt: string;
  trackingCode: string;
}

export interface ImportPreviewData {
  sourceUrl: string;
  sourcePlatform: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: SportCategory;
  imageUrl: string;
  description: string;
  features: string[];
  sizes: string[];
  colors: ProductColor[];
}
