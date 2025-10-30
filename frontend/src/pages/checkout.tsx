import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Checkout() {
  const router = useRouter();
  const { experienceId, date, time } = router.query as Record<string, string>;

  const [experience, setExperience] = useState<any | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [qty, setQty] = useState(1);
  const [promo, setPromo] = useState('');
  const [promoStatus, setPromoStatus] = useState<{ valid: boolean; message: string; promo?: any } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!experienceId) return;
    axios
      .get(`/api/experiences/${experienceId}`)
      .then((r) => setExperience(r.data))
      .catch((e) => console.error(e));
  }, [experienceId]);

  async function checkPromo() {
    if (!promo) return setPromoStatus({ valid: false, message: 'Enter a promo code' });
    try {
      const res = await axios.post('/api/promo/validate', { code: promo });
      setPromoStatus({ valid: res.data.valid, message: res.data.message || (res.data.valid ? 'Valid' : 'Invalid'), promo: res.data.promo });
    } catch (err: any) {
      setPromoStatus({ valid: false, message: err?.response?.data?.message || 'Error validating promo' });
    }
  }

  async function submitBooking() {
    if (!experienceId || !date || !time) {
      alert('Missing booking details');
      return;
    }
    if (!name || !email) {
      alert('Please enter name and email');
      return;
    }
    setLoading(true);
    try {
      const payload = { experienceId, date, time, name, email, qty, promo: promoStatus?.valid ? promo : undefined };
      const res = await axios.post('/api/bookings', payload);
      if (res.data && res.data.ok) {
        router.push({ pathname: '/result', query: { bookingId: res.data.bookingId } });
      } else {
        alert('Booking failed: ' + JSON.stringify(res.data));
      }
    } catch (err: any) {
      console.error(err);
      alert('Booking error: ' + (err?.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  }

  const price = experience?.price ?? 0;
  const discountText = promoStatus?.valid && promoStatus.promo ? `${promoStatus.promo.type === 'percent' ? promoStatus.promo.value + '% off' : '₹' + promoStatus.promo.value + ' off'}` : '';

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-semibold">Checkout</h2>

      <div className="mt-4 border rounded p-4">
        <div className="font-medium">{experience?.title || 'Experience'}</div>
        <div className="text-sm text-gray-600">{date} {time}</div>
        <div className="mt-2">Price: ₹{price} x {qty} = ₹{price * qty}</div>
        {discountText && <div className="text-green-600 mt-1">Promo: {discountText}</div>}
      </div>

      <form className="mt-4 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <label className="block">
          <div className="text-sm">Name</div>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded" />
        </label>

        <label className="block">
          <div className="text-sm">Email</div>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded" />
        </label>

        <label className="block">
          <div className="text-sm">Quantity</div>
          <input type="number" min={1} value={qty} onChange={(e) => setQty(Number(e.target.value))} className="w-24 border p-2 rounded" />
        </label>

        <div className="flex gap-2">
          <input placeholder="Promo code" value={promo} onChange={(e) => setPromo(e.target.value)} className="flex-1 border p-2 rounded" />
          <button type="button" onClick={checkPromo} className="bg-gray-100 px-3 rounded">Apply</button>
        </div>
        {promoStatus && <div className={`text-sm ${promoStatus.valid ? 'text-green-600' : 'text-red-600'}`}>{promoStatus.message}</div>}

        <div className="pt-4">
          <button type="button" disabled={loading} onClick={submitBooking} className="bg-yellow-400 px-4 py-2 rounded">
            {loading ? 'Booking…' : 'Confirm booking'}
          </button>
        </div>
      </form>
    </div>
  );
}
