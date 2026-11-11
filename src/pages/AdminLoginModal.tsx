import React, { useState } from 'react';
import { Lock, X, AlertCircle, Loader2 } from 'lucide-react';
import { api, authStorage } from '../services/api.ts';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    setError(null);

    try {
      const res = await api.adminLogin(password);
      if (res.success && res.token) {
        authStorage.setToken(res.token);
        onLoginSuccess();
        onClose();
        setPassword('');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid administrator password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full border border-[#E8E9ED] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-6 border-b border-[#E8E9ED] flex items-center justify-between bg-gray-50/80">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#17191D] text-white flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#17191D]">Staff & Admin Portal</h3>
              <p className="text-[11px] text-[#747982]">iCare zone Workshop Management</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#17191D]">
              Administrator Passcode
            </label>
            <input
              type="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-[#E8E9ED] rounded-xl px-3.5 py-2.5 text-xs text-[#17191D] focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <div className="pt-1 flex items-center justify-between text-[11px] text-gray-400">
              <span>Default initial passcode:</span>
              <code className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded font-mono font-bold">admin123</code>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 bg-[#1677FF] hover:bg-blue-600 disabled:opacity-50 text-white font-bold rounded-xl text-xs shadow-xs transition-colors flex items-center justify-center space-x-1.5"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <span>Access Management Console</span>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
