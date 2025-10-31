import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { useToast } from '../components/Toast';

export default function SettingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [displayName, setDisplayName] = useState(user?.displayName ?? '');
  const toast = useToast();

  useEffect(() => {
    if (!user) router.replace('/signin');
  }, [user]);

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>

      <div className="space-y-4">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const current = auth?.currentUser;
              if (current) {
                await updateProfile(current, { displayName });
                toast.push('Profile updated', 'success');
              } else {
                toast.push('Not signed in or auth not available', 'error');
              }
            } catch (err: any) {
              toast.push(err?.message || 'Failed to update profile', 'error');
            }
          }}
        >
          <div>
            <label className="block text-sm">Display name</label>
            <input
              className="mt-1 w-full border px-3 py-2 rounded"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              type="text"
            />
          </div>
          <div className="mt-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
