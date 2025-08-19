import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4">
            <h4 className="font-bold">Kontak Kami</h4>
            <p>Email: info@example.com</p>
            <p>Telepon: (123) 456-7890</p>
          </div>
          <div className="mb-4">
            <h4 className="font-bold">Ikuti Kami</h4>
            <p>
              <a
                href="https://instagram.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-300"
              >
                Instagram
              </a>
            </p>
          </div>
          <div className="mb-4">
            <h4 className="font-bold">Jam Buka</h4>
            <p>Senin - Jumat: 09.00 - 17.00</p>
            <p>Sabtu: 10.00 - 15.00</p>
            <p>Minggu: Tutup</p>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <p>&copy; {new Date().getFullYear()} Anugerah Perdana Imam Bonjol. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;