import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button } from "antd";
import {
  showNotification,
  showNotificationError,
} from "../../utils/notification";
import { createCredit, fetchUnit } from "../../utils/apis";
import type { Credit } from "../../types/credit";

const { Option } = Select;

const Check: React.FC = () => {
  const [units, setUnits] = useState<Credit[]>([]);
  const [filteredUnits, setFilteredUnits] = useState<Credit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values: Credit) => {
    try {
      setIsLoading(true);
      const response = await createCredit(values);

      showNotification("Data Berhasil Dikirim!");
      form.resetFields();

      setTimeout(() => {
        const phoneNumber = "6285255551795";
        const message = `Halo, saya ${values.name} tertarik melakukan pembelian sepeda motor Honda.`;
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(url, "_blank");
      }, 2000);

      console.log("Response:", response.data);
    } catch (error) {
      showNotificationError("Gagal mengirim data!");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Units
  useEffect(() => {
    const fetchUnitsData = async () => {
      try {
        const response = await fetchUnit();
        setUnits(response.data.response);
        console.log(response.data.response);
        setFilteredUnits([]);
      } catch (error) {
        showNotificationError("Gagal mengambil data unit!");
        console.error("Error fetching units:", error);
      }
    };
    fetchUnitsData();
  }, []);

  const handleCategoryChange = (value: string) => {
    const newFilteredUnits = units.filter((unit) => unit.category === value);
    setFilteredUnits(newFilteredUnits);
    form.setFieldsValue({ unit_id: null });
  };

  return (
    <section
      id="payment"
      className="py-10 md:py-20 bg-white flex flex-col items-center"
    >
      <div className="container mx-auto px-4 md:px-8 py-10">
           <h2 className="text-3xl text-center mb-12">
              Simulasi Kredit
            </h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="bg-white rounded-xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Informasi Data Diri
              </h2>
              <Form.Item
                label="Nama"
                name="name"
                rules={[{ required: true, message: "Nama wajib diisi!" }]}
              >
                <Input placeholder="Nama Lengkap" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Email wajib diisi!" },
                  { type: "email", message: "Format email tidak valid!" },
                ]}
              >
                <Input placeholder="Email Anda" />
              </Form.Item>
              <Form.Item
                label="No. Handphone"
                name="phone"
                rules={[
                  { required: true, message: "No. Handphone wajib diisi!" },
                ]}
              >
                <Input placeholder="08XXXXXXXXXX" />
              </Form.Item>
              <Form.Item
                label="Alamat"
                name="address"
                rules={[{ required: true, message: "Alamat wajib diisi!" }]}
              >
                <Input placeholder="Alamat Lengkap" />
              </Form.Item>
              <Form.Item
                label="Provinsi"
                name="province"
                rules={[{ required: true, message: "Provinsi wajib dipilih!" }]}
              >
                <Select placeholder="Pilih Provinsi">
                  <Option value="Sulawesi Tengah">Sulawesi Tengah</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Kota"
                name="city"
                rules={[{ required: true, message: "Kota wajib dipilih!" }]}
              >
                <Select placeholder="Pilih Kota">
                  <Option value="Kota Palu">Kota Palu</Option>
                  <Option value="Kabupaten Banggai">Kabupaten Banggai</Option>
                  <Option value="Kabupaten Donggala">Kabupaten Donggala</Option>
                  <Option value="Kabupaten Sigi">Kabupaten Sigi</Option>
                  <Option value="Kabupaten Poso">Kabupaten Poso</Option>
                  <Option value="Kabupaten Tolitoli">Kabupaten Tolitoli</Option>
                </Select>
              </Form.Item>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Informasi Motor</h2>
              <Form.Item
                label="Kategori Motor"
                name="category"
                rules={[
                  { required: true, message: "Kategori motor wajib dipilih!" },
                ]}
              >
                <Select
                  placeholder="Pilih Kategori Motor"
                  onChange={handleCategoryChange}
                >
                  <Option value="matic">Matic</Option>
                  <Option value="sport">Sport</Option>
                  <Option value="cub">Cub</Option>
                  <Option value="ev">EV</Option>
                  <Option value="bigbike">Bigbike</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Varian Motor"
                name="unit_id"
                rules={[
                  { required: true, message: "Varian motor wajib dipilih!" },
                ]}
              >
                <Select
                  placeholder="Pilih Varian Motor"
                  disabled={filteredUnits.length === 0}
                >
                  {filteredUnits.length > 0 ? (
                    filteredUnits.map((unit) => (
                      <Option key={unit.uuid} value={unit.uuid}>
                        {unit.type_name}
                      </Option>
                    ))
                  ) : (
                    <Option disabled>Tidak Ada Unit</Option>
                  )}
                </Select>
              </Form.Item>
              <Form.Item
                label="Tahun Pembuatan Motor"
                name="year"
                rules={[
                  { required: true, message: "Tahun motor wajib dipilih!" },
                ]}
              >
                <Select placeholder="Pilih Tahun">
                  {[
                    2025,
                    2024,
                    2023,
                    2022,
                    2021,
                    2020,
                    2019,
                    "Sebelum 2015",
                  ].map((year) => (
                    <Option key={year} value={year.toString()}>
                      {year}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <h2 className="text-xl font-semibold mt-6 mb-4">
                Informasi Pembelian
              </h2>
              <Form.Item
                label="Down Payment"
                name="down_payment"
                rules={[
                  { required: true, message: "Down Payment wajib dipilih!" },
                ]}
              >
                <Select placeholder="Pilih Down Payment">
                  <Option value="Rp 1 juta - Rp 2,5 juta">
                    Rp 1 juta - Rp 2,5 juta
                  </Option>
                  <Option value="Rp 2,6 juta - Rp 3,5 juta">
                    Rp 2,6 juta - Rp 3,5 juta
                  </Option>
                  <Option value="Rp 3,6 juta - Rp 5 juta">
                    Rp 3,6 juta - Rp 5 juta
                  </Option>
                  <Option value="di atas Rp 5 juta">Di atas Rp 5 juta</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Rencana Jumlah Tenor"
                name="tenor_amount"
                rules={[
                  { required: true, message: "Jumlah Tenor wajib dipilih!" },
                ]}
              >
                <Select placeholder="Pilih Rencana Jumlah Tenor">
                  <Option value="12 bulan">12 Bulan</Option>
                  <Option value="24 bulan">24 Bulan</Option>
                  <Option value="36 bulan">36 Bulan</Option>
                  <Option value="48 bulan">48 Bulan</Option>
                  <Option value="60 bulan">60 Bulan</Option>
                </Select>
              </Form.Item>

              <h2 className="text-xl font-semibold mt-6 mb-4">Pesan</h2>
              <Form.Item label="Tuliskan Pesan" name="message">
                <Input.TextArea placeholder="Tuliskan Pesan Anda" rows={4} />
              </Form.Item>
            </div>
          </div>
          <Form.Item className="mt-8 flex justify-center">
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="w-full sm:w-2xl py-2 "
              style={{ backgroundColor: "red" }}
            >
              Kirim
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default Check;
