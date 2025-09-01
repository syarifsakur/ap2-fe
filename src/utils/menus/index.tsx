import {
  DashboardOutlined,
  UsergroupAddOutlined,
  DollarOutlined,
  ShoppingOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";

export const menuItems = [
  {
    title: "Menu",
    items: [
      {
        key: "1",
        icon: <DashboardOutlined />,
        label: "Dashboard",
        path: "/admin/dashboard",
      },
      {
        key: "2",
        icon: <  ShoppingOutlined />,
        label: "Unit",
        path: "/admin/unit",
      },
      {
        key: "3",
        icon: <DollarOutlined/>,
        label: "Credit",
        path: "/admin/credit",
      },
      {
        key: "4",
        icon: <UsergroupAddOutlined />,
        label: "Part",
        path: "/admin/part",
      },
      {
        key: "5",
        icon: <  DatabaseOutlined />,
        label: "Service",
        path: "/admin/service",
      },
    ],
  },
];
