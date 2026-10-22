import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Heart, Link as LinkIcon, Search, User as UserIcon, X, LogOut, Package, ShieldCheck } from 'lucide-react';
import { SportCategory } from '../types';

export const Header: React.FC = () => {
  const {
    cartCount,
    wishlist,
    currentUser,
    setIsCartOpen,
    setIsAuthModalOpen,
    setAuthModalTab,
    setIsImportModalOpen,
    setIsOrderHistoryOpen,
    logout,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  } = useStore();

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const categories: { label: string; value: SportCategory }[] = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Bóng Đá', value: 'football' },
    { label: 'Chạy Bộ', value: 'running' },
    { label: 'Gym & Fitness', value: 'gym' },
    { label: 'Tennis / Cầu Lông', value: 'tennis' },
    { label: 'Dã Ngoại / Outdoor', value: 'outdoor' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
      {/* Top micro banner */}
      <div className="bg-zinc-900 border-b border-zinc-800/80 px-4 py-1.5 text-center text-xs text-zinc-400">
        <span className="text-orange-400 font-semibold tracking-wide">BANDO SPORTS:</span> Miễn phí vận chuyển toàn quốc đơn từ 500k · Hỗ trợ đưa link sản phẩm từ Nike, Adidas, Shopee, Decathlon
      </div>

      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-6 shrink-0">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setSelectedCategory('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group"
          >
            <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-wider text-white group-hover:text-orange-400 transition-colors">
              BANDO
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 border border-zinc-800 rounded px-1.5 py-0.5">
              SPORT
            </span>
          </a>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-400">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setSelectedCategory(cat.value);
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`hover:text-white transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.value ? 'text-orange-400 font-semibold' : ''
              }`}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Import link feature button */}
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-950 bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer active:scale-95"
            title="Đưa link sản phẩm từ web khác lên Bando"
          >
            <LinkIcon className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden sm:inline">Đưa Link Lên Web</span>
            <span className="sm:hidden">Nhập Link</span>
          </button>

          {/* Search Toggle */}
          <div className="relative">
            {showSearchInput ? (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 shadow-lg w-64 z-50">
                <Search className="w-4 h-4 text-zinc-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Tìm quần áo thể thao..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none w-full"
                />
                <button
                  onClick={() => setShowSearchInput(false)}
                  className="text-zinc-400 hover:text-white p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer"
                title="Tìm kiếm"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={() => {
              const el = document.getElementById('catalog-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="relative p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer"
            title="Danh sách yêu thích"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold bg-zinc-700 text-white rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer"
            title="Giỏ hàng"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold bg-orange-500 text-white rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Account */}
          <div className="relative">
            {currentUser ? (
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 p-1.5 hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer text-left"
              >
                <div className="w-7 h-7 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center text-xs font-bold">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:inline text-xs font-medium text-zinc-200 max-w-[100px] truncate">
                  {currentUser.name}
                </span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setAuthModalTab('login');
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors cursor-pointer"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Đăng nhập</span>
              </button>
            )}

            {/* User Dropdown */}
            {showUserDropdown && currentUser && (
              <div
                className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-2 z-50 text-xs"
                onMouseLeave={() => setShowUserDropdown(false)}
              >
                <div className="px-3 py-2 border-b border-zinc-800 mb-1">
                  <p className="font-semibold text-white truncate">{currentUser.name}</p>
                  <p className="text-zinc-400 text-[11px] truncate">{currentUser.email}</p>
                  <span className="inline-block mt-1 text-[10px] uppercase font-bold text-orange-400">
                    {currentUser.role === 'admin' ? 'Quản Trị Viên Shop' : 'Thành Viên Bando'}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    setIsOrderHistoryOpen(true);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-lg transition-colors cursor-pointer"
                >
                  <Package className="w-4 h-4 text-zinc-400" />
                  <span>Đơn hàng của tôi</span>
                </button>

                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    setIsImportModalOpen(true);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-orange-400 hover:bg-orange-950/30 rounded-lg transition-colors cursor-pointer"
                >
                  <LinkIcon className="w-4 h-4" />
                  <span>Đưa link sản phẩm mới</span>
                </button>

                <div className="border-t border-zinc-800 my-1" />

                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
