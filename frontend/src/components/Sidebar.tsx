import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';

const Sidebar: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const router = useRouter();

  const { user } = useAuth();

  const handleLogout = async () => {
    if (!auth) {
      // If auth isn't available, just navigate to signin and close sidebar.
      router.push('/signin');
      onClose();
      return;
    }

    try {
      await signOut(auth);
    } catch (err) {
      // ignore sign-out errors in the sidebar, but log for debugging
      // eslint-disable-next-line no-console
      console.warn('Sign out failed', err);
    }

    router.push('/signin');
    onClose();
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white border-r transition-transform duration-200 ease-in-out ${
        open ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:static md:inset-auto`}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold">BookIt</h1>
          <div className="mt-2 text-sm text-gray-600">{user?.email ?? 'Signed in as Guest'}</div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link href="/" className="block px-3 py-2 rounded hover:bg-gray-100">Home</Link>
          <Link href="/checkout" className="block px-3 py-2 rounded hover:bg-gray-100">Checkout</Link>
          <Link href="/result" className="block px-3 py-2 rounded hover:bg-gray-100">Result</Link>
          <Link href="/account" className="block px-3 py-2 rounded hover:bg-gray-100">Account</Link>
          <Link href="/settings" className="block px-3 py-2 rounded hover:bg-gray-100">Settings</Link>
          <Link href="/signin" className="block px-3 py-2 rounded hover:bg-gray-100">Sign In</Link>
          <Link href="/signup" className="block px-3 py-2 rounded hover:bg-gray-100">Sign Up</Link>
          <Link href="/forgot-password" className="block px-3 py-2 rounded hover:bg-gray-100">Forgot Password</Link>
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={() => router.push('/account')}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
          >
            Account
          </button>
          <button
            onClick={() => router.push('/settings')}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 mt-2"
          >
            Settings
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded hover:bg-red-50 text-red-600 mt-3"
          >
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
