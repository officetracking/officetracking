import { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { ShopOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Link from "next/link";
import swal from "sweetalert";

const { Sider } = Layout;
const { SubMenu } = Menu;

const rootSubmenuKeys = ["home"];

const LayoutSider = () => {
  const [openKeys, setOpenKeys] = useState(["home"]);
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
        defaultSelectedKeys={["home_home"]}
        style={{ paddingTop: "calc(63px + 10px)" }}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      >
        <SubMenu key="home" icon={<ShopOutlined />} title="Home">
          <Menu.Item key="home_home">
            <Link href="/home">
              <a>Home</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="employee_employee" title="Data Karyawan">
            <Link href="/employee">
              <a>Data Karyawan</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="employee_assessment" title="Data Karyawan">
            <Link href="/assessment">
              <a>Penilaian Evaluasi</a>
            </Link>
          </Menu.Item>
          <Menu.Item
            title="Logout"
            onClick={() => {
              // sessionStorage.clear();
              // router.push("/auth");
              var answer = window.confirm("Are you sure yo want to logout?");
              if (answer) {
                //some code
                sessionStorage.clear();
                router.push("/auth");
              } else {
                //some code
              }

              // swal({

              //   title: "Do you want to save the changes?",

              // }).then((result) => {
              //   /* Read more about isConfirmed, isDenied below */
              //   // if (result.isConfirmed) {
              //   //   sa("Saved!", "", "success");
              //   // } else if (result.isDenied) {
              //   //   Swal.fire("Changes are not saved", "", "info");
              //   // }
              // });
            }}
          >
            <Link href="#">
              <a>Logout</a>
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default LayoutSider;
