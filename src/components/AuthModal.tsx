import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, User, Lock, Mail, Phone, ArrowRight, UserCheck } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    login,
    register,
    loginAsDemo
  } = useStore();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('ttrankhangg@gmail.com');
  const [loginPassword, setLoginPassword] = useState('bando2026');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    const res = await login(loginEmail, loginPassword);
    setLoading(false);
    if (!res.success) {
      setErrorMsg(res.message);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    const res = await register(regName, regEmail, regPhone, regPassword);
    setLoading(false);
    if (!res.success) {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/60">
          <div>
            <h2 className="text-base font-bold text-white">
              {authModalTab === 'login' ? 'Đăng Nhập Tài Khoản' : 'Đăng Ký Thành Viên'}
            </h2>
            <p className="text-xs text-zinc-400">Trải nghiệm mua sắm đồ thể thao tại Bando</p>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="p-1 mx-6 mt-4 bg-zinc-950 rounded-xl border border-zinc-800 flex">
          <button
            type="button"
            onClick={() => {
              setAuthModalTab('login');
              setErrorMsg('');
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              authModalTab === 'login'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Đăng Nhập
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthModalTab('register');
              setErrorMsg('');
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              authModalTab === 'register'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Đăng Ký
          </button>
        </div>

        {errorMsg && (
          <div className="mx-6 mt-4 p-3 bg-rose-950/50 border border-rose-800/80 rounded-xl text-xs text-rose-300">
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        {authModalTab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs text-zinc-300 mb-1">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:border-orange-500 outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs text-zinc-300">Mật khẩu</label>
                <button
                  type="button"
                  onClick={() => alert('Vui lòng sử dụng tài khoản mẫu demo hoặc nhập bất kỳ mật khẩu nào để thử nghiệm')}
                  className="text-[11px] text-orange-400 hover:underline"
                >
                  Quên mật khẩu?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:border-orange-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold text-sm rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>{loading ? 'Đang xác thực...' : 'Đăng Nhập Ngay'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick Demo Logins */}
            <div className="pt-4 border-t border-zinc-800 space-y-2">
              <span className="text-[11px] text-zinc-400 font-medium block text-center">
                Hoặc trải nghiệm nhanh với tài khoản mẫu:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => loginAsDemo('customer')}
                  className="p-2 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-[11px] text-zinc-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5 text-orange-400" />
                  <span>Khách Hàng Demo</span>
                </button>
                <button
                  type="button"
                  onClick={() => loginAsDemo('admin')}
                  className="p-2 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-[11px] text-zinc-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5 text-sky-400" />
                  <span>Quản Lý Shop</span>
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* Register Form */
          <form onSubmit={handleRegisterSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs text-zinc-300 mb-1">Họ và tên *</label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Trần Đăng Khang"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:border-orange-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-zinc-300 mb-1">Email đăng ký *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:border-orange-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-zinc-300 mb-1">Số điện thoại *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  placeholder="0912 345 678"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:border-orange-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-zinc-300 mb-1">Tạo mật khẩu *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Tối thiểu 6 ký tự"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:border-orange-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold text-sm rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>{loading ? 'Đang tạo tài khoản...' : 'Hoàn Tất Đăng Ký'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
