import { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { ShopOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Link from "next/link";

const { Sider } = Layout;
const { SubMenu } = Menu;

const rootSubmenuKeys = ["dashboard"];

const LayoutSider = () => {
  const [openKeys, setOpenKeys] = useState(["dashboard"]);
  const router = useRouter();

  const onOpenChange = (keys: any[]) => {
    const latestOpenKey = keys.find((key: any) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  useEffect(() => {
    const isLogin = sessionStorage.getItem("isLogin");
    if (isLogin != "true") {
      router.push("/auth");
    }
  });

  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
      }}
    >
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["dashboard_dashboard"]}
        style={{ paddingTop: "calc(63px + 10px)" }}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      >
        <SubMenu key="dashboard" icon={<ShopOutlined />} title="Dashboard">
          <Menu.Item key="dashboard_dashboard">
            <Link href="/dashboard">
              <a>Dashboard</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="employee_employee" title="employee">
            <Link href="/employee">
              <a>Employee</a>
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default LayoutSider;
