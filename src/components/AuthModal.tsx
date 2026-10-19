import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase.ts';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to sign out');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#002720]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-md w-full bg-[#fcf9f3] text-[#1c1c18] rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col gap-6 border border-[#ebe8e2]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-[#ebe8e2] pb-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-[#725b38] tracking-widest">
              Secure Firebase Authentication
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#002720]">
              {user ? 'My Account & Profile' : 'Sign In to Dreams Villa'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#ebe8e2] hover:bg-[#dcdad4] text-[#1c1c18] flex items-center justify-center transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold">
            {errorMsg}
          </div>
        )}

        {user ? (
          <div className="flex flex-col gap-6 items-center text-center">
            <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-[#fedeb2] shadow-md bg-[#002720] text-white flex items-center justify-center text-2xl font-bold">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
              ) : (
                user.email?.[0].toUpperCase() || 'U'
              )}
            </div>

            <div className="flex flex-col gap-1">
              <h4 className="font-serif text-xl font-bold text-[#002720]">
                {user.displayName || 'Verified Guest'}
              </h4>
              <p className="text-xs text-[#414846]">{user.email}</p>
              <span className="mt-2 inline-flex items-center gap-1 mx-auto px-3 py-1 rounded-full bg-[#bfecdf] text-[#002720] font-bold text-[11px]">
                <span className="material-symbols-outlined text-xs">verified</span>
                Firebase UID: {user.uid.slice(0, 10)}... (Securely Isolated)
              </span>
            </div>

            <p className="text-xs text-[#717976] leading-relaxed">
              Your personal bookings and saved itinerary records are encrypted and protected under Firebase Security Rules ensuring strict user data isolation.
            </p>

            <button
              onClick={handleSignOut}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#ba1a1a] hover:bg-[#93000a] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer"
              type="button"
            >
              {loading ? 'Signing Out...' : 'Sign Out of Account'}
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6 items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#002720] text-[#fedeb2] flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-3xl">lock</span>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-xs text-[#414846] leading-relaxed">
                Sign in securely with Google to save your direct villa reservations, access personal stay records, and manage isolated database entries.
              </p>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-[#f6f3ed] text-[#1c1c18] font-bold text-xs border border-[#c0c8c4] flex items-center justify-center gap-3 transition-all shadow-md cursor-pointer"
              type="button"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{loading ? 'Connecting to Google...' : 'Continue with Google Auth'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
