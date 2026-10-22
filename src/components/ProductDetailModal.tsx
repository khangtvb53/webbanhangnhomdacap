import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductColor } from '../types';
import { X, Heart, ShoppingBag, ExternalLink, ShieldCheck, Truck, RefreshCw, Check, Star, Ruler, Trash2 } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setIsCartOpen,
    setIsCheckoutOpen,
    currentUser,
    deleteProduct
  } = useStore();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  // Initialize selected size and color when product opens
  React.useEffect(() => {
    if (selectedProduct) {
      setSelectedSize(selectedProduct.sizes[0] || 'L');
      setSelectedColor(selectedProduct.colors[0] || { name: 'Đen', hex: '#18181b' });
      setQuantity(1);
      setShowSizeGuide(false);
      setImageError(false);
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const wishlisted = isWishlisted(selectedProduct.id);

  const formatVND = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const discountPercent = selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price
    ? Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedColor) return;
    addToCart(selectedProduct, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    if (!selectedColor) return;
    addToCart(selectedProduct, selectedSize, selectedColor, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này khỏi gian hàng Bando?')) {
      deleteProduct(selectedProduct.id);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 text-zinc-400 hover:text-white bg-zinc-950/70 hover:bg-zinc-800 rounded-full transition-colors cursor-pointer border border-zinc-800"
          title="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Left Column: Visual Gallery */}
          <div className="md:col-span-6 bg-zinc-950 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-800">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 relative">
              {!imageError ? (
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  onError={() => setImageError(true)}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                  <span className="font-display text-3xl font-bold text-zinc-700">BANDO</span>
                  <span className="text-xs text-zinc-500 mt-2">{selectedProduct.name}</span>
                </div>
              )}

              {/* Source tag overlay */}
              {selectedProduct.isImported && (
                <div className="absolute top-3 left-3 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 px-2.5 py-1 rounded text-xs font-semibold text-orange-400 flex items-center gap-1.5">
                  <span>Nhập từ: {selectedProduct.sourcePlatform}</span>
                </div>
              )}
            </div>

            {/* External link back to source web */}
            {selectedProduct.sourceUrl && (
              <div className="mt-4 p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between text-xs">
                <div>
                  <p className="text-zinc-400 font-medium">Sản phẩm từ trang web gốc:</p>
                  <p className="text-orange-400 font-semibold truncate max-w-[220px]">
                    {selectedProduct.sourcePlatform}
                  </p>
                </div>
                <a
                  href={selectedProduct.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <span>Mở web gốc</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* Trust Badges */}
            <div className="mt-6 pt-4 border-t border-zinc-800 grid grid-cols-3 gap-2 text-center text-[11px] text-zinc-400">
              <div className="p-2 bg-zinc-900/50 rounded-lg">
                <Truck className="w-4 h-4 mx-auto mb-1 text-orange-400" />
                <span>Giao nhanh 24-48h</span>
              </div>
              <div className="p-2 bg-zinc-900/50 rounded-lg">
                <RefreshCw className="w-4 h-4 mx-auto mb-1 text-sky-400" />
                <span>Đổi size 7 ngày</span>
              </div>
              <div className="p-2 bg-zinc-900/50 rounded-lg">
                <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
                <span>Kiểm hàng trước trả sau</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Brand line */}
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="uppercase tracking-wider font-semibold text-orange-400">{selectedProduct.brand}</span>
                  <span aria-hidden="true">·</span>
                  <span className="capitalize">{selectedProduct.category}</span>
                </div>
                {/* Wishlist toggle */}
                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className="flex items-center gap-1.5 text-zinc-400 hover:text-rose-400 cursor-pointer"
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{wishlisted ? 'Đã thích' : 'Lưu'}</span>
                </button>
              </div>

              {/* Title */}
              <h1 className="mt-2 text-xl sm:text-2xl font-bold text-white leading-snug">
                {selectedProduct.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="mt-2 flex items-center gap-2 text-xs text-zinc-400">
                <div className="flex items-center text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="ml-1 font-bold tabular-nums text-white">{selectedProduct.rating}</span>
                </div>
                <span>·</span>
                <span className="tabular-nums">{selectedProduct.reviewCount} đánh giá từ khách hàng</span>
                <span>·</span>
                <span className="text-emerald-400 font-medium">Còn {selectedProduct.stockCount} sản phẩm</span>
              </div>

              {/* Price Row */}
              <div className="mt-4 p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-2xl font-extrabold text-white tabular-nums">
                      {formatVND(selectedProduct.price)}
                    </span>
                    {selectedProduct.originalPrice && (
                      <span className="text-sm text-zinc-500 line-through tabular-nums">
                        {formatVND(selectedProduct.originalPrice)}
                      </span>
                    )}
                  </div>
                  {discountPercent > 0 && (
                    <p className="text-[11px] text-emerald-400 mt-0.5">
                      Tiết kiệm {formatVND((selectedProduct.originalPrice || 0) - selectedProduct.price)} (-{discountPercent}%)
                    </p>
                  )}
                </div>
                <span className="text-xs text-zinc-400 font-medium">Đã gồm VAT</span>
              </div>

              {/* Color Selector */}
              {selectedProduct.colors.length > 0 && (
                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-zinc-300">Màu sắc:</span>
                    <span className="text-zinc-400">{selectedColor?.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedProduct.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                          selectedColor?.hex === c.hex
                            ? 'border-orange-500 ring-2 ring-orange-500/30 scale-110'
                            : 'border-zinc-700 hover:border-zinc-500'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColor?.hex === c.hex && (
                          <Check className={`w-3.5 h-3.5 ${c.hex === '#f8fafc' || c.hex === '#e2e8f0' ? 'text-zinc-900' : 'text-white'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector + Size Guide */}
              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-zinc-300">Kích cỡ thể thao:</span>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-orange-400 hover:text-orange-300 flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Bảng chọn size</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedProduct.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`min-w-10 px-3 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        selectedSize === s
                          ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                          : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-600'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* Size guide popup */}
                {showSizeGuide && (
                  <div className="mt-2 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs space-y-1.5 text-zinc-300">
                    <p className="font-semibold text-white">Gợi ý chọn size thể thao chuẩn Bando:</p>
                    <p>· Size S: 45 - 55kg (Cao 1m55 - 1m65)</p>
                    <p>· Size M: 55 - 65kg (Cao 1m65 - 1m72)</p>
                    <p>· Size L: 65 - 75kg (Cao 1m70 - 1m78)</p>
                    <p>· Size XL: 75 - 85kg (Cao 1m75 - 1m85)</p>
                    <p>· Size 2XL: Trên 85kg (Cao trên 1m80)</p>
                  </div>
                )}
              </div>

              {/* Quantity Stepper */}
              <div className="mt-5 flex items-center gap-4">
                <span className="text-xs font-semibold text-zinc-300">Số lượng:</span>
                <div className="flex items-center border border-zinc-800 rounded-lg bg-zinc-950">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-zinc-400 hover:text-white cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-bold text-white tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-zinc-400 hover:text-white cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Technical Features */}
              <div className="mt-6 pt-6 border-t border-zinc-800 space-y-2">
                <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wide">
                  Đặc tính công nghệ thể thao:
                </h3>
                <ul className="space-y-1.5 text-xs text-zinc-400">
                  {selectedProduct.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-orange-400 font-bold">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Description */}
              <div className="mt-4 pt-4 border-t border-zinc-800 text-xs text-zinc-400 leading-relaxed">
                <p>{selectedProduct.description}</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Thêm Vào Giỏ</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Mua Ngay</span>
              </button>
            </div>

            {/* Admin or importer delete option */}
            {(currentUser?.role === 'admin' || selectedProduct.isImported) && (
              <div className="pt-2 text-right">
                <button
                  onClick={handleDelete}
                  className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 ml-auto cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa sản phẩm này</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
