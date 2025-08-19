import React from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { Layout } from "antd";

const { Content } = Layout;

const Beranda: React.FC = () => {
  return (
    <Content>
      <section id="home" className="py-10 md:py-0 bg-white shadow w-full">
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/src/assets/home.webp"
              alt="Pemandangan Desa Sikara Tobeta"
              className="w-full h-full object-cover object-center"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r  from-teal-800/60 to-red-900/70"></div>
          </div>
          <div className="relative z-10 container mx-auto px-4 sm:px-2 h-full flex flex-col pt-24 pb-16 sm:pt-36 sm:pb-20">
            <div className="flex-grow flex flex-col justify-center">
              <div className="max-w-2xl">
                <div className="mb-8">
                  <span className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                    <CheckCircleOutlined className="mr-1" /> Selamat Datang
                  </span>
                  <Title
                    level={1}
                    className="text-4xl md:text-5xl lg:text-6xl !font-bold !text-white leading-tight mb-4"
                  >
                    Official Website <br />
                    <span className="text-white">
                      Anugerah Perdana Imam Bonjol
                    </span>
                  </Title>
                  <p className="text-lg text-blue-100 opacity-90 mb-8">
                    Menjual motor, pemeliharaan, dan penjualan suku cadang motor
                    Honda
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Content>
  );
};

export default Beranda;
