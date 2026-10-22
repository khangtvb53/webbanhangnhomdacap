import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { SportCategory } from '../types';
import { Link2, SlidersHorizontal, RotateCcw } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const {
    filteredProducts,
    products,
    selectedCategory,
    setSelectedCategory,
    selectedPlatform,
    setSelectedPlatform,
    priceFilter,
    setPriceFilter,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    setIsImportModalOpen
  } = useStore();

  const categories: { label: string; value: SportCategory }[] = [
    { label: 'Tất cả sản phẩm', value: 'all' },
    { label: 'Bóng Đá', value: 'football' },
    { label: 'Chạy Bộ', value: 'running' },
    { label: 'Gym & Fitness', value: 'gym' },
    { label: 'Tennis / Cầu Lông', value: 'tennis' },
    { label: 'Dã Ngoại / Outdoor', value: 'outdoor' }
  ];

  const platforms = [
    { label: 'Tất cả nguồn', value: 'all' },
    { label: '🔗 Nhập từ Web ngoài', value: 'imported' },
    { label: 'Bando Sportswear', value: 'bando' },
    { label: 'Nike', value: 'nike' },
    { label: 'Adidas', value: 'adidas' },
    { label: 'Decathlon', value: 'decathlon' }
  ];

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedPlatform('all');
    setPriceFilter('all');
    setSortBy('featured');
    setSearchQuery('');
  };

  return (
    <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-widest">
            <span>DANH MỤC TRANG PHỤC THỂ THAO</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{filteredProducts.length} SẢN PHẨM</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-1">
            BST ĐỒ THỂ THAO & VẬN ĐỘNG
          </h2>
        </div>

        {/* Quick action: Import from Link */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-orange-400 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 hover:border-orange-500/50"
          >
            <Link2 className="w-4 h-4" />
            <span>Đưa link web khác lên Bando</span>
          </button>
        </div>
      </div>

      {/* Sport Category Filter Tabs (Interactive Segmented Control) */}
      <div className="mt-6 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
              selectedCategory === cat.value
                ? 'bg-orange-500 text-white shadow-sm'
                : 'bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800/80'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Sub-Filters: Source Platform & Price & Sort */}
      <div className="mt-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
        {/* Source Platform Filter */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-zinc-500 font-medium mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Nguồn hàng:</span>
          </span>
          {platforms.map((p) => (
            <button
              key={p.value}
              onClick={() => setSelectedPlatform(p.value)}
              className={`px-2.5 py-1 rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                selectedPlatform === p.value
                  ? 'bg-zinc-800 text-white border-zinc-600 font-semibold'
                  : 'bg-zinc-950/60 text-zinc-400 border-zinc-800/60 hover:text-zinc-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Price & Sort Selects */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Price dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-500">Mức giá:</span>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value as any)}
              className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-300 focus:outline-none focus:border-zinc-600 cursor-pointer"
            >
              <option value="all">Tất cả giá</option>
              <option value="under300">Dưới 300.000₫</option>
              <option value="300to700">300.000₫ - 700.000₫</option>
              <option value="above700">Trên 700.000₫</option>
            </select>
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-500">Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-300 focus:outline-none focus:border-zinc-600 cursor-pointer"
            >
              <option value="featured">Nổi bật nhất</option>
              <option value="newest">Mới cập nhật</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="price-desc">Giá: Cao đến Thấp</option>
              <option value="rating">Đánh giá cao nhất</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Search Notification */}
      {searchQuery && (
        <div className="mt-4 flex items-center justify-between bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-lg text-xs">
          <span className="text-zinc-300">
            Kết quả tìm kiếm cho từ khóa: <strong className="text-orange-400">"{searchQuery}"</strong>
          </span>
          <button
            onClick={() => setSearchQuery('')}
            className="text-zinc-400 hover:text-white underline cursor-pointer"
          >
            Xóa tìm kiếm
          </button>
        </div>
      )}

      {/* Product Cards Grid: 3 columns on desktop */}
      {filteredProducts.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="mt-12 py-16 px-4 text-center rounded-2xl bg-zinc-900/50 border border-zinc-800 max-w-lg mx-auto">
          <div className="w-12 h-12 mx-auto rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 mb-4">
            <RotateCcw className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Không tìm thấy sản phẩm phù hợp</h3>
          <p className="text-xs text-zinc-400 mt-2 max-w-sm mx-auto">
            Hãy thử điều chỉnh bộ lọc hoặc bạn có thể tự dán link sản phẩm từ bất kỳ web nào để đưa lên Bando ngay!
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white rounded-xl transition-colors cursor-pointer"
            >
              Đặt lại bộ lọc
            </button>
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-xs font-semibold text-white rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>Đưa link sản phẩm lên</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
