import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ExperiencePage() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<any | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/experiences/${id}`)
      .then((r) => setData(r.data))
      .catch(console.error);
  }, [id]);

  if (!data) return <div className="p-6">Loading…</div>;

  function goToCheckout() {
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time');
      return;
    }
    router.push({
      pathname: '/checkout',
      query: { experienceId: data._id, date: selectedDate, time: selectedTime },
    });
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">{data.title}</h1>
      <p className="mt-2 text-gray-700">{data.longDesc || data.shortDesc}</p>

      <div className="mt-6">
        <h3 className="font-medium">Available dates & slots</h3>
        <div className="mt-3 space-y-3">
          {data.dates?.map((d: any) => (
            <div key={d.date} className="border p-3 rounded">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{d.date}</div>
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {d.times.map((t: any) => (
                  <button
                    key={t.time}
                    onClick={() => {
                      setSelectedDate(d.date);
                      setSelectedTime(t.time);
                    }}
                    className={`px-3 py-1 rounded border transition ${
                      selectedDate === d.date && selectedTime === t.time
                        ? 'bg-yellow-400 border-yellow-400'
                        : 'bg-white'
                    }`}
                  >
                    {t.time} ({t.capacity})
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <div className="text-sm text-gray-600">Selected</div>
          <div className="mt-1">
            {selectedDate ? `${selectedDate} ${selectedTime}` : 'None selected'}
          </div>
          <div className="mt-4">
            <button onClick={goToCheckout} className="bg-yellow-400 px-4 py-2 rounded">
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
