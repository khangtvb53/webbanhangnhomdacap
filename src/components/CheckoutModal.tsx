import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, ShieldCheck, QrCode, CreditCard, Banknote, Truck, ArrowRight } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    discountAmount,
    shippingFee,
    cartTotal,
    currentUser,
    placeOrder
  } = useStore();

  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [city, setCity] = useState(currentUser?.city || 'TP. Hồ Chí Minh');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'vietqr' | 'momo'>('cod');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isCheckoutOpen) return null;

  const formatVND = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMsg('Vui lòng nhập họ và tên người nhận hàng');
      return;
    }
    if (!phone.trim() || phone.trim().length < 9) {
      setErrorMsg('Vui lòng nhập số điện thoại liên lạc hợp lệ');
      return;
    }
    if (!address.trim()) {
      setErrorMsg('Vui lòng nhập địa chỉ nhận hàng chi tiết');
      return;
    }

    placeOrder({
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city,
      note,
      paymentMethod
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/60">
          <div>
            <h2 className="text-base font-bold text-white">Thanh Toán & Đặt Hàng Bando</h2>
            <p className="text-xs text-zinc-400">Kiểm tra thông tin giao nhận và chọn phương thức thanh toán</p>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {errorMsg && (
            <div className="p-3 bg-rose-950/50 border border-rose-800/80 rounded-xl text-xs text-rose-300">
              {errorMsg}
            </div>
          )}

          {/* Customer & Shipping info */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wide flex items-center gap-2">
              <Truck className="w-4 h-4 text-orange-400" />
              <span>1. Thông tin giao hàng</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Họ tên người nhận *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:border-orange-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Số điện thoại nhận hàng *</label>
                <input
                  type="tel"
                  required
                  placeholder="Ví dụ: 0912345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:border-orange-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs text-zinc-400 mb-1">Địa chỉ giao hàng (Số nhà, đường, phường) *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: 123 Nguyễn Thị Minh Khai, P. Bến Thành"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:border-orange-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Tỉnh / Thành phố *</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:border-orange-500 outline-none"
                >
                  <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Hải Phòng">Hải Phòng</option>
                  <option value="Cần Thơ">Cần Thơ</option>
                  <option value="Bình Dương">Bình Dương</option>
                  <option value="Đồng Nai">Đồng Nai</option>
                  <option value="Tỉnh/Thành khác">Tỉnh/Thành khác</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">Ghi chú cho đơn vị vận chuyển (tùy chọn)</label>
              <input
                type="text"
                placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi đến..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-300 focus:border-orange-500 outline-none"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3 pt-4 border-t border-zinc-800">
            <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wide flex items-center gap-2">
              <Banknote className="w-4 h-4 text-orange-400" />
              <span>2. Phương thức thanh toán</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* COD */}
              <label
                onClick={() => setPaymentMethod('cod')}
                className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2 cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'bg-orange-500/10 border-orange-500 text-white'
                    : 'bg-zinc-950/70 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Banknote className="w-5 h-5 text-orange-400" />
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-orange-500"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">COD Tiền Mặt</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Thanh toán khi nhận hàng</p>
                </div>
              </label>

              {/* VietQR */}
              <label
                onClick={() => setPaymentMethod('vietqr')}
                className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2 cursor-pointer transition-all ${
                  paymentMethod === 'vietqr'
                    ? 'bg-orange-500/10 border-orange-500 text-white'
                    : 'bg-zinc-950/70 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <QrCode className="w-5 h-5 text-sky-400" />
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'vietqr'}
                    onChange={() => setPaymentMethod('vietqr')}
                    className="accent-orange-500"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Chuyển Khoản VietQR</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Quét mã QR mọi ngân hàng</p>
                </div>
              </label>

              {/* MoMo */}
              <label
                onClick={() => setPaymentMethod('momo')}
                className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2 cursor-pointer transition-all ${
                  paymentMethod === 'momo'
                    ? 'bg-orange-500/10 border-orange-500 text-white'
                    : 'bg-zinc-950/70 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <CreditCard className="w-5 h-5 text-pink-400" />
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'momo'}
                    onChange={() => setPaymentMethod('momo')}
                    className="accent-orange-500"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Ví MoMo / Thẻ ATM</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Thanh toán điện tử 24/7</p>
                </div>
              </label>
            </div>

            {/* QR Simulation Preview if VietQR is selected */}
            {paymentMethod === 'vietqr' && (
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl flex flex-col sm:flex-row items-center gap-4 text-xs">
                <div className="w-28 h-28 bg-white p-2 rounded-lg flex items-center justify-center shrink-0">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=247-BANDO-SPORTS-${cartTotal}`}
                    alt="VietQR Demo"
                    className="w-full h-full"
                  />
                </div>
                <div className="space-y-1 text-zinc-300">
                  <p className="font-bold text-white">Thông tin tài khoản nhận chuyển khoản:</p>
                  <p>· Ngân hàng: <span className="text-sky-400 font-semibold">MBBank (Ngân hàng Quân Đội)</span></p>
                  <p>· Số tài khoản: <span className="font-mono text-white font-bold">9999 8888 2026</span></p>
                  <p>· Chủ tài khoản: <span className="font-semibold text-white">BANDO SPORTS VIETNAM</span></p>
                  <p>· Số tiền: <span className="text-orange-400 font-bold tabular-nums">{formatVND(cartTotal)}</span></p>
                  <p className="text-[11px] text-zinc-500 italic">* Hệ thống sẽ tự động xác nhận đơn ngay khi quý khách chuyển khoản xong.</p>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary in Checkout */}
          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2 text-xs">
            <div className="flex justify-between text-zinc-400">
              <span>Số lượng sản phẩm:</span>
              <span className="text-white tabular-nums">{cart.length} món đồ thể thao</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Tạm tính:</span>
              <span className="text-white tabular-nums">{formatVND(cartSubtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Khuyến mãi / Giảm giá:</span>
                <span className="tabular-nums">-{formatVND(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-zinc-400">
              <span>Phí vận chuyển:</span>
              <span className="text-white tabular-nums">
                {shippingFee === 0 ? <span className="text-emerald-400">Miễn phí giao hàng</span> : formatVND(shippingFee)}
              </span>
            </div>
            <div className="pt-2 border-t border-zinc-800 flex justify-between items-baseline font-bold text-sm text-white">
              <span>Tổng số tiền thanh toán:</span>
              <span className="text-lg text-orange-400 tabular-nums">{formatVND(cartTotal)}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsCheckoutOpen(false)}
              className="px-4 py-2.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              Quay lại giỏ hàng
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold text-sm rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Xác Nhận Đặt Hàng</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
