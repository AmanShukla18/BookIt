import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Experience = {
  _id: string;
  title: string;
  shortDesc: string;
  price: number;
  images: string[];
};

export default function Home() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get('/api/experiences')
      .then((r) => setItems(r.data))
      .catch((e) => {
        console.error('Failed to load experiences', e?.response || e.message || e);
        const msg = e?.response?.data?.error || e?.response?.data?.message || 'Server error while fetching experiences';
        setError(String(msg));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">BookIt experiences</h1>
      </header>

      <main className="mt-6">
        {loading ? (
          <div>Loading…</div>
        ) : error ? (
          <div className="text-red-600">
            {error}
            <div className="text-sm text-gray-600">Make sure the backend is running (see backend/README notes and .env for MONGO_URI).</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((it) => (
              <Link key={it._id} href={`/experiences/${it._id}`} className="block border rounded overflow-hidden">
                <img src={it.images?.[0]} alt={it.title} className="w-full h-40 object-cover" />
                <div className="p-3">
                  <h3 className="font-medium">{it.title}</h3>
                  <p className="text-sm text-gray-600">{it.shortDesc}</p>
                  <div className="mt-2 font-semibold">From ₹{it.price}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
