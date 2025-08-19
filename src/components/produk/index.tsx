import React, { useState } from "react";
import { Layout, Button } from "antd";
import type { Products } from "../../types/produk";

const { Content } = Layout;

interface ProductProps {
  units: Products[];
}

const Product: React.FC<ProductProps> = ({ units }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("matic");

  const filteredUnits = units.filter(
    (unit) => unit.category === selectedCategory
  );

  return (
    <div>
      <Content>
        <section
          id="products"
          className="py-10 md:py-20 bg-white shadow flex flex-col items-center justify-center"
        >
          <div className="container mx-auto px-10">
            <h2 className="text-3xl text-center mb-8">
              Pilih Motor Honda Favorit Anda
            </h2>

            {/* Kategori */}
            <div className="flex justify-center space-x-4 mb-8">
              {["matic", "sport", "cub", "EV", "BigBike"].map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full ${
                    selectedCategory === category
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {filteredUnits.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
                {filteredUnits.map((product, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                  >
                    <div className="shadow">
                      <img
                        src={product.path_img}
                        alt={product.type_name}
                        className="w-full h-80 object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold">
                        {product.type_name}
                      </h3>
                      <h4 className="text-lg font-semibold mt-4">
                        Spesifikasi:
                      </h4>
                      <ul className="list-disc list-inside mt-2 text-gray-700">
                        {product.specs.map((spec, specIndex) => (
                          <li key={specIndex}>
                            <strong>{spec.label}:</strong> {spec.value}
                          </li>
                        ))}
                      </ul>
                      <div className="text-lg font-bold text-red-600 mt-2">
                        RP.{" "}
                        {product.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </div>
                      <Button
                        type="primary"
                        style={{
                          background: "linear-gradient(to right, #f00, #f99)", 
                          borderColor: "",
                          color: "white",
                        }}
                        className="mt-4"
                        onClick={() =>
                          (window.location.href =
                            "https://wa.me/+6282393556331")
                        }
                      >
                        Hubungi Kami
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 my-40">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 rounded-full p-6 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h18M3 3v18m18-18v18M3 21h18"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700">
                    Belum Ada Produk
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Saat ini belum ada produk yang tersedia. Silakan kembali
                    lagi nanti untuk melihat produk-produk unggulan dari
                    Anugerah Perdana Honda Imam Bonjol.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </Content>
    </div>
  );
};

export default Product;
