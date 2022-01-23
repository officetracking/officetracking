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
import PageLayout from "../../../components/layouts/Layout";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormInstance } from "rc-field-form";
import _merge from "lodash/merge";
import axios from "axios";
import EmployeeForm from "../../../components/employees/EmployeeForm";
import EmployeeFormEdit from "../../../components/employees/EmployeeFormEdit";
const { Content } = Layout;

function EmployeeEdit() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [employee, setEmployee] = useState([]);

  const { code, name, address, access, is_active, username, phone, jobdesk } =
    router.query;

  const onFormFinish = (values: any) => {
    console.log(values);
    sendData(values);
  };

  const sendData = async (requestObject: any) => {
    const hide = message.loading("Action in progress..", 0);
    setIsLoading(true);
    await axios
      .put(`/api/employees/${requestObject.code}`, {
        code: requestObject.code,
        name: requestObject.name,
        jobdesk: requestObject.jobdesk,
        phone: requestObject.phone,
        address: requestObject.address,
        password: requestObject.password,
        username: requestObject.username,
        access: requestObject.access,

        slug: requestObject.code,
        is_active: requestObject.is_active,
        method: "PUT",
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
  };

  const getData = async () => {
    // await axios
    //   .get(`/api/employees/${code}`)
    //   .then((response: any) => {
    //     setEmployee(response);
    //     console.log("a", response.data);
    //   })
    //   .catch((err) => {
    //     router.push("/employee");
    //   });
  };

  const onFormFinishFailed = (content: string) => {
    // message.error(content);
  };

  const onSubmitForm = (form: FormInstance) => {
    form.submit();
  };

  useEffect(() => {
    // getData();
  }, []);
  return (
    <>
      <Head>
        <title>Employee - Edit Employee</title>
        <meta name="description" content="Edit Employee" />
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
                    <EmployeeFormEdit
                      code={code}
                      name={name}
                      address={address}
                      username={username}
                      phone={phone}
                      access={access}
                      is_active={is_active}
                      jobdesk={jobdesk}
                      form={form}
                      onFinish={onFormFinish}
                      // onFinishFailed={() =>
                      //   onFormFinishFailed("Isi Form dengan sesuai")
                      // }
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
}

export default EmployeeEdit;
