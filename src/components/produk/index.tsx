import React, { useState } from "react";
import { Layout, Button, Modal, Card, Image, Tooltip } from "antd";
import type { Products } from "../../types/produk";
import { IoMdEye } from "react-icons/io";
import ModalMachine from "../unit/modal/machine";
import ModalFrame from "../unit/modal/frame";
import ModalDimensions from "../unit/modal/dimensions";
import ModalCapacity from "../unit/modal/capacity";
import ModalElectricity from "../unit/modal/electricity";
import { showNotification } from "../../utils";

const { Content } = Layout;

interface ProductProps {
  units: Products[];
}

const tabListNoTitle = [
  { key: "Mesin", label: "Mesin" },
  { key: "Rangka", label: "Rangka" },
  { key: "Dimensi", label: "Dimensi" },
  { key: "Kapasitas", label: "Kapasitas" },
  { key: "Kelistrikan", label: "Kelistrikan" },
];

const Product: React.FC<ProductProps> = ({ units }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("matic");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Products | null>(null);
  const [activeTabKey, setActiveTabKey] = useState<string>("Mesin");

  const filteredUnits = units.filter(
    (unit) => unit.category === selectedCategory
  );

  const handleDetail = (unit: Products) => {
    setSelectedUnit(unit);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedUnit(null);
  };

  const contentListNoTitle: Record<string, React.ReactNode> = {
    Mesin: selectedUnit?.machine ? (
      <ModalMachine machine={selectedUnit.machine} />
    ) : (
      <p>Data mesin tidak tersedia.</p>
    ),
    Rangka: selectedUnit?.frame ? (
      <ModalFrame frame={selectedUnit.frame} />
    ) : (
      <p>Data kerangka tidak tersedia.</p>
    ),
    Dimensi: selectedUnit?.Dimensions ? (
      <ModalDimensions dimensions={selectedUnit.Dimensions} />
    ) : (
      <p>Data dimensi tidak tersedia.</p>
    ),
    Kapasitas: selectedUnit?.Capacity ? (
      <ModalCapacity capacity={selectedUnit.Capacity} />
    ) : (
      <p>Data kapasitas tidak tersedia.</p>
    ),
    Kelistrikan: selectedUnit?.Electricity ? (
      <ModalElectricity electricity={selectedUnit.Electricity} />
    ) : (
      <p>Data kelistrikan tidak tersedia.</p>
    ),
  };

  return (
    <div>
      <Content>
        <section
          id="products"
          className="py-10 md:py-20 bg-white shadow flex flex-col items-center justify-center"
        >
          <div className="container mx-auto px-6 md:px-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-gray-800">
              Pilih Motor Honda Favorit Anda
            </h2>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {["matic", "sport", "cub", "EV", "BigBike"].map((category) => (
                <button
                  key={category}
                  className={`px-5 py-2 rounded-full text-sm md:text-base transition-colors duration-300 ${
                    selectedCategory === category
                      ? "bg-red-600 text-white shadow"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {filteredUnits.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full">
                {filteredUnits.map((product, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden flex flex-col transition-transform transform hover:scale-105"
                  >
                    <div className="bg-gray-100 flex items-center justify-center h-44 md:h-56 p-2">
                      {product.path_img ? (
                        <Image
                          src={product.path_img}
                          alt={product.type_name}
                          className="rounded-md object-cover"
                          style={{
                            maxHeight: "200px",
                            borderRadius: "8px",
                          }}
                          preview={{
                            mask: "Klik untuk perbesar",
                          }}
                        />
                      ) : (
                        <span className="text-gray-400">Tidak ada gambar</span>
                      )}
                    </div>

                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-base md:text-lg font-semibold line-clamp-2 min-h-[44px] md:min-h-[48px] text-gray-800">
                        {product.type_name}
                      </h3>
                      <div className="mt-2">
                        {product.ket === "ready" ? (
                          <span className="bg-green-500 text-white px-3 py-1 rounded-md text-xs md:text-sm font-medium">
                            Ready
                          </span>
                        ) : product.ket === "sold" ? (
                          <span className="bg-red-500 text-white px-3 py-1 rounded-md text-xs md:text-sm font-medium">
                            Sold Out
                          </span>
                        ) : (
                          <span className="bg-yellow-500 text-white px-3 py-1 rounded-md text-xs md:text-sm font-medium">
                            {product.ket}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm md:text-md font-semibold mt-3 text-gray-700">
                        Spesifikasi:
                      </h4>
                      <ul className="list-disc list-inside mt-1 text-gray-600 text-xs md:text-sm space-y-1 flex-grow">
                        {product.specs.slice(0, 4).map((spec, specIndex) => (
                          <li key={specIndex}>
                            <strong>{spec.label}:</strong> {spec.value}
                          </li>
                        ))}
                      </ul>
                      <div className="text-base md:text-lg font-bold text-red-600 mt-3">
                        Rp.{" "}
                        {product.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-2">
                        <Button
                          type="primary"
                          style={{
                            background: "linear-gradient(to right, #f00, #f99)",
                            borderColor: "transparent",
                            color: "white",
                          }}
                          className="w-[75%] rounded-lg text-sm md:text-base"
                          onClick={() => {
                            showNotification(
                              "Anda Akan Di Arahkan ke Wa Admin "
                            );
                            setTimeout(() => {
                              const phoneNumber = "6285255551795";
                              const message = `Halo, saya tertarik melakukan pembelian sepeda motor Honda.`;
                              const encodedMessage =
                                encodeURIComponent(message);
                              const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                              window.open(url, "_blank");
                            });
                          }}
                        >
                          Hubungi Kami
                        </Button>
                        <Tooltip title="Detail">
                          <Button
                            htmlType="button"
                            type="text"
                            className="cursor-pointer text-green-600 hover:text-green-800"
                            onClick={() => handleDetail(product)}
                          >
                            <IoMdEye className="text-lg md:text-xl" />
                          </Button>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 my-40">
                <h3 className="text-lg md:text-xl font-semibold text-gray-700">
                  Belum Ada Produk
                </h3>
                <p className="text-gray-500 mt-2 text-sm md:text-base">
                  Saat ini belum ada produk yang tersedia.
                </p>
              </div>
            )}
          </div>
        </section>
      </Content>

      <Modal
        title={selectedUnit?.type_name}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
        width={800}
      >
        {selectedUnit && (
          <Card
            tabList={tabListNoTitle}
            activeTabKey={activeTabKey}
            onTabChange={(key) => setActiveTabKey(key)}
          >
            {contentListNoTitle[activeTabKey]}
          </Card>
        )}
      </Modal>
    </div>
  );
};

export default Product;
