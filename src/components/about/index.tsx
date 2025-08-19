import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

const About: React.FC = () => {
  return (
    <Content>
      <section
        id="about"
        className="py-10 md:py-20 bg-white shadow flex flex-col items-center justify-center"
      >
        <div className="" >
          <div className="mx-8 md:mx-24">
            <h2 className="text-3xl text-center mb-8">Tentang Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
              <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-lg transition">
                <h3 className="text-xl text-indigo-600">🏆 Pengalaman</h3>
                <p>
                  Dengan pengalaman lebih dari 10 tahun dalam industri
                  teknologi, kami telah melayani ribuan pelanggan dengan produk
                  berkualitas tinggi.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-lg transition">
                <h3 className="text-xl text-indigo-600">
                  ✅ Kualitas Terjamin
                </h3>
                <p>
                  Semua produk yang kami jual adalah original dan bergaransi
                  resmi. Kepuasan pelanggan adalah prioritas utama kami.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-lg transition">
                <h3 className="text-xl text-indigo-600">🚚 Pengiriman Cepat</h3>
                <p>
                  Kami menyediakan layanan pengiriman cepat ke seluruh Indonesia
                  dengan packaging yang aman dan terpercaya.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Content>
  );
};

export default About;
