import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'next/router';
import { useToast } from '../components/Toast';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const toast = useToast();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!auth) {
      const msg = 'Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_API_KEY in .env.local';
      setError(msg);
      toast.push(msg, 'error');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.push('Account created', 'success');
      router.push('/account');
    } catch (err: any) {
      const msg = err?.message || 'Sign up failed';
      setError(msg);
      toast.push(msg, 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Create an account</h2>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm">Email</label>
          <input
            className="mt-1 w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </div>

        <div>
          <label className="block text-sm">Password</label>
          <div className="relative mt-1">
            <input
              className="w-full border px-3 py-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {error && <div className="text-red-600">{error}</div>}

        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Sign up</button>
        </div>
      </form>
      <div className="mt-4 text-sm">
        Already have an account? <a className="text-blue-600" href="/signin">Sign in</a>
      </div>
    </div>
  );
}
