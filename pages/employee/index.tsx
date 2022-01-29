import {
  Layout,
  PageHeader,
  Table,
  Tag,
  Space,
  Avatar,
  Button,
  Tooltip,
  Row,
  Col,
  Card,
  Statistic,
  Breadcrumb,
  Popconfirm,
  message,
} from "antd";
import Head from "next/head";

// import styles from "../styles/Home.module.css";
import {
  UserOutlined,
  PlusOutlined,
  DownloadOutlined,
  DeleteOutlined,
  EditOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import PageLayout from "../../components/layouts/Layout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import ButtonGroup from "antd/lib/button/button-group";

const { Content } = Layout;

const routes = [
  {
    path: "index",
    breadcrumbName: "Home",
  },
  {
    path: "first",
    breadcrumbName: "Pegawai",
  },
  {
    path: "second",
    breadcrumbName: "Kelola",
  },
];

const EmployeeIndex: NextPage = () => {
  const router = useRouter();
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text: any) => <Avatar size="large" icon={<UserOutlined />} />,
    },
    {
      title: "NIK",
      dataIndex: "code",
      key: "code",
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: "Divisi",
      dataIndex: "divisi",
      key: "divisi",
    },

    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Telepon",
      dataIndex: "phone",
      key: "phone",
    },

    {
      title: "status",
      key: "is_active",
      dataIndex: "is_active",
      render: (status: any) => (
        <>
          {
            <Tag
              color={status == 1 ? "#2ecc71" : "#e74c3c"}
              key={status == 1 ? "Active" : "In Active"}
            >
              {status == "1" ? "Active" : "In Active"}
            </Tag>
          }
        </>
      ),
    },
    {
      title: "action",
      key: "action",
      render: (text: any, record: any) => (
        <div style={{ textAlign: "center" }}>
          <Space>
            <Tooltip title="Hapus">
              <Button
                type="primary"
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => {
                  onDelete(record.code);
                }}
                danger
              />
            </Tooltip>
            <Tooltip title="Ubah">
              <Button
                onClick={() => {
                  router.push({
                    pathname: `/employee/edit/[code]`,

                    query: {
                      code: record.code,
                      name: record.name,
                      access: record.access,
                      address: record.address,
                      is_active: record.is_active,
                      jobdesk: record.jobdesk,
                      username: record.username,
                      phone: record.phone,
                      email: record.email,
                    },
                  });
                }}
                shape="circle"
                icon={<EditOutlined />}
              />
            </Tooltip>
          </Space>
        </div>
      ),
    },
  ];

  function onDelete(code: any) {
    console.log(code);
    swal({
      title: "Are you sure?",
      text: "Data Akan Dihapus",
      icon: "warning",

      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`/api/employees/${code}`)
          .then((response) => {
            fetchEmployees();
            swal("Data di hapus", {
              icon: "success",
            });
          })
          .catch((err) => {
            console.log(err);
            swal("Data tidak berhasil dihapus", {
              icon: "error",
            });
          });
      } else {
      }
    });
  }

  const fetchEmployees = async () => {
    let response = await axios.get("/api/employees");
    setData(response.data.entriesData);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <Head>
        <title>Monitoring - Employee</title>
        <meta name="description" content="Monitoring Teknisi Lapangan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageLayout>
        <div style={{ padding: "0 24px", marginTop: 64 + 24 }}>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Employee</Breadcrumb.Item>
          </Breadcrumb>
          <PageHeader
            className="site-page-header"
            title="Employee"
            subTitle="Kelola Employee"
            style={{
              padding: 0,
              paddingBottom: 16,
            }}
          />
          <Content className="site-layout">
            <div style={{ marginBottom: 24 }}>
              <Row gutter={16}>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title="Total"
                      value={data.length}
                      valueStyle={{ color: "#3f8600" }}
                      prefix={<UserOutlined />}
                      // suffix="%"
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title="Aktif"
                      value={
                        data.filter((item) => item["is_active"] == 1).length
                      }
                      valueStyle={{ color: "#3f8600" }}
                      prefix={<ArrowUpOutlined />}
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title="Inaktif"
                      value={
                        data.filter((item) => item["is_active"] == 0).length
                      }
                      valueStyle={{ color: "#cf1322" }}
                      prefix={<ArrowDownOutlined />}
                    />
                  </Card>
                </Col>
              </Row>
            </div>
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: "calc(100vh - (24px + 24px + 24px + 64px))",
              }}
            >
              <div style={{ marginBottom: 24, textAlign: "right" }}>
                <Space>
                  <Button icon={<DownloadOutlined />}>Report .pdf</Button>
                  <Button
                    type="primary"
                    onClick={() => router.push("/employee/create")}
                    icon={<PlusOutlined />}
                  >
                    {/* <Link href="/outlets/create">
                      <a>Outlet Baru</a>
                    </Link> */}
                    Employee
                  </Button>
                </Space>
              </div>
              <Table columns={columns} dataSource={data} />
            </div>
          </Content>
        </div>
      </PageLayout>
    </>
  );
};

export default EmployeeIndex;
