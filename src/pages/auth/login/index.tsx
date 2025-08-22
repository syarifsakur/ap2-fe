import {
  LockOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Form, Input, message } from "antd";
import React, { useState } from "react";
import { Loading } from "../../../components";
import { useNavigate } from "react-router-dom";
import { login, setItem, showNotificationError } from "../../../utils";
import type { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { showNotification } from "../../../utils";

interface ErrorState {
  [key: string]: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(true);
  const [isProgress, setIsProgress] = useState(false);
  const [msg, contextHolder] = message.useMessage();

  const handleSubmitForm = async (values: any) => {
    try {
      setIsProgress(true);
      const response = await login(values);
      console.log("Response login:", response.data);

      const accessToken = response?.data?.token;

      if (!accessToken || typeof accessToken !== "string") {
        throw new Error("Token tidak valid atau tidak ditemukan");
      }

      const decoded = jwtDecode(accessToken);

      setItem({
        key: "profile",
        value: {
          data: response?.data?.dataForClient,
          token: accessToken,
          expire: decoded?.exp,
        },
      });

      showNotification("Berhasil Login");
      navigate("/admin/dashboard");
    } catch (error) {
      const err = error as AxiosError;
      const data = err?.response?.data as ErrorState;

      if (err?.response?.status === 400) {
        if (data?.username) {
          form.setFields([{ name: "username", errors: [data?.username] }]);
        }
        if (data?.password) {
          form.setFields([{ name: "password", errors: [data?.password] }]);
        }
        if (!data?.username && !data?.password && data?.message) {
          showNotificationError(data.message);
        }
      } else {
        showNotificationError(
          (data && data.message) ||
            (error instanceof Error
              ? error.message
              : "Ada kesalahan pada server")
        );
        console.error("Login error:", error);
      }
    } finally {
      setTimeout(() => setIsProgress(false), 300);
    }
  };

  return (
    <>
      {contextHolder}
      <div
        className="relative min-h-screen flex items-center justify-center px-4"
        style={{
          backgroundImage: "url('/images/honda-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* <div className="absolute inset-0 overflow-hidden">
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
          </div> */}

        <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-300 hover:scale-[1.01]">
          <div className="bg-red-600 p-6 text-white text-center">
            <div className="flex items-center justify-center gap-2">
              <PieChartOutlined className="text-xl lg:text-2xl" />
              <h1 className="text-xl lg:text-2xl font-semibold">
                Admin Sistem
              </h1>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-6 text-center">
              Masuk Dengan Akun Anda
            </h2>

            <Form
              name="login_form"
              autoComplete="off"
              layout="vertical"
              onFinish={handleSubmitForm}
              form={form}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: "Masukkan username!" }]}
              >
                <Input
                  prefix={<UserOutlined className="text-red-600" />}
                  placeholder="Username"
                  autoComplete="new-username"
                  className="py-2"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: "Masukkan password!" }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-red-600" />}
                  placeholder="Password"
                  autoComplete="new-password"
                  className="py-2"
                />
              </Form.Item>

              <Form.Item>
                <Col className="gap-2 flex flex-col">
                  <Button
                    loading={isProgress}
                    htmlType="submit"
                    block
                    size="large"
                    className="bg-red-600 hover:!bg-red-700 border-none rounded-lg"
                    style={{ backgroundColor: "red" }}
                  >
                    Masuk
                  </Button>
                  <Button
                    htmlType="button"
                    onClick={() => navigate("/")}
                    block
                    size="large"
                    className="border-red-600 hover:!bg-red-600 hover:!text-white text-red-600 rounded-lg"
                  >
                    Kembali
                  </Button>
                </Col>
              </Form.Item>
            </Form>

            <div className="mt-4 text-center text-xs text-gray-500">
              Dengan melanjutkan, Anda menyetujui{" "}
              <a href="#terms" className="text-red-600 font-medium">
                Syarat & Kebijakan Privasi
              </a>
            </div>
          </div>
        </div>

        {isLoading && <Loading setIsLoading={setIsLoading} />}
      </div>
    </>
  );
};

export default Login;
