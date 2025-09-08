import React, { useState, useEffect } from "react";
import { Button, Pagination, Spin, Image } from "antd";
import { showNotification, fetchPart } from "../../../utils";
import type { Part } from "../../../types/part";

interface ApiResponse {
  response: Part[];
  totalPage: number;
  total: number;
  page: number;
}

const ListPart: React.FC = () => {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [total, setTotal] = useState(0);

  const fetchParts = async (page: number) => {
    try {
      setLoading(true);
      const res = await fetchPart(page, limit);
      const data: ApiResponse = res.data;

      setParts(data.response);
      setTotal(data.total);
      setPage(page);
    } catch (error) {
      console.log(error);
      showNotification("Gagal mengambil data part");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParts(1);
  }, []);

  return (
    <div>
      <section
        id="part"
        className="py-10 md:py-20 bg-gray-50 flex flex-col items-center justify-center w-full"
      >
        <div className="container mx-auto px-4 md:px-10">
          <h2 className="text-3xl text-center mb-8 font-semibold">Part</h2>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Spin size="large" />
            </div>
          ) : parts.length > 0 ? (
            <>
              {/* Grid Items */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 w-full">
                {parts.map((item) => (
                  <div
                    key={item.uuid}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden flex flex-col transition-transform duration-300 transform hover:-translate-y-1"
                  >
                    {/* Gambar */}
                    <div className="bg-gray-100 flex items-center justify-center h-36 sm:h-40 p-2">
                      {item.path_img ? (
                        <Image
                          src={item.path_img}
                          alt={item.name_part}
                          className="rounded-md object-contain"
                          style={{
                            maxHeight: "140px",
                            borderRadius: "8px",
                          }}
                          preview={{
                            mask: "Klik untuk perbesar",
                          }}
                        />
                      ) : (
                        <span className="text-gray-400 text-sm">
                          Tidak ada gambar
                        </span>
                      )}
                    </div>

                    {/* Konten */}
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-sm sm:text-base font-semibold line-clamp-2 min-h-[40px] text-gray-800">
                        {item.name_part}
                      </h3>

                      <div className="mt-2 text-xs sm:text-sm text-gray-600">
                        <p>
                          <strong>No. Part:</strong> {item.no_part}
                        </p>
                        <p>
                          <strong>Size:</strong> {item.size || "-"}
                        </p>
                      </div>

                      <div className="text-base sm:text-lg font-bold text-red-600 mt-3">
                        Rp.{" "}
                        {Number(item.price)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </div>

                      {/* Tombol */}
                      <div className="mt-4 flex items-center justify-center">
                        <Button
                          type="primary"
                          style={{
                            background:
                              "linear-gradient(to right, #ef4444, #f87171)",
                            borderColor: "transparent",
                            color: "white",
                          }}
                          className="w-full rounded-lg font-medium"
                          onClick={() => {
                            showNotification(
                              "Anda Akan Di Arahkan ke Wa Admin "
                            );
                            setTimeout(() => {
                              const phoneNumber = "6285255551795";
                              const message = `Halo, saya tertarik membeli part: ${item.name_part} (No: ${item.no_part}).`;
                              const encodedMessage =
                                encodeURIComponent(message);
                              const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                              window.open(url, "_blank");
                            });
                          }}
                        >
                          Hubungi Kami
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-10">
                <Pagination
                  current={page}
                  pageSize={limit}
                  total={total}
                  onChange={(p) => fetchParts(p)}
                  showSizeChanger={false}
                />
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 my-40">
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold text-gray-700">
                  Belum Ada Part
                </h3>
                <p className="text-gray-500 mt-2">
                  Saat ini belum ada part yang tersedia.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ListPart;
