import React, { useState, useEffect } from "react";
import { Layout, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const { Header } = Layout;

const menuItems = [
  { label: "Beranda", href: "#home" },
  { label: "Tentang", href: "#about" },
  { label: "Produk", href: "#products" },
  { label: "Bagian", href: "#part" },
  { label: "Service", href: "#service" },
  { label: "Lokasi", href: "#location" },
  { label: "Kredit", href: "#payment" },
  { label: "Login", href: "/auth/login" },
];

const NavbarComponents: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  const renderMenuLinks = (isMobileMenu = false) =>
    menuItems.map((item) => (
      <a
        key={item.href}
        href={item.href}
        onClick={() => isMobileMenu && onClose()}
        className="!text-black hover:text-yellow-500 font-medium transition-colors duration-300"
        style={{
          margin: "0 10px",
          padding: "6px 12px",
          borderRadius: "6px",
          backgroundColor: isMobileMenu ? "#fff" : "transparent",
        }}
      >
        {item.label}
      </a>
    ));

  return (
    <Layout>
      <Header
        className="fixed top-0 left-0 w-full backdrop-blur-md shadow-md"
        style={{
          zIndex: 1000,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: 0,
        }}
      >
        <div className="flex items-center justify-between px-4 h-16 mx-10">
          <div className="flex items-center space-x-2">
            <img
              src="/src/assets/Honda_Logo.svg.png"
              alt="logo"
              className="w-10 h-10 object-contain -ml-5 md:-ml-0"
            />
            <p className="text-base md:text-xl text-red-500 font-bold">
              Anugerah Perdana Imam Bonjol
            </p>
          </div>
          {!isMobile ? (
            <div className="hidden md:flex space-x-4">{renderMenuLinks()}</div>
          ) : (
            <div
              className="md:hidden cursor-pointer text-black"
              onClick={showDrawer}
            >
              <MenuOutlined className="text-2xl" />
            </div>
          )}
        </div>
      </Header>

      <Drawer
        title={<span className="text-black font-semibold">Menu</span>}
        placement="right"
        onClose={onClose}
        open={visible}
        bodyStyle={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {renderMenuLinks(true)}
      </Drawer>
    </Layout>
  );
};

export default NavbarComponents;
