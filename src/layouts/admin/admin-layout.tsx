import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Breadcrumb } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { menuItems } from "../../utils";

const { Header, Sider, Content } = Layout;

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string>("1");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const foundItem = menuItems
      .flatMap((section) => section.items)
      .find((item) => currentPath.startsWith(item.path));
    if (foundItem) {
      setSelectedKey(foundItem.key);
    }
  }, [location.pathname]);

  const handleMenuClick = (path: string, key: string) => {
    setSelectedKey(key);
    navigate(path);
  };

  const getBreadcrumbItems = () => {
    const currentPath = location.pathname;
    const breadcrumbItems = [{ title: <HomeOutlined />, href: "/admin" }];

    const foundItem = menuItems
      .flatMap((section) => section.items)
      .find((item) => currentPath.startsWith(item.path));

    if (foundItem) {
      breadcrumbItems.push({ title: foundItem.label });

      const subPath = currentPath
        .replace(foundItem.path, "")
        .split("/")
        .filter(Boolean);

      if (subPath.length > 0) {
        subPath.forEach((part) => {
          breadcrumbItems.push({
            title: part.charAt(0).toUpperCase() + part.slice(1),
          });
        });
      }
    }

    return breadcrumbItems;
  };

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          height: "100vh",
          overflow: "auto",
        }}
      >
        <div className="demo-logo-vertical flex items-center justify-center h-16">
          <img src="/src/assets/react.svg" alt="logo" className="w-10 h-10" />
          {!collapsed && (
            <p className="m-2 font-bold text-2xl text-white">Admin</p>
          )}
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
          {menuItems.map((section) => (
            <React.Fragment key={section.title}>
              <Menu.ItemGroup title={section.title}>
                {section.items.map((item) => (
                  <Menu.Item
                    key={item.key}
                    icon={item.icon}
                    onClick={() => handleMenuClick(item.path, item.key)}
                  >
                    {item.label}
                  </Menu.Item>
                ))}
              </Menu.ItemGroup>
            </React.Fragment>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            height: "64px",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            height: "calc(100vh - 64px)",
            overflow: "auto",
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Breadcrumb items={getBreadcrumbItems()} />
          <div className="mt-10 ">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
