import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, ArrowRight, Tag, ShoppingBag, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    cartSubtotal,
    discountAmount,
    couponCode,
    shippingFee,
    cartTotal,
    updateCartQuantity,
    removeFromCart,
    applyCoupon,
    setIsCheckoutOpen
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const formatVND = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setInputCoupon('');
    }
  };

  const freeShippingThreshold = 500000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShipPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-zinc-900 border-l border-zinc-800 h-full flex flex-col shadow-2xl">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/60">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-orange-400" />
            <h2 className="text-base font-bold text-white">Giỏ Hàng Của Bạn</h2>
            <span className="text-xs text-zinc-400 tabular-nums">({cart.length} món)</span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="p-4 bg-zinc-950/80 border-b border-zinc-800/80">
          {remainingForFreeShipping > 0 ? (
            <div>
              <p className="text-xs text-zinc-300">
                Mua thêm <strong className="text-orange-400 tabular-nums">{formatVND(remainingForFreeShipping)}</strong> để được <strong className="text-emerald-400">Miễn Phí Vận Chuyển</strong>!
              </p>
              <div className="mt-2 w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${freeShipPercent}%` }}
                />
              </div>
            </div>
          ) : (
            <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Đơn hàng của bạn đã đủ điều kiện Freeship toàn quốc!</span>
            </p>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.hex}-${index}`}
                className="p-3 bg-zinc-950/80 border border-zinc-800 rounded-xl flex gap-3 relative group"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800 shrink-0">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-white line-clamp-1">
                      {item.product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-zinc-400">
                      <span>Size: <strong className="text-zinc-200">{item.selectedSize}</strong></span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block border border-zinc-700"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        <span>{item.selectedColor.name}</span>
                      </span>
                    </div>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-zinc-800 rounded-md bg-zinc-900">
                      <button
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor.hex, -1)
                        }
                        className="px-2 py-0.5 text-xs text-zinc-400 hover:text-white"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-semibold text-white tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor.hex, 1)
                        }
                        className="px-2 py-0.5 text-xs text-zinc-400 hover:text-white"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-white tabular-nums">
                        {formatVND(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() =>
                    removeFromCart(item.product.id, item.selectedSize, item.selectedColor.hex)
                  }
                  className="absolute top-2 right-2 text-zinc-500 hover:text-rose-400 p-1 transition-colors"
                  title="Xóa"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          ) : (
            <div className="py-16 text-center text-zinc-500 space-y-3">
              <ShoppingBag className="w-10 h-10 mx-auto text-zinc-600" />
              <p className="text-sm">Giỏ hàng của bạn đang trống</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Khám Phá Sản Phẩm Ngay
              </button>
            </div>
          )}
        </div>

        {/* Footer: Coupon & Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-zinc-800 bg-zinc-950/90 space-y-4">
            {/* Promo code form */}
            <form onSubmit={handleApply} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Mã giảm giá (ví dụ: BANDO10)"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-orange-500 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 outline-none uppercase"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 rounded-lg transition-colors cursor-pointer"
              >
                Áp dụng
              </button>
            </form>

            {couponCode && (
              <p className="text-[11px] text-emerald-400 font-medium">
                ✓ Đang áp dụng mã: {couponCode}
              </p>
            )}
            {couponError && (
              <p className="text-[11px] text-rose-400">{couponError}</p>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>Tạm tính:</span>
                <span className="text-white tabular-nums">{formatVND(cartSubtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Giảm giá:</span>
                  <span className="tabular-nums">-{formatVND(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Phí vận chuyển:</span>
                <span className="text-white tabular-nums">
                  {shippingFee === 0 ? <span className="text-emerald-400">Miễn phí</span> : formatVND(shippingFee)}
                </span>
              </div>
              <div className="pt-2 border-t border-zinc-800 flex justify-between items-baseline text-sm font-bold text-white">
                <span>Tổng thanh toán:</span>
                <span className="text-lg text-orange-400 tabular-nums">{formatVND(cartTotal)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold text-sm rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Tiến Hành Đặt Hàng</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
