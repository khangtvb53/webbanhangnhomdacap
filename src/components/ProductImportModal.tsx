import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { SAMPLE_URL_PRESETS, extractProductFromUrl } from '../utils/urlImporter';
import { ImportPreviewData, SportCategory } from '../types';
import { X, Link2, Sparkles, CheckCircle2, ArrowRight, ExternalLink, RefreshCw } from 'lucide-react';

export const ProductImportModal: React.FC = () => {
  const { isImportModalOpen, setIsImportModalOpen, importProduct, setSelectedProduct } = useStore();

  const [inputUrl, setInputUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [previewData, setPreviewData] = useState<ImportPreviewData | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isImportModalOpen) return null;

  const handleAnalyze = (urlToAnalyze?: string) => {
    const targetUrl = (urlToAnalyze || inputUrl).trim();
    if (!targetUrl) {
      setErrorMsg('Vui lòng dán hoặc nhập một đường link sản phẩm.');
      return;
    }
    setErrorMsg('');
    setIsAnalyzing(true);

    // Simulate smart network scraping / parsing
    setTimeout(() => {
      try {
        const extracted = extractProductFromUrl(targetUrl);
        setPreviewData(extracted);
      } catch (err) {
        setErrorMsg('Không thể trích xuất link này. Vui lòng thử lại với một link hợp lệ.');
      } finally {
        setIsAnalyzing(false);
      }
    }, 600);
  };

  const handleApplyPreset = (preset: typeof SAMPLE_URL_PRESETS[0]) => {
    setInputUrl(preset.url);
    handleAnalyze(preset.url);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewData) return;

    if (!previewData.name.trim()) {
      setErrorMsg('Tên sản phẩm không được để trống.');
      return;
    }
    if (!previewData.price || previewData.price <= 0) {
      setErrorMsg('Giá bán phải lớn hơn 0đ.');
      return;
    }

    const created = importProduct(previewData);
    setPreviewData(null);
    setInputUrl('');
    // Optionally open the product details to view the newly published item
    setSelectedProduct(created);
  };

  const handleToggleSize = (size: string) => {
    if (!previewData) return;
    const exists = previewData.sizes.includes(size);
    const updated = exists
      ? previewData.sizes.filter(s => s !== size)
      : [...previewData.sizes, size];
    setPreviewData({ ...previewData, sizes: updated.length ? updated : ['M'] });
  };

  const formatVND = (val: number) => {
    return new Intl.NumberFormat('vi-VN').format(val) + '₫';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Link2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Đưa Link Quần Áo Thể Thao Lên Bando</h2>
              <p className="text-xs text-zinc-400">Tự động nhận diện thông tin từ Nike, Adidas, Shopee, Decathlon, Gymshark...</p>
            </div>
          </div>
          <button
            onClick={() => setIsImportModalOpen(false)}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Step 1: Input URL and presets */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wide">
              Dán đường link sản phẩm từ web khác
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  type="url"
                  placeholder="Ví dụ: https://www.nike.com/vn/t/... hoặc shopee.vn/..."
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAnalyze();
                    }
                  }}
                  className="w-full bg-zinc-950 border border-zinc-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm text-white placeholder-zinc-500 px-4 py-3 rounded-xl transition-all outline-none"
                />
                {inputUrl && (
                  <button
                    onClick={() => {
                      setInputUrl('');
                      setPreviewData(null);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleAnalyze()}
                disabled={isAnalyzing}
                className="px-5 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-md shadow-orange-500/20"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Đang bóc tách...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Phân Tích Link</span>
                  </>
                )}
              </button>
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-400 font-medium">{errorMsg}</p>
            )}

            {/* Presets to test instantly */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] text-zinc-400 font-medium">Bấm thử link mẫu có sẵn:</span>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_URL_PRESETS.map((preset) => (
                  <button
                    key={preset.url}
                    type="button"
                    onClick={() => handleApplyPreset(preset)}
                    className="px-2.5 py-1 text-xs text-zinc-300 bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="text-orange-400 font-semibold">{preset.platform}</span>
                    <span className="text-zinc-400">·</span>
                    <span className="truncate max-w-[140px]">{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: Extracted Preview & Form */}
          {previewData && (
            <form onSubmit={handlePublish} className="border-t border-zinc-800 pt-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Trích xuất thành công từ: {previewData.sourcePlatform}</span>
                </div>
                <a
                  href={previewData.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
                >
                  <span>Xem link gốc</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Product Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Image preview */}
                <div className="md:col-span-4 space-y-3">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 relative">
                    <img
                      src={previewData.imageUrl}
                      alt={previewData.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-zinc-950/80 backdrop-blur-sm text-[10px] font-bold text-orange-400 px-2 py-0.5 rounded border border-zinc-800">
                      {previewData.sourcePlatform}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">URL Ảnh sản phẩm (hoặc đổi link ảnh)</label>
                    <input
                      type="text"
                      value={previewData.imageUrl}
                      onChange={(e) => setPreviewData({ ...previewData, imageUrl: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* Form fields */}
                <div className="md:col-span-8 space-y-4">
                  {/* Name & Brand */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">Tên sản phẩm thể thao</label>
                      <input
                        type="text"
                        value={previewData.name}
                        onChange={(e) => setPreviewData({ ...previewData, name: e.target.value })}
                        required
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:border-orange-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">Thương hiệu</label>
                      <input
                        type="text"
                        value={previewData.brand}
                        onChange={(e) => setPreviewData({ ...previewData, brand: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:border-orange-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Price & Original Price */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">Giá bán Bando (₫)</label>
                      <input
                        type="number"
                        min="1000"
                        step="10000"
                        value={previewData.price}
                        onChange={(e) => setPreviewData({ ...previewData, price: Number(e.target.value) })}
                        required
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-sm font-semibold text-orange-400 focus:border-orange-500 outline-none tabular-nums"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">Giá gốc niêm yết (₫)</label>
                      <input
                        type="number"
                        min="0"
                        step="10000"
                        value={previewData.originalPrice || ''}
                        onChange={(e) => setPreviewData({ ...previewData, originalPrice: e.target.value ? Number(e.target.value) : undefined })}
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-400 focus:border-orange-500 outline-none tabular-nums"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">Môn thể thao</label>
                      <select
                        value={previewData.category}
                        onChange={(e) => setPreviewData({ ...previewData, category: e.target.value as SportCategory })}
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-white focus:border-orange-500 outline-none"
                      >
                        <option value="running">Chạy Bộ</option>
                        <option value="football">Bóng Đá</option>
                        <option value="gym">Gym & Fitness</option>
                        <option value="tennis">Tennis / Cầu Lông</option>
                        <option value="outdoor">Dã Ngoại / Outdoor</option>
                      </select>
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Kích cỡ có sẵn (bấm để chọn/bỏ chọn)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'].map((s) => {
                        const active = previewData.sizes.includes(s);
                        return (
                          <button
                            type="button"
                            key={s}
                            onClick={() => handleToggleSize(s)}
                            className={`px-3 py-1 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                              active
                                ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                                : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                            }`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Mô tả sản phẩm</label>
                    <textarea
                      rows={3}
                      value={previewData.description}
                      onChange={(e) => setPreviewData({ ...previewData, description: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs text-zinc-300 focus:border-orange-500 outline-none resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setPreviewData(null)}
                  className="px-4 py-2.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  Hủy & Nhập link khác
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Đăng Sản Phẩm Lên Bando</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
