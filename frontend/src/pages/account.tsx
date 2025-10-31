import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useToast } from '../components/Toast';

export default function AccountPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/signin');
    }
  }, [user]);

  if (!user) return null; // redirecting

  const doSignOut = async () => {
    if (!auth) {
      router.push('/signin');
      return;
    }

    try {
      await signOut(auth);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Sign out failed', err);
    }

    router.push('/signin');
  };

  const toast = useToast();

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Your account</h2>
      <div className="space-y-2">
        <div>
          <div className="text-sm text-gray-500">Email</div>
          <div className="font-medium">{user.email}</div>
        </div>

        <div>
          <div className="text-sm text-gray-500">UID</div>
          <div className="font-mono text-sm">{user.uid}</div>
        </div>

        <div className="mt-4">
          <button onClick={doSignOut} className="bg-red-600 text-white px-4 py-2 rounded">
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
