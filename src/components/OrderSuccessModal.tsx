import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, Package, Truck, ArrowRight, X } from 'lucide-react';

export const OrderSuccessModal: React.FC = () => {
  const { lastPlacedOrder, setLastPlacedOrder, setIsOrderHistoryOpen } = useStore();

  if (!lastPlacedOrder) return null;

  const formatVND = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 text-center space-y-6">
        <button
          onClick={() => setLastPlacedOrder(null)}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Đặt Hàng Thành Công!</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Cảm ơn bạn đã lựa chọn Bando Sportswear. Đơn hàng đang được chuẩn bị đóng gói.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-left space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-zinc-500">Mã đơn hàng:</span>
            <span className="font-mono font-bold text-orange-400">{lastPlacedOrder.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Mã vận đơn bưu cục:</span>
            <span className="font-mono text-zinc-200">{lastPlacedOrder.trackingCode}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Người nhận:</span>
            <span className="text-zinc-200 font-medium">{lastPlacedOrder.customerName} ({lastPlacedOrder.phone})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Địa chỉ giao:</span>
            <span className="text-zinc-200 text-right truncate max-w-[200px]">{lastPlacedOrder.address}, {lastPlacedOrder.city}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Hình thức thanh toán:</span>
            <span className="text-zinc-200 uppercase font-medium">
              {lastPlacedOrder.paymentMethod === 'cod' ? 'Tiền mặt khi nhận (COD)' : lastPlacedOrder.paymentMethod === 'vietqr' ? 'Chuyển khoản VietQR' : 'Ví MoMo'}
            </span>
          </div>
          <div className="pt-2 border-t border-zinc-800/80 flex justify-between font-bold text-white text-sm">
            <span>Tổng thanh toán:</span>
            <span className="text-orange-400 tabular-nums">{formatVND(lastPlacedOrder.total)}</span>
          </div>
        </div>

        {/* 4-Step Shipping Timeline */}
        <div className="p-4 bg-zinc-950/70 border border-zinc-800/80 rounded-xl">
          <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wide text-left mb-3">
            Tiến độ đơn hàng:
          </p>
          <div className="grid grid-cols-4 gap-1 text-[11px]">
            <div className="text-emerald-400 font-semibold">
              <div className="h-1 bg-emerald-500 rounded-full mb-1.5" />
              <span>Tiếp nhận</span>
            </div>
            <div className="text-orange-400 font-semibold">
              <div className="h-1 bg-orange-500 rounded-full mb-1.5 animate-pulse" />
              <span>Đóng gói</span>
            </div>
            <div className="text-zinc-500">
              <div className="h-1 bg-zinc-800 rounded-full mb-1.5" />
              <span>Vận chuyển</span>
            </div>
            <div className="text-zinc-500">
              <div className="h-1 bg-zinc-800 rounded-full mb-1.5" />
              <span>Giao hàng</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => {
              setLastPlacedOrder(null);
              setIsOrderHistoryOpen(true);
            }}
            className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Package className="w-4 h-4 text-zinc-400" />
            <span>Xem Đơn Hàng Của Tôi</span>
          </button>
          <button
            onClick={() => setLastPlacedOrder(null)}
            className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-xs font-semibold text-white rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Tiếp Tục Mua Sắm</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
