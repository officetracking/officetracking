import { NextPage } from "next";
import {
  Card,
  Form,
  Button,
  FormInstance,
  Typography,
  Spin,
  Alert,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import AuthForm from "../../components/auth/AuthForm";
import { useEffect, useState } from "react";
import axios from "axios";

import { useRouter } from "next/router";
const AuthIndex: NextPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { Title } = Typography;
  const [isLoading, setIsLoading] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [isError, setIsError] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState("");

  const onFormFinish = (values: any) => {
    //sendData(values);
    auth(values);

    console.log(values);
  };
  const auth = async (requestObject: any) => {
    setIsLoading(true);
    await axios
      .post(`api/auth`, {
        username: requestObject.username,
        password: requestObject.password,
      })
      .then((res) => {
        console.log("login berhasil");
        if (res.data.entriesData.length > 0) {
          console.log(res.data.entriesData[0]["access"]);
          if (res.data.entriesData[0]["access"] == "admin") {
            if (res.data.entriesData[0]["is_active"] == "1") {
              setIsError(false);
              setIsErrorMessage("");
              sessionStorage.setItem("isLogin", "true");
              router.push("/home");
            } else {
              setIsError(true);
              setIsErrorMessage("Akun ini tidak aktif");
            }
          } else {
            setIsError(true);
            setIsErrorMessage("Akun ini tidak memiliki akses");
          }
        } else {
          setIsError(true);
          setIsErrorMessage("Username atau password salah");
        }

        setIsLoading(false);
        // router.push("/dashboard");
      })
      .catch((e) => {
        console.log("Login gagal", e);
        setIsLoading(false);
      });
  };
  const onSubmitForm = (form: FormInstance) => {
    form.submit();
  };

  useEffect(() => {
    const isLogin = sessionStorage.getItem("isLogin");
    if (isLogin == "true") {
      router.push("/home");
    }
  });
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          background: "#ecf0f1",
        }}
      >
        <Title level={4} type="secondary" style={{ margin: "auto" }}>
          &nbsp;
        </Title>

        <div className="content" style={{ marginTop: "25vh" }}>
          <div
            className="header"
            style={{
              margin: "auto",
              width: "40%",

              marginLeft: "30%",
              marginRight: "70%",
            }}
          >
            <Title level={4} type="secondary" style={{ margin: "auto" }}>
              Sistem Monitoring Teknisi Lapangan
            </Title>
            <br></br>
          </div>
          <div>
            <Card
              title="Login"
              bordered={false}
              style={{
                width: "40%",
                margin: "auto",
              }}
            >
              <AuthForm
                form={form}
                onFinish={onFormFinish}
                onFinishFailed={onFormFinish}
              />
              {isError ? (
                <Alert
                  message={`${isErrorMessage}`}
                  type="error"
                  style={{ width: "100%", marginBottom: 20 }}
                />
              ) : (
                ""
              )}

              {isLoading ? (
                <Spin
                  indicator={antIcon}
                  style={{ width: "100%", margin: "auto" }}
                />
              ) : (
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  onClick={() => {
                    onSubmitForm(form);
                  }}
                  disabled={isLoading}
                >
                  Sign In
                </Button>
              )}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
export default AuthIndex;
