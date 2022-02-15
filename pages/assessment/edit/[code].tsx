import {
  Layout,
  PageHeader,
  Breadcrumb,
  Button,
  message,
  Form,
  Row,
  Col,
  Image,
  Upload,
} from "antd";
import Head from "next/head";
import PageLayout from "../../../components/layouts/Layout";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormInstance } from "rc-field-form";
import _merge from "lodash/merge";
import axios from "axios";

import EmployeeForm from "../../../components/employees/EmployeeForm";
import AssessmentForm from "../../../components/assessment/AssessmentForm";

const { Content } = Layout;

const AssessmentEdit: NextPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { Dragger } = Upload;

  const onFormFinish = (values: any) => {
    sendData(values);
  };

  const sendData = async (requestObject: any) => {
    console.log(requestObject);
    const hide = message.loading("Action in progress..", 0);
    var data = requestObject.code.split(",");
    var presentase = (requestObject.result / requestObject.total_order) * 100;

    setIsLoading(true);
    await axios
      .post("/api/assessment", {
        code: data[0],
        name: data[1],
        day: requestObject.day,
        total_order: requestObject.total_order,
        result: requestObject.result,
        key: Math.floor(Date.now() / 1000).toString(),
        persentase: Math.round(presentase) + "%",

        method: "POST",
      })
      .then((res) => {
        hide();
        router.push("/assessment");
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
                <a>Assessment</a>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Tambah</Breadcrumb.Item>
          </Breadcrumb>
          <PageHeader
            className="site-page-header"
            title="Assessment"
            // breadcrumb={{ routes }}
            subTitle="Kelola Penilaian"
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
                    <AssessmentForm
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

export default AssessmentEdit;
