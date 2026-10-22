import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Package, Truck, CheckCircle2, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { OrderStatus } from '../types';

export const OrderHistoryModal: React.FC = () => {
  const { isOrderHistoryOpen, setIsOrderHistoryOpen, orders, currentUser } = useStore();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  if (!isOrderHistoryOpen) return null;

  const formatVND = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="text-amber-400 bg-amber-950/60 border border-amber-800/80 px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Chờ xác nhận</span>
          </span>
        );
      case 'processing':
        return (
          <span className="text-sky-400 bg-sky-950/60 border border-sky-800/80 px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1">
            <Package className="w-3 h-3" />
            <span>Đang đóng gói</span>
          </span>
        );
      case 'shipping':
        return (
          <span className="text-orange-400 bg-orange-950/60 border border-orange-800/80 px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1">
            <Truck className="w-3 h-3" />
            <span>Đang vận chuyển</span>
          </span>
        );
      case 'delivered':
        return (
          <span className="text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Giao thành công</span>
          </span>
        );
      default:
        return (
          <span className="text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded text-[11px]">
            {status}
          </span>
        );
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (filterStatus === 'all') return true;
    return order.status === filterStatus;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/60 shrink-0">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-orange-400" />
            <div>
              <h2 className="text-base font-bold text-white">Lịch Sử Đơn Hàng Của Tôi</h2>
              <p className="text-xs text-zinc-400">Theo dõi trạng thái và kiện hàng thể thao Bando</p>
            </div>
          </div>
          <button
            onClick={() => setIsOrderHistoryOpen(false)}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status filter tabs */}
        <div className="px-6 py-3 border-b border-zinc-800/80 bg-zinc-950/30 flex items-center gap-2 overflow-x-auto shrink-0">
          {[
            { label: 'Tất cả đơn', value: 'all' },
            { label: 'Chờ xác nhận', value: 'pending' },
            { label: 'Đang vận chuyển', value: 'shipping' },
            { label: 'Đã hoàn tất', value: 'delivered' }
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilterStatus(tab.value)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                filterStatus === tab.value
                  ? 'bg-zinc-800 text-white border border-zinc-700'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders list */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              const isExpanded = expandedOrderId === order.id;
              return (
                <div
                  key={order.id}
                  className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white text-sm">{order.id}</span>
                        <span className="text-zinc-500">·</span>
                        <span className="text-xs text-zinc-400">
                          {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        Vận đơn: <span className="font-mono text-zinc-300">{order.trackingCode}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {getStatusBadge(order.status)}
                      <button
                        onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                        className="text-zinc-400 hover:text-white p-1"
                        title={isExpanded ? 'Thu gọn' : 'Xem chi tiết'}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Summary row */}
                  <div className="pt-2 border-t border-zinc-900 flex items-center justify-between text-xs">
                    <span className="text-zinc-400">
                      {order.items.length} mặt hàng · Phương thức:{' '}
                      <strong className="text-zinc-300 uppercase">
                        {order.paymentMethod === 'cod' ? 'COD' : order.paymentMethod === 'vietqr' ? 'VietQR' : 'MoMo'}
                      </strong>
                    </span>
                    <span className="font-bold text-orange-400 text-sm tabular-nums">
                      {formatVND(order.total)}
                    </span>
                  </div>

                  {/* Expanded Item list */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-zinc-900 space-y-2">
                      <p className="text-[11px] font-semibold text-zinc-400 uppercase">Chi tiết gói hàng:</p>
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs bg-zinc-900/60 p-2 rounded-lg">
                          <div className="flex items-center gap-2">
                            <img
                              src={it.product.imageUrl}
                              alt={it.product.name}
                              referrerPolicy="no-referrer"
                              className="w-8 h-8 rounded object-cover"
                            />
                            <div>
                              <p className="font-medium text-white truncate max-w-[200px] sm:max-w-xs">
                                {it.product.name}
                              </p>
                              <p className="text-[10px] text-zinc-400">
                                Size: {it.selectedSize} · Màu: {it.selectedColor.name} · SL: {it.quantity}
                              </p>
                            </div>
                          </div>
                          <span className="font-medium text-zinc-200 tabular-nums">
                            {formatVND(it.product.price * it.quantity)}
                          </span>
                        </div>
                      ))}
                      <div className="text-[11px] text-zinc-400 pt-1">
                        Giao tới: {order.customerName} - {order.phone} - {order.address}, {order.city}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-zinc-500 space-y-2">
              <Package className="w-8 h-8 mx-auto text-zinc-600" />
              <p className="text-xs">Không có đơn hàng nào trong mục này</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
