import {
  Layout,
  Menu,
  Row,
  Col,
  Dropdown,
  Button,
  Avatar,
  Divider,
  Typography,
} from "antd";
import {
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import router from "next/router";

const menu = (
  <Menu>
    {/* <Menu.Item style={{ paddingRight: 30 }} icon={<UserOutlined />}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Profil
      </a>
    </Menu.Item> */}
    {/* <Menu.Item style={{ paddingRight: 30 }} icon={<SettingOutlined />}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        Pengaturan
      </a>
    </Menu.Item> */}
    <Menu.Item
      style={{ paddingRight: 30, borderTop: "1px solid rgba(0,0,0,.06)" }}
      icon={<LogoutOutlined style={{ color: "#ff4d4f" }} />}
    >
      <a
        rel="noopener noreferrer"
        onClick={() => {
          sessionStorage.clear();
          router.push("/auth");
        }}
      >
        Logout
      </a>
    </Menu.Item>
  </Menu>
);

const { Header } = Layout;
const LayoutHeader = () => {
  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
        backgroundColor: "#fff",
        padding: "0 24px",
      }}
    >
      <Row justify="space-between" align="middle">
        <Col span={8}>
          <div className="logo">
            <Typography.Title level={4} style={{ marginBottom: 0 }}>
              <span style={{ color: "#3498db" }}>Monitoring</span> Teknisi
              lapangan
            </Typography.Title>
          </div>
        </Col>
        <Col span={8} style={{ textAlign: "right" }}>
          <Dropdown overlay={menu} placement="topRight">
            <Avatar
              style={{
                color: "#f56a00",
                backgroundColor: "#fde3cf",
                cursor: "pointer",
              }}
            >
              U
            </Avatar>
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
};

export default LayoutHeader;
