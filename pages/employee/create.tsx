import {
  Layout,
  PageHeader,
  Breadcrumb,
  Button,
  message,
  Form,
  Row,
  Col,
} from "antd";
import Head from "next/head";
import PageLayout from "../../components/layouts/Layout";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormInstance } from "rc-field-form";
import _merge from "lodash/merge";
import axios from "axios";
import EmployeeForm from "../../components/employees/EmployeeForm";
const { Content } = Layout;

const EmployeeCreate: NextPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onFormFinish = (values: any) => {
    sendData(values);
  };

  const sendData = async (requestObject: any) => {
    const hide = message.loading("Action in progress..", 0);

    setIsLoading(true);
    await axios
      .post("/api/employees", {
        code: requestObject.code,
        name: requestObject.name,
        jobdesk: requestObject.jobdesk,
        phone: requestObject.phone,
        address: requestObject.address,
        password: requestObject.password,
        username: requestObject.username,
        access: requestObject.access,
        latitude: "0",
        longitude: "0",
        is_tracking: false,
        slug: requestObject.code,
        is_active: 1,
        method: "POST",
      })
      .then((res) => {
        hide();
        router.push("/employee");
      })
      .catch((err) => {
        hide();
        console.log(err.response);
        const { data } = err.response;
        message.error(data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // axios
    //   .post(API_URL + "/api/outlets", requestObject)
    //   .then((res) => {
    //     hide();
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     hide();
    //     console.log(err.response);
    //     const { data } = err.response;
    //     message.error(data.message);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  const onFormFinishFailed = (content: string) => {
    message.error(content);
  };

  const onSubmitForm = (form: FormInstance) => {
    form.submit();
  };

  return (
    <>
      <Head>
        <title>Monitoring - Tambah Employee</title>
        <meta name="description" content="Monitoring Teknisi Lapangan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <div style={{ padding: "0 24px", marginTop: 64 + 24 }}>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link href="/outlets">
                <a>Employee</a>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Tambah</Breadcrumb.Item>
          </Breadcrumb>
          <PageHeader
            className="site-page-header"
            title="Employee"
            // breadcrumb={{ routes }}
            subTitle="Tambah Employee"
            onBack={() => router.push("/outlets")}
            style={{
              // borderBottom: "1px solid rgb(235, 237, 240)",
              // marginBottom: 24,
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
              {/* <Row justify="center" style={{ padding: "10px 0" }}>
                <Col span={16} xl={16} md={24}>
                  <Steps current={current}>
                    {steps.map((item: Step) => (
                      <Step
                        key={item.title}
                        title={item.title}
                        description={item.description}
                      />
                    ))}
                  </Steps>
                </Col>
              </Row> */}
              <div className="steps-content" style={{ marginTop: 50 }}>
                <Row justify="start">
                  <Col
                    span={16}
                    xl={16}
                    md={24}
                    // style={{ border: "1px solid #f0f0f0", padding: 40 }}
                  >
                    <EmployeeForm
                      form={form}
                      onFinish={onFormFinish}
                      onFinishFailed={() =>
                        onFormFinishFailed("Isi Form dengan sesuai")
                      }
                    />
                    {/* {current == 0 && (
                      <InformationForm
                        form={informationForm}
                        onFinish={onInformationFormFinish}
                        onFinishFailed={() =>
                          onFormFinishFailed("Isi Form dengan sesuai")
                        }
                      />
                    )}
                    {current == 1 && (
                      <GoodsForm
                        form={goodsForm}
                        onFinish={onGoodsFormFinish}
                        onFinishFailed={() =>
                          onFormFinishFailed("Isi Form dengan sesuai")
                        }
                      />
                    )}
                    {current == 2 && (
                      <LocationForm
                        form={locationForm}
                        onFinish={onLocationFormFinish}
                        onFinishFailed={() =>
                          onFormFinishFailed("Isi Form dengan sesuai")
                        }
                        current={current}
                        lat={lat}
                        lng={lng}
                        zoom={zoom}
                        setLatLng={setLatLng}
                        onChangeLat={setLat}
                        onChangeLng={setLng}
                      />
                    )} */}
                  </Col>
                </Row>
              </div>
              <div className="action" style={{ marginTop: 20 }}>
                <Row justify="start">
                  <Col>
                    <Button
                      style={{ margin: "0 8px" }}
                      type="primary"
                      onClick={() => {
                        onSubmitForm(form);
                      }}
                      disabled={isLoading}
                    >
                      Simpan
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </Content>
        </div>
      </PageLayout>
    </>
  );
};

export default EmployeeCreate;
