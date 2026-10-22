import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, ShoppingBag, Eye, ExternalLink } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setSelectedProduct, addToCart, toggleWishlist, isWishlisted } = useStore();
  const [imageError, setImageError] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const formatVND = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0] || 'L';
    const defaultColor = product.colors[0] || { name: 'Đen', hex: '#18181b' };
    addToCart(product, defaultSize, defaultColor, 1);
  };

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="group relative bg-zinc-900/90 rounded-2xl border border-zinc-800/80 overflow-hidden flex flex-col hover:border-zinc-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40 cursor-pointer"
    >
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] bg-zinc-950 overflow-hidden">
        {!imageError ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-zinc-900 to-zinc-950 text-center">
            <span className="font-display text-2xl font-bold text-zinc-700">BANDO</span>
            <span className="text-xs text-zinc-500 mt-1">{product.name}</span>
          </div>
        )}

        {/* Source or Tag indicator (Max 1 subtle text tag) */}
        {product.isImported && product.sourcePlatform ? (
          <div className="absolute top-2.5 left-2.5 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 px-2 py-0.5 rounded text-[11px] font-medium text-orange-400">
            Nguồn: {product.sourcePlatform}
          </div>
        ) : discountPercent > 0 ? (
          <div className="absolute top-2.5 left-2.5 bg-orange-600/90 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-bold text-white">
            -{discountPercent}%
          </div>
        ) : null}

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
            wishlisted
              ? 'bg-rose-500/20 text-rose-500 border border-rose-500/40'
              : 'bg-zinc-950/60 text-zinc-400 hover:text-white border border-zinc-800/60'
          }`}
          title={wishlisted ? 'Bỏ thích' : 'Yêu thích'}
        >
          <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Quick action overlay */}
        <div className="absolute inset-x-2 bottom-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Thêm Nhanh</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Metadata line with unboxed text and bullet separator */}
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
            <span className="uppercase tracking-wider text-zinc-400">{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{product.category === 'football' ? 'Bóng đá' : product.category === 'running' ? 'Chạy bộ' : product.category === 'gym' ? 'Gym/Fitness' : product.category === 'tennis' ? 'Tennis/Cầu lông' : 'Outdoor'}</span>
          </div>

          <h3 className="mt-1 text-sm font-semibold text-zinc-100 line-clamp-2 leading-snug group-hover:text-orange-400 transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Sizes preview */}
        <div className="flex items-center gap-1 text-[11px] text-zinc-400">
          <span className="text-zinc-500">Size:</span>
          {product.sizes.slice(0, 4).map((s) => (
            <span key={s} className="px-1 py-0.2 bg-zinc-800/80 rounded text-zinc-300">
              {s}
            </span>
          ))}
          {product.sizes.length > 4 && <span>+{product.sizes.length - 4}</span>}
        </div>

        {/* Price & Rating */}
        <div className="pt-2 border-t border-zinc-800/60 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-white tabular-nums">
              {formatVND(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-zinc-500 line-through tabular-nums">
                {formatVND(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="text-xs text-zinc-400 tabular-nums">
            ⭐ {product.rating} <span className="text-zinc-600">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
