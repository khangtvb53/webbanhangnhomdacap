import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, User, Order, SportCategory, ProductColor, ImportPreviewData } from '../types';
import { INITIAL_PRODUCTS } from '../data/mockProducts';

interface StoreContextType {
  products: Product[];
  filteredProducts: Product[];
  selectedCategory: SportCategory;
  setSelectedCategory: (cat: SportCategory) => void;
  selectedPlatform: string;
  setSelectedPlatform: (platform: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  priceFilter: 'all' | 'under300' | '300to700' | 'above700';
  setPriceFilter: (pf: 'all' | 'under300' | '300to700' | 'above700') => void;
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
  setSortBy: (sort: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating') => void;

  // Cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  discountAmount: number;
  couponCode: string;
  shippingFee: number;
  cartTotal: number;
  addToCart: (product: Product, size: string, color: ProductColor, qty?: number) => void;
  updateCartQuantity: (productId: string, size: string, colorHex: string, delta: number) => void;
  removeFromCart: (productId: string, size: string, colorHex: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // User & Auth
  currentUser: User | null;
  login: (email: string, password?: string) => Promise<{ success: boolean; message: string }>;
  loginAsDemo: (role?: 'customer' | 'admin') => void;
  register: (name: string, email: string, phone: string, password?: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateUserProfile: (data: Partial<User>) => void;

  // Orders
  orders: Order[];
  placeOrder: (shippingInfo: { customerName: string; phone: string; address: string; city: string; note?: string; paymentMethod: 'cod' | 'vietqr' | 'momo' }) => Order;
  lastPlacedOrder: Order | null;
  setLastPlacedOrder: (order: Order | null) => void;

  // Product actions (including link import)
  importProduct: (data: ImportPreviewData) => Product;
  deleteProduct: (id: string) => void;

  // Modals & Navigation
  isImportModalOpen: boolean;
  setIsImportModalOpen: (open: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalTab: 'login' | 'register';
  setAuthModalTab: (tab: 'login' | 'register') => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  isOrderHistoryOpen: boolean;
  setIsOrderHistoryOpen: (open: boolean) => void;
  activeToast: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const DEMO_USER_CUSTOMER: User = {
  id: 'user-001',
  name: 'Trần Đăng Khang',
  email: 'ttrankhangg@gmail.com',
  phone: '0908123456',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  role: 'customer',
  address: 'Số 45 Đường Lê Lợi, Phường Bến Nghé',
  city: 'TP. Hồ Chí Minh'
};

const DEMO_USER_ADMIN: User = {
  id: 'user-002',
  name: 'Quản Trị Viên Bando',
  email: 'admin@bando.vn',
  phone: '0912345678',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  role: 'admin',
  address: 'Trụ sở Bando Sportswear, Quận 1',
  city: 'TP. Hồ Chí Minh'
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('bando_products_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<SportCategory>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceFilter, setPriceFilter] = useState<'all' | 'under300' | '300to700' | 'above700'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bando_cart_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponDiscountPercent, setCouponDiscountPercent] = useState<number>(0);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bando_wishlist_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return ['bando-001', 'bando-004'];
  });

  // User
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('bando_user_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEMO_USER_CUSTOMER; // logged in by default for smooth experience
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('bando_orders_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'ORD-8921',
        userId: 'user-001',
        customerName: 'Trần Đăng Khang',
        phone: '0908123456',
        email: 'ttrankhangg@gmail.com',
        address: 'Số 45 Đường Lê Lợi, Phường Bến Nghé',
        city: 'TP. Hồ Chí Minh',
        items: [
          {
            product: INITIAL_PRODUCTS[0],
            selectedSize: 'L',
            selectedColor: INITIAL_PRODUCTS[0].colors[0],
            quantity: 1
          }
        ],
        subtotal: 580000,
        discount: 0,
        shippingFee: 0,
        total: 580000,
        paymentMethod: 'cod',
        status: 'shipping',
        createdAt: '2026-10-21T10:30:00Z',
        trackingCode: 'BDVN892198X'
      }
    ];
  });

  // Modals & UI states
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  const [activeToast, setActiveToast] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('bando_products_v2', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('bando_cart_v2', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('bando_wishlist_v2', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('bando_user_v2', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('bando_user_v2');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('bando_orders_v2', JSON.stringify(orders));
  }, [orders]);

  const showToast = (msg: string) => {
    setActiveToast(msg);
    setTimeout(() => {
      setActiveToast((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  // Cart operations
  const addToCart = (product: Product, size: string, color: ProductColor, qty: number = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedSize === size && item.selectedColor.hex === color.hex
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + qty
        };
        return next;
      }
      return [...prev, { product, selectedSize: size, selectedColor: color, quantity: qty }];
    });
    showToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  const updateCartQuantity = (productId: string, size: string, colorHex: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId && item.selectedSize === size && item.selectedColor.hex === colorHex) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (productId: string, size: string, colorHex: string) => {
    setCart(prev =>
      prev.filter(
        item => !(item.product.id === productId && item.selectedSize === size && item.selectedColor.hex === colorHex)
      )
    );
    showToast('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setCouponDiscountPercent(0);
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'BANDO10') {
      setCouponCode('BANDO10');
      setCouponDiscountPercent(10);
      showToast('Áp dụng mã giảm giá BANDO10 thành công (-10%)');
      return { success: true, message: 'Đã giảm 10% tổng đơn hàng' };
    }
    if (clean === 'FREESHIP') {
      setCouponCode('FREESHIP');
      setCouponDiscountPercent(0);
      showToast('Áp dụng mã FREESHIP thành công!');
      return { success: true, message: 'Miễn phí vận chuyển toàn quốc' };
    }
    return { success: false, message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn' };
  };

  // Cart calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(cartSubtotal * (couponDiscountPercent / 100));
  const shippingFee = cartSubtotal >= 500000 || couponCode === 'FREESHIP' || cartSubtotal === 0 ? 0 : 30000;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Đã xóa khỏi danh sách yêu thích');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Đã thêm vào danh sách yêu thích ❤️');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Auth
  const login = async (email: string, password?: string) => {
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Vui lòng nhập địa chỉ email hợp lệ' };
    }
    const user: User = {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0],
      email: email,
      phone: '0908123456',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      role: email.includes('admin') ? 'admin' : 'customer'
    };
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    showToast(`Đăng nhập thành công! Chào mừng ${user.name}`);
    return { success: true, message: 'Đăng nhập thành công' };
  };

  const loginAsDemo = (role: 'customer' | 'admin' = 'customer') => {
    const user = role === 'admin' ? DEMO_USER_ADMIN : DEMO_USER_CUSTOMER;
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    showToast(`Đã đăng nhập với tư cách: ${user.name} (${role === 'admin' ? 'Quản trị viên' : 'Khách hàng'})`);
  };

  const register = async (name: string, email: string, phone: string, password?: string) => {
    if (!name.trim()) return { success: false, message: 'Vui lòng nhập họ và tên' };
    if (!email || !email.includes('@')) return { success: false, message: 'Vui lòng nhập email hợp lệ' };
    if (!phone || phone.length < 9) return { success: false, message: 'Vui lòng nhập số điện thoại hợp lệ' };

    const newUser: User = {
      id: 'usr-' + Date.now(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      role: 'customer'
    };
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    showToast(`Đăng ký tài khoản Bando thành công! Chào bạn ${newUser.name}`);
    return { success: true, message: 'Đăng ký thành công' };
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Đã đăng xuất tài khoản an toàn');
  };

  const updateUserProfile = (data: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    showToast('Đã cập nhật thông tin tài khoản thành công');
  };

  // Orders
  const placeOrder = (shippingInfo: {
    customerName: string;
    phone: string;
    address: string;
    city: string;
    note?: string;
    paymentMethod: 'cod' | 'vietqr' | 'momo';
  }): Order => {
    const randomCode = 'BDVN' + Math.floor(100000 + Math.random() * 900000);
    const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: orderId,
      userId: currentUser?.id,
      customerName: shippingInfo.customerName,
      phone: shippingInfo.phone,
      email: currentUser?.email,
      address: shippingInfo.address,
      city: shippingInfo.city,
      note: shippingInfo.note,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      shippingFee,
      total: cartTotal,
      paymentMethod: shippingInfo.paymentMethod,
      status: 'pending',
      createdAt: new Date().toISOString(),
      trackingCode: randomCode
    };

    setOrders(prev => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    showToast(`Đặt hàng thành công! Mã đơn: ${orderId}`);
    return newOrder;
  };

  // Import Product from URL
  const importProduct = (data: ImportPreviewData): Product => {
    const newProduct: Product = {
      id: 'import-' + Date.now(),
      name: data.name,
      brand: data.brand || 'Thương Hiệu Thể Thao',
      price: Number(data.price),
      originalPrice: data.originalPrice ? Number(data.originalPrice) : undefined,
      category: data.category,
      imageUrl: data.imageUrl,
      description: data.description,
      features: data.features.length ? data.features : ['Chất liệu thể thao cao cấp', 'Thoáng khí, thấm hút mồ hôi'],
      sizes: data.sizes.length ? data.sizes : ['S', 'M', 'L', 'XL'],
      colors: data.colors.length ? data.colors : [{ name: 'Mặc định', hex: '#18181b' }],
      rating: 5.0,
      reviewCount: 1,
      sourceUrl: data.sourceUrl,
      sourcePlatform: data.sourcePlatform,
      isImported: true,
      importedAt: new Date().toISOString(),
      importedBy: currentUser?.name || 'Thành viên Bando',
      inStock: true,
      stockCount: 50,
      tags: [`Nhập từ ${data.sourcePlatform}`, 'Mới Đăng']
    };

    setProducts(prev => [newProduct, ...prev]);
    setIsImportModalOpen(false);
    showToast(`Đã đưa sản phẩm từ ${data.sourcePlatform} lên Bando thành công!`);
    return newProduct;
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Đã xóa sản phẩm khỏi danh sách');
  };

  // Filtering products
  const filteredProducts = products.filter(product => {
    // Category
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    // Platform
    if (selectedPlatform !== 'all') {
      if (selectedPlatform === 'imported' && !product.isImported) return false;
      if (selectedPlatform === 'bando' && product.isImported) return false;
      if (selectedPlatform === 'nike' && !product.sourcePlatform?.toLowerCase().includes('nike')) return false;
      if (selectedPlatform === 'adidas' && !product.sourcePlatform?.toLowerCase().includes('adidas')) return false;
      if (selectedPlatform === 'decathlon' && !product.sourcePlatform?.toLowerCase().includes('decathlon')) return false;
      if (selectedPlatform === 'shopee' && !product.sourcePlatform?.toLowerCase().includes('shopee')) return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = product.name.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      const matchPlatform = product.sourcePlatform?.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      if (!matchName && !matchBrand && !matchPlatform && !matchDesc) return false;
    }
    // Price range
    if (priceFilter === 'under300' && product.price >= 300000) return false;
    if (priceFilter === '300to700' && (product.price < 300000 || product.price > 700000)) return false;
    if (priceFilter === 'above700' && product.price <= 700000) return false;

    return true;
  }).sort((a, b) => {
    if (sortBy === 'newest') {
      return (b.importedAt ? new Date(b.importedAt).getTime() : 0) - (a.importedAt ? new Date(a.importedAt).getTime() : 0);
    }
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured default
  });

  return (
    <StoreContext.Provider
      value={{
        products,
        filteredProducts,
        selectedCategory,
        setSelectedCategory,
        selectedPlatform,
        setSelectedPlatform,
        searchQuery,
        setSearchQuery,
        priceFilter,
        setPriceFilter,
        sortBy,
        setSortBy,
        cart,
        cartCount,
        cartSubtotal,
        discountAmount,
        couponCode,
        shippingFee,
        cartTotal,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        wishlist,
        toggleWishlist,
        isWishlisted,
        currentUser,
        login,
        loginAsDemo,
        register,
        logout,
        updateUserProfile,
        orders,
        placeOrder,
        lastPlacedOrder,
        setLastPlacedOrder,
        importProduct,
        deleteProduct,
        isImportModalOpen,
        setIsImportModalOpen,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        selectedProduct,
        setSelectedProduct,
        isOrderHistoryOpen,
        setIsOrderHistoryOpen,
        activeToast,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
};
