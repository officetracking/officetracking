import { Layout, PageHeader, Breadcrumb } from "antd";
import Head from "next/head";
import PageLayout from "../components/layouts/Layout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import DashboardM from "../components/dashboard/Map";
import { MapProvider } from "../components/dashboard/MapHook";
import axios from "axios";

const { Content } = Layout;
const DashboardIndex: NextPage = () => {
  const router = useRouter();
  const [employees, setEmployees] = useState([]);

  const onDrawCreate = ({ features }: any) => {
    console.log(features);
  };

  const onDrawUpdate = ({ features }: any) => {
    console.log(features);
  };

  // const [locations, setLocations] = useState([]);
  const fetchEmployees = async () => {
    let response = await axios.get("/api/employees");
    //setData(response.data.entriesData);

    setEmployees(response.data.entriesData);
    console.log(response.data.entriesData);
  };

  useEffect(() => {
    //  setInterval(fetchEmployees, 5000);
    fetchEmployees();
    // fetchEmployees();
  }, []);
  return (
    <>
      <Head>
        <title>Monitoring - Dashboard</title>
        <meta name="description" content="Monitoring Teknisi Lapangan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <div style={{ padding: "0 24px", marginTop: 64 + 24 }}>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <PageHeader
            className="site-page-header"
            title="Dashboard"
            // onBack={() => null}
            style={{
              // borderBottom: "1px solid rgb(235, 237, 240)",
              // marginBottom: 24,
              padding: 0,
              paddingBottom: 16,
            }}
          />
          <Content className="site-layout">
            {/* <div style={{ marginBottom: 24 }}>
              <Row gutter={16}>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title="Total"
                      value={200}
                      precision={2}
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
                      value={11.28}
                      precision={2}
                      valueStyle={{ color: "#3f8600" }}
                      prefix={<ArrowUpOutlined />}
                      suffix="%"
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title="Inaktif"
                      value={9.3}
                      precision={2}
                      valueStyle={{ color: "#cf1322" }}
                      prefix={<ArrowDownOutlined />}
                      suffix="%"
                    />
                  </Card>
                </Col>
              </Row>
            </div> */}
            <div>
              <MapProvider>
                <DashboardM employees={employees} />
              </MapProvider>
              ,
            </div>
          </Content>
        </div>
      </PageLayout>
    </>
  );
};

export default DashboardIndex;
