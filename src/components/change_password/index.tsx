import { notification, Form, Col, Input, Button, Card, Row } from "antd";
import React, { useState } from "react";
import { changePassword } from "../../utils";
import { type ErrorState } from "../../types/change-password";

const ChangePasswordComponent: React.FC = () => {
  const [form] = Form.useForm();
  const [errors, setErrors] = useState<ErrorState>({});
  const onSave = async (values: {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }) => {
    try {
      if (values.newPassword !== values.confirmNewPassword) {
        notification.error({
          message: "Gagal Mengubah Password",
          description: "Password baru dan konfirmasi password tidak cocok.",
        });
        return;
      }

      const payload = {
        password_old: values.oldPassword,
        password_new: values.newPassword,
        password_confirm: values.confirmNewPassword,
      };

      const response = await changePassword(payload);
      notification.success({
        message: "Berhasil Mengubah Password",
        description: response.data?.message,
      });
      form.resetFields();
      setErrors({});
    } catch (error: any) {
      if (error.response?.status === 400) {
        setErrors(error.response.data);
      } else {
        console.log(error)
        notification.error({
          message: "Gagal Mengubah Password",
          description: "Terjadi kesalahan saat mengubah password.",
        });
        console.error(error);
      }
    }
  };
  return (
    <Card>
      <Form form={form} layout="vertical" autoComplete="off" onFinish={onSave}>
        <Row gutter={[16, 16]}>
          <Col sm={24} xs={24} md={12} lg={12}>
            <Form.Item
              label="Password Lama"
              name="oldPassword"
              validateStatus={errors?.password_old && "error"}
              help={errors?.password_old}
              rules={[
                { required: true, message: "Mohon masukkan password lama" },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Masukkan password lama"
              />
            </Form.Item>
            <Form.Item
              label="Password Baru"
              name="newPassword"
              validateStatus={errors?.password_new && "error"}
              help={errors?.password_new}
              rules={[
                { required: true, message: "Mohon masukkan password baru" },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Masukkan password baru"
              />
            </Form.Item>
            <Form.Item
              label="Konfirmasi Password Baru"
              name="confirmNewPassword"
              dependencies={["newPassword"]}
              validateStatus={errors?.confirmNewPassword && "error"}
              help={errors?.confirmNewPassword}
              rules={[
                {
                  required: true,
                  message: "Mohon konfirmasi password baru",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Password tidak cocok"));
                  },
                }),
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Konfirmasi password baru"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                className="bg-teal-800 hover:!bg-teal-600 border-none"
              >
                Simpan
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default ChangePasswordComponent;
