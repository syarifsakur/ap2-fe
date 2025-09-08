import React, { useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  Space,
  Card,
  Row,
  Col,
} from "antd";
import { UploadOutlined, PlusCircleOutlined } from "@ant-design/icons";
import type { Part } from "../../../types/part";
import { useNavigate } from "react-router-dom";

interface PartFormProps {
  initialValues?: Partial<Part>;
  onSubmit: (values: Part) => void;
  loading?: boolean;
  mode: "create" | "edit";
}

const PartForm: React.FC<PartFormProps> = ({
  initialValues,
  onSubmit,
  loading = false,
  mode,
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialValues) {
      const fileList = initialValues.path_img
        ? [
            {
              uid: "-1",
              name: initialValues.name_part || "image.png",
              status: "done",
              url: initialValues.path_img,
            },
          ]
        : [];

      form.setFieldsValue({
        ...initialValues,
        file: fileList,
      });
    }
  }, [initialValues, form]);

  const handleFinish = (values: any) => {
    onSubmit({ ...values, file: values.file?.[0]?.originFileObj });
  };

  const labelStyle = (text: string) => (
    <span className="text-sm lg:text-base font-medium">{text}</span>
  );

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card
          title="Form Part"
          extra={<PlusCircleOutlined className="text-green-500 text-xl" />}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            autoComplete="off"
          >
            <Form.Item
              label={labelStyle("No Part :")}
              name="no_part"
              rules={[{ required: true, message: "No part wajib diisi!" }]}
            >
              <Input placeholder="Cth: 17210K16900" size="large" />
            </Form.Item>

            <Form.Item
              label={labelStyle("Nama Part :")}
              name="name_part"
              rules={[{ required: true, message: "Nama part wajib diisi!" }]}
            >
              <Input placeholder="Cth: Filter Udara" size="large" />
            </Form.Item>

            <Form.Item
              label={labelStyle("Ukuran :")}
              name="size"
              rules={[{ required: true, message: "Ukuran wajib diisi!" }]}
            >
              <Input placeholder="Cth: Medium" size="large" />
            </Form.Item>

            <Form.Item
              label={labelStyle("Harga :")}
              name="price"
              rules={[{ required: true, message: "Harga wajib diisi!" }]}
            >
              <InputNumber
                size="large"
                style={{ width: "100%" }}
                min={0}
                placeholder="Cth: 150000"
                formatter={(value) =>
                  `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) => value?.replace(/[Rp\s.]/g, "") || ""}
              />
            </Form.Item>

            <Form.Item
              label={labelStyle("Upload Gambar :")}
              name="file"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              rules={
                mode === "create"
                  ? [{ required: true, message: "Gambar wajib diupload!" }]
                  : []
              }
            >
              <Upload
                beforeUpload={() => false}
                maxCount={1}
                listType="picture"
              >
                <Button size="large" icon={<UploadOutlined />}>
                  Pilih Gambar
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Space className="w-full flex flex-row gap-2">
                <Button
                  htmlType="button"
                  block
                  onClick={() => navigate(`/admin/part`)}
                  size="large"
                  className="border-teal-800 hover:!bg-teal-800 hover:!border-teal-800 hover:!text-white text-teal-800"
                >
                  Kembali
                </Button>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  className="bg-teal-800 hover:!bg-teal-600 border-none"
                >
                  {mode === "create" ? "Simpan" : "Update"}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default PartForm;
