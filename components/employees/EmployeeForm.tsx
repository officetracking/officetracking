import {
  Form,
  FormInstance,
  Input,
  InputNumber,
  message,
  Typography,
  Select,
  Image,
  Upload,
  Button,
} from "antd";
import axios from "axios";
import { database } from "firebase-admin";
import { ReactNode, useEffect, useState } from "react";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";

interface IInformation {
  account_name: string;
  address: string;
  code: string;
  daily_target: number;
  name: string;
  phone: string;
  tank_capacity: string;
}

type Props = {
  //   children?: ReactNode;
  form: FormInstance;
  onFinish: (values?: any) => void;
  onFinishFailed: (errors?: any) => void;
};
const { Title } = Typography;
const { Option } = Select;
const options = [
  <Option value={"admin"} key={"admin"}>
    Admin
  </Option>,
  <Option value={"reguler"} key={"reguler"}>
    Reguler
  </Option>,
];
const options1 = [
  <Option value={"1"} key={"1"}>
    Active
  </Option>,
  <Option value={"0"} key={"0"}>
    Inactive
  </Option>,
];

function handleChange(value: any) {
  console.log(`Selected: ${value}`);
}
const p = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info: any) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e: any) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const EmployeeForm = ({
  form,
  onFinish,
  onFinishFailed,
  code,
  name,
  jobdesk,
  phone,
  address,
  username,
  password,
  access,
  is_active,
}: any) => {
  useEffect(() => {}, []);
  const [data, setData] = useState([]);
  return (
    <Form
      layout="vertical"
      name="information"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 12 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
    >
      {/* personal information */}
      <Title level={4}>Informasi Pribadi</Title>

      <Form.Item
        label="NIK"
        name="code"
        rules={[
          {
            required: true,
            message: "Masukkan kode pegawai!",
          },
        ]}
      >
        <Input defaultValue={code} disabled={code == null ? false : true} />
      </Form.Item>

      <Form.Item
        label="Nama"
        name="name"
        rules={[
          {
            required: true,
            message: "Masukkan nama pegawai!",
          },
        ]}
      >
        <Input value={name} defaultValue={name} />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Masukkan jobdesk Email",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Divisi"
        name="jobdesk"
        rules={[
          {
            required: true,
            message: "Masukkan jobdesk pegawai!",
          },
        ]}
      >
        <Input defaultValue={jobdesk} />
      </Form.Item>

      <Form.Item
        label="Telepon"
        name="phone"
        rules={[
          {
            required: true,
            message: "Masukkan nomor telepon!",
          },
        ]}
      >
        <Input defaultValue={phone} />
      </Form.Item>
      <Form.Item
        label="Alamat"
        name="address"
        rules={[
          {
            required: true,
            message: "Masukkan alamat!",
          },
        ]}
      >
        <Input.TextArea rows={3} defaultValue={address} />
      </Form.Item>
      {/* personal information */}
      <Title level={4}>Informasi Akun</Title>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "masukan Username!",
          },
        ]}
      >
        <Input defaultValue={username} />
      </Form.Item>
      <Form.Item
        label="password"
        name="password"
        rules={[
          {
            required: true,
            message: "Masukan Password!",
          },
        ]}
      >
        <Input.Password defaultValue={password} />
      </Form.Item>
      <Form.Item
        label="Akses"
        name="access"
        rules={[
          {
            required: true,
            message: "Pilih Access",
          },
        ]}
      >
        <Select
          size="middle"
          defaultValue={access}
          placeholder="Please select"
          onChange={handleChange}
          style={{ width: "100%" }}
        >
          {options}
        </Select>
      </Form.Item>
      {/* <Form.Item
        label="Status"
        name="is_active"
        rules={[
          {
            required: true,
            message: "Pilih Status",
          },
        ]}
      > */}
      {/* <Select
          size="middle"
          defaultValue={is_active}
          placeholder="Please select"
          onChange={handleChange}
          style={{ width: "100%" }}
        >
          {options1}
        </Select> */}
      {/* </Form.Item> */}
    </Form>
  );
};

export default EmployeeForm;
