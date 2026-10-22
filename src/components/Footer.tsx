import React from 'react';
import { useStore } from '../context/StoreContext';
import { Link2, ShieldCheck, Truck, RefreshCw, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setSelectedCategory, setIsImportModalOpen } = useStore();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 text-xs">
      {/* 3 Pillars strip */}
      <div className="border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Giao Hàng Toàn Quốc</h4>
              <p className="mt-1 text-zinc-400 leading-relaxed">
                Đóng gói tiêu chuẩn thể thao, miễn phí vận chuyển cho mọi đơn hàng từ 500.000₫.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Đổi Size Miễn Phí 7 Ngày</h4>
              <p className="mt-1 text-zinc-400 leading-relaxed">
                Không vừa size? Bando hỗ trợ shipper mang tận nhà đổi mẫu mới trong 7 ngày.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
              <Link2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Đưa Link Web Khác Lên Bando</h4>
              <p className="mt-1 text-zinc-400 leading-relaxed">
                Tính năng độc quyền cho phép dán link từ Nike, Adidas, Shopee, Decathlon để thêm vào giỏ.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand Col */}
        <div className="col-span-2 md:col-span-1 space-y-3">
          <span className="font-display text-2xl font-black tracking-wider text-white">
            BANDO
          </span>
          <p className="text-zinc-400 leading-relaxed">
            Thương hiệu và nền tảng trang phục thể thao chuyên nghiệp, đồng hành cùng bạn trên mọi hành trình rèn luyện.
          </p>
          <div className="pt-2 text-zinc-500 text-[11px] space-y-1">
            <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-orange-400" /> Quận 1, TP. Hồ Chí Minh</p>
            <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-orange-400" /> Hotline: 1900 8921</p>
            <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-orange-400" /> hotro@bando.vn</p>
          </div>
        </div>

        {/* Categories Col */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Môn Thể Thao</h4>
          <ul className="space-y-1.5">
            <li>
              <button
                onClick={() => setSelectedCategory('football')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Bóng đá & Thi đấu
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedCategory('running')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Chạy bộ Marathon & Trail
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedCategory('gym')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Gym & Thể hình HIIT
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedCategory('tennis')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Tennis & Cầu lông
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedCategory('outdoor')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Dã ngoại & Leo núi
              </button>
            </li>
          </ul>
        </div>

        {/* Features & Tools Col */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Tính Năng Đặc Biệt</h4>
          <ul className="space-y-1.5">
            <li>
              <button
                onClick={() => setIsImportModalOpen(true)}
                className="hover:text-orange-400 text-orange-400/90 transition-colors font-medium flex items-center gap-1 cursor-pointer"
              >
                <Link2 className="w-3.5 h-3.5" />
                <span>Đưa link web khác lên web</span>
              </button>
            </li>
            <li><span className="text-zinc-500">Trích xuất tự động Nike / Adidas</span></li>
            <li><span className="text-zinc-500">Đồng bộ sản phẩm Shopee Mall</span></li>
            <li><span className="text-zinc-500">Bảng size thể thao chuẩn Việt Nam</span></li>
            <li><span className="text-zinc-500">Thanh toán VietQR Napas 24/7</span></li>
          </ul>
        </div>

        {/* Policies Col */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Chính Sách & Hỗ Trợ</h4>
          <ul className="space-y-1.5 text-zinc-500">
            <li>Chính sách bảo hành sợi vải</li>
            <li>Quy định đổi trả hàng 7 ngày</li>
            <li>Chính sách bảo mật thông tin</li>
            <li>Hướng dẫn chọn size quần áo thể thao</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-zinc-900 py-6 text-center text-zinc-500 text-[11px]">
        <p>© 2026 BANDO SPORTSWEAR. Bản quyền thuộc về thương hiệu thể thao Bando.</p>
      </div>
    </footer>
  );
};
