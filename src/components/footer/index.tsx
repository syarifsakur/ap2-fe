import React from "react";
import {
  InstagramOutlined,
  FacebookOutlined,
  TikTokOutlined,
  MailOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6">
        {/* Grid 3 kolom */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left items-center">
          {/* Kontak */}
          <div>
            <h4 className="font-bold text-lg mb-4">Kontak Kami</h4>
            <p className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <MailOutlined /> info@example.com
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2">
              <PhoneOutlined /> (123) 456-7890
            </p>
          </div>

          {/* Ikuti Kami (Center Always) */}
          <div className="flex flex-col items-center">
            <h4 className="font-bold text-lg mb-4">Ikuti Kami</h4>
            <div className="flex justify-center gap-4">
              <a
                href="https://www.instagram.com/anugerahperdana.imambonjol/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-pink-500 transition-colors"
              >
                <InstagramOutlined style={{ fontSize: "20px" }} />
              </a>
              <a
                href="https://www.facebook.com/DealerHondaMotorImamBonjol/?locale=id_ID"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-blue-600 transition-colors"
              >
                <FacebookOutlined style={{ fontSize: "20px" }} />
              </a>
              <a
                href="https://www.tiktok.com/@anugerahperdana.imbol?_t=ZS-8zBba6tfuDa&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-black transition-colors"
              >
                <TikTokOutlined style={{ fontSize: "20px" }} />
              </a>
            </div>
          </div>

          {/* Jam Buka */}
          <div className="text-center md:text-right">
            <h4 className="font-bold text-lg mb-4">Jam Buka</h4>
            <p className="flex items-center justify-center md:justify-end gap-2 mb-2">
              <ClockCircleOutlined /> Senin - Sabtu: 08.30 - 17.00
            </p>
            <p className="flex items-center justify-center md:justify-end gap-2">
              <ClockCircleOutlined /> Minggu: 09.00 - 17.00
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 border-t border-gray-700 pt-4 text-gray-400 text-sm">
        <p>
          &copy; {new Date().getFullYear()} Anugerah Perdana Imam Bonjol.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
