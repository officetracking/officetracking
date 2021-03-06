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
import jsPDF from "jspdf";

const { Content } = Layout;
require("jspdf-autotable");

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

const AssessmentIndex = () => {
  const router = useRouter();
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "NIK",
      dataIndex: "code",
      key: "code",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Hari Ke-",
      dataIndex: "day",
      key: "day",
    },
    {
      title: "Jumlah Orderan",
      dataIndex: "total_order",
      key: "total_order",
    },

    {
      title: "Hasil Progress",
      dataIndex: "result",
      key: "result",
    },

    {
      title: "Persentase hasil",
      dataIndex: "persentase",
      key: "persentase",
    },
    {
      title: "action",
      key: "action",
      render: (text, record) => (
        <div style={{ textAlign: "center" }}>
          <Space>
            <Tooltip title="Hapus">
              <Button
                type="primary"
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => {
                  onDelete(record.key);
                }}
                danger
              />
            </Tooltip>
            <Tooltip title="Ubah">
              <Button
                onClick={() => {
                  router.push({
                    pathname: `/assessment/edit`,
                    query: {
                      key: record.key,
                      nik: record.code,
                      name: record.name,
                      day: record.day,
                      total_order: record.total_order,
                      result: record.result,
                      persentase: record.persentase,
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

  const onDelete = async (key) => {
    console.log(key);
    var answer = window.confirm("Are you sure, data will be deleted?");
    if (answer) {
      await axios
        .delete(`/api/assessment/${key}`)
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
      //some code
    }
    fetchEmployees();
  };

  const fetchEmployees = async () => {
    let response = await axios.get("/api/assessment");
    setData(response.data.entriesData);
    console.log("data assessment", response.data.entriesData);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const report = async () => {
    //await checkinHistory(employeeCode);
    var pdf = [];
    var doc = new jsPDF("p", "px", "a4");
    doc.setFontSize(15);
    doc.text(`Perhitungan Evaluasi harian  `, 10, 20);

    doc.autoTable({ html: "#my-table", margin: { top: 20 } });
    data.map((value) => {
      var data = [
        // dateFormat(value.date, "dd/mm/yyyy"),
        `${value.code}`,
        `${value.name}`,
        `${value.day}`,
        `${value.total_order}`,
        `${value.result}`,
        `${value.persentase}`,
      ];
      pdf.push(data);
    });

    doc.autoTable({
      margin: { top: 50 },
      headStyles: {
        fillColor: "#3498db",
        textColor: [255, 255, 255],
        fontSize: 10,
        padding: 0,
      },

      thema: "grid",
      margin: { left: 10, right: 10, top: 100 },
      head: [
        [
          "NIK",
          "Nama",
          "Hari Ke-",
          "Jumlah Order",
          "Hasil Progress",
          "Persentase",
        ],
      ],
      body: pdf,
    });
    window.open(doc.output("bloburl"), "_blank");
  };
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
            <Breadcrumb.Item>Assessment Employee</Breadcrumb.Item>
          </Breadcrumb>
          <PageHeader
            className="site-page-header"
            title="Assessment Employee"
            subTitle="Kelola  Penilaian"
            style={{
              padding: 0,
              paddingBottom: 16,
            }}
          />
          <Content className="site-layout">
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: "calc(100vh - (24px + 24px + 24px + 64px))",
              }}
            >
              <div style={{ marginBottom: 24, textAlign: "right" }}>
                <Space>
                  <Button
                    onClick={() => {
                      // console.log("tes");
                      report();
                    }}
                    icon={<DownloadOutlined />}
                  >
                    Report .pdf
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => router.push("/assessment/create")}
                    icon={<PlusOutlined />}
                  >
                    {/* <Link href="/outlets/create">
                      <a>Outlet Baru</a>
                    </Link> */}
                    Tambahkan
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

export default AssessmentIndex;
