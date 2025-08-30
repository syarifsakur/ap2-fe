import React, { useState } from "react";
import { Form, Input, Select, DatePicker, TimePicker, Button } from "antd";
import {
  createService,
  showNotification,
  showNotificationError,
} from "../../utils";

const { Option } = Select;

const BookingService: React.FC = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);

      const payload = {
        ...values,
        Bookingservice_date: values.service_date.format("YYYY-MM-DD"),
        service_time: values.service_time.format("HH:mm"),
      };

      await createService(payload);
      showNotification("Booking service berhasil dikirim!");
      form.resetFields();
    } catch (error) {
      showNotificationError("Gagal mengirim booking service!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="service"
      className="py-10 md:py-20 bg-white flex flex-col items-center"
    >
      <div className="container mx-auto px-4 md:px-8 py-10">
           <h2 className="text-3xl text-center mb-8">
              Booking Service
            </h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="bg-white rounded-xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Kolom Kiri */}
            <div>
              <Form.Item
                label="Nama"
                name="name"
                rules={[{ required: true, message: "Nama wajib diisi!" }]}
              >
                <Input placeholder="Nama Lengkap" />
              </Form.Item>

              <Form.Item
                label="No. Handphone"
                name="no_hp"
                rules={[{ required: true, message: "Nomor HP wajib diisi!" }]}
              >
                <Input placeholder="08XXXXXXXXXX" />
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
                label="Alamat"
                name="address"
                rules={[{ required: true, message: "Alamat wajib diisi!" }]}
              >
                <Input placeholder="Alamat Lengkap" />
              </Form.Item>

              <Form.Item
                label="Kategori Motor"
                name="category"
                rules={[{ required: true, message: "Kategori wajib dipilih!" }]}
              >
                <Select placeholder="Pilih Kategori">
                  <Option value="matic">Matic</Option>
                  <Option value="sport">Sport</Option>
                  <Option value="cub">Cub</Option>
                  <Option value="ev">EV</Option>
                  <Option value="bigbike">Bigbike</Option>
                </Select>
              </Form.Item>
            </div>

            {/* Kolom Kanan */}
            <div>
              <Form.Item
                label="Varian Motor"
                name="unit_id"
                rules={[{ required: true, message: "Varian motor wajib dipilih!" }]}
              >
                <Select placeholder="Pilih Varian Motor">
                  {/* TODO: isi dari API units */}
                  <Option value="1">Beat Street 2024</Option>
                  <Option value="2">CBR 150R</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Tahun Motor"
                name="year"
                rules={[{ required: true, message: "Tahun motor wajib dipilih!" }]}
              >
                <Select placeholder="Pilih Tahun">
                  {[2025, 2024, 2023, 2022, 2021, 2020].map((year) => (
                    <Option key={year} value={year}>
                      {year}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Jenis Service"
                name="service_type"
                rules={[{ required: true, message: "Jenis service wajib dipilih!" }]}
              >
                <Select placeholder="Pilih Jenis Service">
                  <Option value="service ringan">Service Ringan</Option>
                  <Option value="service besar">Service Besar</Option>
                  <Option value="ganti oli">Ganti Oli</Option>
                  <Option value="lainnya">Lainnya</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Tanggal Service"
                name="service_date"
                rules={[{ required: true, message: "Tanggal wajib dipilih!" }]}
              >
                <DatePicker format="YYYY-MM-DD" className="w-full" />
              </Form.Item>

              <Form.Item
                label="Waktu Service"
                name="service_time"
                rules={[{ required: true, message: "Waktu wajib dipilih!" }]}
              >
                <TimePicker format="HH:mm" className="w-full" />
              </Form.Item>
            </div>
          </div>

          <Form.Item className="mt-8 flex justify-center">
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="w-full sm:w-2xl py-2"
              style={{ backgroundColor: "red" }}
            >
              Kirim Booking
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default BookingService;
