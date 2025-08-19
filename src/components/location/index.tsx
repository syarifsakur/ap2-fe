import React from 'react';

const Location: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center shadow" id="location" >
      <h1 className="mt-20 text-2xl font-semibold">Lokasi</h1>
      <iframe
        title="Google Maps Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.3298757410753!2d119.85691397395887!3d-0.8965471990947771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d8bedc77c874ba1%3A0xf263d5c5e8245788!2sDealer%20Honda%20Anugerah%20Perdana%20Imam%20Bonjol!5e0!3m2!1sid!2sid!4v1754464126180!5m2!1sid!2sid"
        className="w-full mx-auto p-16 h-full border-0"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
}

export default Location;