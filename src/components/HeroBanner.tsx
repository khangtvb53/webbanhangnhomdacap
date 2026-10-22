import React from 'react';
import { useStore } from '../context/StoreContext';
import { Link2, ArrowRight, ShieldCheck, Zap, Globe2 } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setIsImportModalOpen } = useStore();

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative bg-zinc-950 border-b border-zinc-900 overflow-hidden">
      {/* 2-column split with items-stretch */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Column 1: Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-widest">
              <span>BANDO SPORTSWEAR</span>
              <span aria-hidden="true">·</span>
              <span>NỀN TẢNG THỂ THAO ĐA NGUỒN</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.05] text-balance">
              CHINH PHỤC MỌI GIỚI HẠN VẬN ĐỘNG CÙNG BANDO
            </h1>

            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl leading-relaxed">
              Trang web phân phối trang phục và phụ kiện thể thao chuyên nghiệp. Đặc biệt tích hợp công cụ 
              <span className="text-white font-medium"> nhập sản phẩm tự động từ bất kỳ đường link nào </span> 
              (Nike, Adidas, Shopee, Decathlon...) để mua sắm và quản lý dễ dàng tại một nơi duy nhất.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={scrollToCatalog}
                className="px-6 py-3.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold text-sm rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Xem Sản Phẩm Thể Thao</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsImportModalOpen(true)}
                className="px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 active:scale-95 text-zinc-100 border border-zinc-800 font-semibold text-sm rounded-xl transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 group"
              >
                <Link2 className="w-4 h-4 text-orange-400 group-hover:rotate-45 transition-transform" />
                <span>Đưa Link Lên Web Ngay</span>
              </button>
            </div>

            {/* Micro assurances */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-orange-400" />
                <span>Trích xuất link trong 2 giây</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% kiểm định form & chất vải</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe2 className="w-4 h-4 text-sky-400" />
                <span>Hỗ trợ hơn 20 nền tảng web</span>
              </div>
            </div>
          </div>

          {/* Column 2: Generated High-Res Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 aspect-[16/10] sm:aspect-[4/3] shadow-2xl bg-zinc-900">
              <img
                src="/src/assets/images/hero_bando_sportswear_1792669046266.jpg"
                alt="Bando Sportswear Athletic Performance Runner"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Overlay card */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-zinc-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">BST Runner & Fitness 2026</p>
                  <p className="text-[11px] text-zinc-400">Công nghệ dệt AeroCool & Kháng gió Pro Shield</p>
                </div>
                <span className="text-xs font-bold text-orange-400 bg-orange-950/60 border border-orange-500/30 px-2 py-1 rounded">
                  Mới Ra Mắt
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI Trust Strip below hero */}
        <div className="mt-12 pt-8 border-t border-zinc-900 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <p className="font-display text-2xl font-bold text-white tabular-nums">12.500+</p>
            <p className="text-xs text-zinc-400">Sản phẩm thể thao đã giao</p>
          </div>
          <div className="space-y-1">
            <p className="font-display text-2xl font-bold text-white tabular-nums">20+ Nền Tảng</p>
            <p className="text-xs text-zinc-400">Nike, Adidas, Shopee, Decathlon...</p>
          </div>
          <div className="space-y-1">
            <p className="font-display text-2xl font-bold text-white tabular-nums">4.9 / 5.0 ⭐</p>
            <p className="text-xs text-zinc-400">Đánh giá từ khách hàng yêu thể thao</p>
          </div>
          <div className="space-y-1">
            <p className="font-display text-2xl font-bold text-white tabular-nums">Đổi Trả 7 Ngày</p>
            <p className="text-xs text-zinc-400">Miễn phí đổi size nếu không vừa</p>
          </div>
        </div>
      </div>
    </div>
  );
};
