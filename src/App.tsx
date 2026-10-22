/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductGrid } from './components/ProductGrid';
import { ProductImportModal } from './components/ProductImportModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { AuthModal } from './components/AuthModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { Link2, Sparkles, ShoppingBag, ShieldCheck, Zap } from 'lucide-react';

const MainContent: React.FC = () => {
  const { setIsImportModalOpen } = useStore();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Top Header */}
      <Header />

      <main className="flex-1">
        {/* Campaign Hero Banner */}
        <HeroBanner />

        {/* Product Catalog Section with Filters */}
        <ProductGrid />

        {/* Feature Explainer: How the Link Import Works */}
        <section className="bg-zinc-900/40 border-y border-zinc-800/80 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-widest">
                <span>TÍNH NĂNG ĐỘT PHÁ TẠI BANDO</span>
                <span aria-hidden="true">·</span>
                <span>CHỦ ĐỘNG NGUỒN HÀNG</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-1">
                LÀM SAO ĐỂ ĐƯA LINK TỪ WEB KHÁC LÊN BANDO?
              </h2>
              <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                Không cần nhập liệu thủ công rườm rà. Bando trang bị bộ bóc tách thông minh giúp bạn thêm bất kỳ món đồ thể thao nào vào danh mục chỉ trong 3 bước đơn giản.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-3 relative group hover:border-zinc-700 transition-colors">
                <span className="font-display text-3xl font-black text-orange-500/80">01</span>
                <h3 className="text-base font-bold text-white">Sao chép đường link sản phẩm</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Tìm thấy áo quần thể thao ưng ý trên Nike, Adidas, Shopee, Decathlon hay bất kỳ shop online nào? Chỉ cần copy URL từ thanh địa chỉ trình duyệt.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-3 relative group hover:border-zinc-700 transition-colors">
                <span className="font-display text-3xl font-black text-orange-500/80">02</span>
                <h3 className="text-base font-bold text-white">Bando tự động trích xuất thông tin</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Dán link vào công cụ Bando. Hệ thống tự động nhận diện thương hiệu, hình ảnh độ nét cao, gợi ý môn thể thao (Gym, Chạy bộ, Bóng đá) và giá bán.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-3 relative group hover:border-zinc-700 transition-colors">
                <span className="font-display text-3xl font-black text-orange-500/80">03</span>
                <h3 className="text-base font-bold text-white">Đăng sản phẩm & Mua sắm tức thì</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Sản phẩm sẽ xuất hiện ngay trên gian hàng Bando với nhãn nguồn gốc rõ ràng, kèm nút xem lại trang web gốc và thêm vào giỏ hàng bình thường!
                </p>
              </div>
            </div>

            {/* Quick launch strip */}
            <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-orange-500/10 via-zinc-900 to-zinc-900 border border-orange-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Bạn đang có sẵn link quần áo thể thao?</h4>
                  <p className="text-xs text-zinc-400">Hãy thử nhập ngay để trải nghiệm tính năng này trực tiếp trên gian hàng Bando.</p>
                </div>
              </div>
              <button
                onClick={() => setIsImportModalOpen(true)}
                className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-lg shadow-orange-500/20"
              >
                Mở Trình Đưa Link Lên Web
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <ProductImportModal />
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <AuthModal />
      <OrderHistoryModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
