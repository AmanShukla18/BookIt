import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { useToast } from '../components/Toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const toast = useToast();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!auth) {
      const m = 'Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_API_KEY in .env.local';
      setMessage(m);
      toast.push(m, 'error');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent');
      toast.push('Password reset email sent', 'success');
    } catch (err: any) {
      const m = err?.message || 'Failed to send reset email';
      setMessage(m);
      toast.push(m, 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Reset password</h2>
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

        {message && <div className="text-sm text-gray-700">{message}</div>}

        <div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Send reset email</button>
        </div>
      </form>
    </div>
  );
}
