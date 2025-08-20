import {
  DashboardOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
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
      },{
        key: "2",
        icon: <TeamOutlined />,
        label: "Unit",
        path: "/admin/unit",
      },
      {
        key: "3",
        icon: <UsergroupAddOutlined />,
        label: "Credit",
        path: "/admin/credit",
      },
    ],
    
  },  
];
