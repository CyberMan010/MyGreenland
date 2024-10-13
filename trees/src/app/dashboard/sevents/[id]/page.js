// File: src/app/events/[id]/page.js
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function EventDetailsPage({ params }) {
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEventDetails();
  }, []);

  const fetchEventDetails = async () => {
    try {
      const res = await fetch(`/api/superevents/${params.id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch event details');
      }
      const data = await res.json();
      setEvent(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPoints = async (userId, points) => {
    try {
      const res = await fetch(`/api/superevents/${params.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, points }),
      });
      if (!res.ok) {
        throw new Error('Failed to update points');
      }
      const data = await res.json();
      setEvent(data.event);
    } catch (error) {
      console.error('Error updating points:', error);
      alert('Failed to update points. Please try again.');
    }
  };

  if (isLoading) return <div>Loading event details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!event) return <div>Event not found</div>;

  const googleMapsUrl = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${encodeURIComponent(
    event.location
  )}&t=&z=14&ie=UTF8&iwloc=B&output=embed`;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src={event.imageUrl || '/placeholder-event.jpg'}
            alt={event.name}
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
          <p className="mt-4 text-gray-600">{event.description}</p>
          <p className="mt-2"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
          <p><strong>Category:</strong> {event.category}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Location</h2>
          <iframe
              width="100%"
              height="300"
              frameBorder="0"
              style={{ border: 0 }}
              src={googleMapsUrl}
              allowFullScreen
            ></iframe>
           
          <h2 className="text-2xl font-semibold mt-8 mb-4">Participants</h2>
          <ul className="space-y-2">
            {event.participants.map((participant) => (
              <li key={participant._id} className="flex justify-between items-center">
                <span>{participant.name} - {participant.points} points</span>
                <button
                  onClick={() => handleAddPoints(participant._id, 10)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded"
                >
                  Add 10 Points
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

}