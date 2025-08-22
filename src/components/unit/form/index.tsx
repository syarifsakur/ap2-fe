import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  Select,
  message,
  Steps,
  InputNumber,
} from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface FormUnitStepProps {
  onSubmit: (formData: FormData) => Promise<void>;
}

const { Option } = Select;
const { Step } = Steps;

interface FormUnitStepProps {
  onSubmit: (formData: FormData) => Promise<void>;
  initialData?: any;
}

const FormUnitStep: React.FC<FormUnitStepProps> = ({
  onSubmit,
  initialData,
}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);

      if (initialData.path_img) {
        setFileList([
          {
            uid: "-1",
            name: "foto-unit.jpg",
            status: "done",
            url: initialData.path_img,
          } as UploadFile,
        ]);
      }
    }
  }, [initialData, form]);

  const stepFields: string[][] = [
    ["type_name", "price", "category"], // step 0
    [
      "machine_type",
      "diameter",
      "machine_capacity",
      "compression_ratio",
      "max_power",
      "max_torque",
      "kopling_type",
      "starter_type",
      "fuel_supply_system",
      "tranmisi_type",
      "air_cooled_engine",
      "gear_shift_pattern",
    ],
    [
      "frame_type",
      "front_suspension_type",
      "rear_suspension_type",
      "front_tire_size",
      "rear_tire_size",
      "front_brake",
      "rear_brake",
      "braking_system",
    ],
    ["lwh", "wheel_axis_distance", "lowest_distance", "curb_weight"],
    ["fuel_tank_capacity", "lubricating_oil_capacity"],
    ["battery_type", "ignition_system", "plug_type"],
  ];

  const next = async () => {
    try {
      await form.validateFields(stepFields[current]);
      setCurrent(current + 1);
    } catch {
      message.error("Harap isi semua field yang diperlukan!");
    }
  };

  const prev = () => setCurrent(current - 1);

  const handleFinish = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue(true);

      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (values[key] !== undefined && values[key] !== null) {
          formData.append(key, String(values[key]));
        }
      });

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("file", fileList[0].originFileObj as File);
      } else if (values.path_img) {
        formData.append("path_img", values.path_img);
      } else {
        message.warning("Harap upload gambar unit!");
        return;
      }

      await onSubmit(formData);
    } catch (err) {
      console.error(err);
      message.error("Gagal menyimpan form!");
    }
  };

  return (
    <div className="max-w-full mx-auto">
      <Steps current={current} className="mb-6">
        <Step title="Type Motor" />
        <Step title="Mesin" />
        <Step title="Rangka" />
        <Step title="Dimensi" />
        <Step title="Kapasitas" />
        <Step title="Kelistrikan" />
      </Steps>

      <Form form={form} layout="vertical">
        {/* Step 0 */}
        {current === 0 && (
          <>
            <Form.Item
              name="type_name"
              label="Nama Tipe"
              rules={[{ required: true, message: "Nama tipe harus diisi" }]}
            >
              <Input placeholder="Contoh: Supra X 125" />
            </Form.Item>
            <Form.Item
              name="price"
              label="Harga"
              rules={[{ required: true, message: "Harga harus diisi" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                size="large"
                placeholder="Cth: 200000"
                formatter={(value) =>
                  `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value: any) =>
                  value?.replace(/Rp\s?|(,|\.)+/g, "") ?? ""
                }
              />
            </Form.Item>
            <Form.Item
              name="category"
              label="Kategori"
              rules={[{ required: true, message: "Kategori harus diisi" }]}
            >
              <Select placeholder="Pilih kategori">
                <Option value="matic">Matic</Option>
                <Option value="sport">Sport</Option>
                <Option value="cub">Cub</Option>
                <Option value="ev">Ev</Option>
                <Option value="bingbike">Big Bike</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Foto Unit"
              required
              rules={[{ required: true, message: "Foto unit harus diupload" }]}
            >
              <Upload
                beforeUpload={() => false}
                fileList={fileList}
                onChange={({ fileList }) => setFileList(fileList)}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          </>
        )}

        {/* Step 1 Mesin */}
        {current === 1 && (
          <>
            <Form.Item
              label="Tipe Mesin"
              name="machine_type"
              rules={[{ required: true }]}
            >
              <Input placeholder="contoh: 4 Langkah, SOHC" />
            </Form.Item>
            <Form.Item
              label="Diameter x Langkah"
              name="diameter"
              rules={[{ required: true }]}
            >
              <Input placeholder="contoh: 57.3 x 57.8 mm" />
            </Form.Item>
            <Form.Item
              label="Kapasitas Mesin (cc)"
              name="machine_capacity"
              rules={[{ required: true }]}
            >
              <Input placeholder="150" />
            </Form.Item>
            <Form.Item
              label="Rasio Kompresi"
              name="compression_ratio"
              rules={[{ required: true }]}
            >
              <Input placeholder="10.6 : 1" />
            </Form.Item>
            <Form.Item
              label="Daya Maksimum"
              name="max_power"
              rules={[{ required: true }]}
            >
              <Input placeholder="12.6 PS / 8,000 rpm" />
            </Form.Item>
            <Form.Item
              label="Torsi Maksimum"
              name="max_torque"
              rules={[{ required: true }]}
            >
              <Input placeholder="14.8 Nm / 6,500 rpm" />
            </Form.Item>
            <Form.Item
              label="Tipe Kopling"
              name="kopling_type"
              rules={[{ required: true }]}
            >
              <Input placeholder="Manual, Multiplate Wet Clutch" />
            </Form.Item>
            <Form.Item
              label="Tipe Starter"
              name="starter_type"
              rules={[{ required: true }]}
            >
              <Input placeholder="Elektrik & Kick Starter" />
            </Form.Item>
            <Form.Item
              label="Sistem Suplai Bahan Bakar"
              name="fuel_supply_system"
              rules={[{ required: true }]}
            >
              <Input placeholder="PGM-FI" />
            </Form.Item>
            <Form.Item
              label="Tipe Transmisi"
              name="tranmisi_type"
              rules={[{ required: true }]}
            >
              <Input placeholder="Manual 5 Kecepatan" />
            </Form.Item>

            <Form.Item
              label="Pendingin Mesin"
              name="air_cooled_engine"
              rules={[{ required: true }]}
            >
              <Input placeholder="contoh: Pendingin Cairan" />
            </Form.Item>
            <Form.Item
              label="Pola Gigi"
              name="gear_shift_pattern"
              rules={[{ required: true }]}
            >
              <Input placeholder="1-N-2-3-4-5" />
            </Form.Item>
          </>
        )}

        {/* Step 2 Rangka */}
        {current === 2 && (
          <>
            <Form.Item
              name="frame_type"
              label="Tipe Rangka"
              rules={[{ required: true }]}
            >
              <Input placeholder="Tulang Punggung – eSAF" />
            </Form.Item>
            <Form.Item
              name="front_suspension_type"
              label="Suspensi Depan"
              rules={[{ required: true }]}
            >
              <Input placeholder="Teleskopik" />
            </Form.Item>
            <Form.Item
              name="rear_suspension_type"
              label="Suspensi Belakang"
              rules={[{ required: true }]}
            >
              <Input placeholder="Lengan Ayun dengan Peredam Kejut Tunggal" />
            </Form.Item>
            <Form.Item
              name="front_tire_size"
              label="Ukuran Ban Depan"
              rules={[{ required: true }]}
            >
              <Input placeholder="80/90 - 14 M/C 40P Tubeless" />
            </Form.Item>
            <Form.Item
              name="rear_tire_size"
              label="Ukuran Ban Belakang"
              rules={[{ required: true }]}
            >
              <Input placeholder="90/90 - 14 M/C 46P Tubeless" />
            </Form.Item>
            <Form.Item
              name="front_brake"
              label="Rem Depan"
              rules={[{ required: true }]}
            >
              <Input placeholder="Cakram Hidrolik dengan Piston Tunggal" />
            </Form.Item>
            <Form.Item
              name="rear_brake"
              label="Rem Belakang"
              rules={[{ required: true }]}
            >
              <Input placeholder="Tromol" />
            </Form.Item>
            <Form.Item
              name="braking_system"
              label="Sistem Pengereman"
              rules={[{ required: true }]}
            >
              <Input placeholder="Combi Brake System" />
            </Form.Item>
          </>
        )}

        {/* Step 3 Dimensi */}
        {current === 3 && (
          <>
            <Form.Item
              name="lwh"
              label="P x L x T"
              rules={[{ required: true }]}
            >
              <Input placeholder="1921 x 683 x 1062 mm" />
            </Form.Item>
            <Form.Item
              name="wheel_axis_distance"
              label="Jarak Sumbu Roda"
              rules={[{ required: true }]}
            >
              <Input placeholder="1260 mm" />
            </Form.Item>
            <Form.Item
              name="lowest_distance"
              label="Jarak Terendah ke Tanah"
              rules={[{ required: true }]}
            >
              <Input placeholder="135 mm" />
            </Form.Item>
            <Form.Item
              name="curb_weight"
              label="Berat Kosong"
              rules={[{ required: true }]}
            >
              <Input placeholder="95 kg" />
            </Form.Item>
          </>
        )}

        {/* Step 4 Kapasitas */}
        {current === 4 && (
          <>
            <Form.Item
              name="fuel_tank_capacity"
              label="Kapasitas Tangki Bahan Bakar"
              rules={[{ required: true }]}
            >
              <Input placeholder="4.2 Liter" />
            </Form.Item>
            <Form.Item
              name="lubricating_oil_capacity"
              label="Kapasitas Oli Mesin"
              rules={[{ required: true }]}
            >
              <Input placeholder="0.8 Liter" />
            </Form.Item>
          </>
        )}

        {/* Step 5 Kelistrikan */}
        {current === 5 && (
          <>
            <Form.Item
              name="battery_type"
              label="Tipe Aki / Baterai"
              rules={[{ required: true }]}
            >
              <Input placeholder="12V - 5Ah" />
            </Form.Item>
            <Form.Item
              name="ignition_system"
              label="Sistem Pengapian"
              rules={[{ required: true }]}
            >
              <Input placeholder="Full Transistorized" />
            </Form.Item>
            <Form.Item
              name="plug_type"
              label="Tipe Busi"
              rules={[{ required: true }]}
            >
              <Input placeholder="NGK CPR9EA-9" />
            </Form.Item>
          </>
        )}

        <div className="flex justify-between mt-6">
          {current > 0 && <Button onClick={prev}>Kembali</Button>}
          {current === 0 && (
            <Button onClick={() => navigate("/admin/unit")}>Kembali</Button>
          )}

          {current < 5 && (
            <Button type="primary" onClick={next}>
              Selanjutnya
            </Button>
          )}

          {current === 5 && (
            <Button type="primary" onClick={handleFinish}>
              Simpan
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default FormUnitStep;
